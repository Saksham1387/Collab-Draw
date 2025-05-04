package controllers

import (
	"api-backend/db"
	"api-backend/middleware"
	"context"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SignupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}

type SigninpRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthController struct {
	client *db.PrismaClient
}

func NewAuthController(client *db.PrismaClient) *AuthController {
	return &AuthController{
		client: client,
	}
}

func (p *AuthController) SignUp(c *gin.Context) {
	ctx := context.Background()
	var req SignupRequest
	err := json.NewDecoder(c.Request.Body).Decode(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid Input",
			"message": "The JSON being sent is not accepted",
		})
		return
	}

	if req.Email == "" || req.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Missing Required Fields",
			"message": "Email and password are required",
		})
		return
	}

	createUser, err := p.client.User.CreateOne(
		db.User.Email.Set(req.Email),
		db.User.Password.Set(req.Password),
		db.User.Name.Set(req.Username),
	).Exec(ctx)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Database Error",
			"message": err.Error(),
		})
		return
	}

	result, _ := json.MarshalIndent(createUser, "", "  ")

	var userData map[string]interface{}
	_ = json.Unmarshal(result, &userData)

	delete(userData, "password")

	c.JSON(http.StatusCreated, gin.H{
		"status": "success",
		"data":   userData,
	})
}

func (p *AuthController) LogIn(c *gin.Context) {
	ctx := context.Background()
	var req SigninpRequest

	err := json.NewDecoder(c.Request.Body).Decode(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid Input",
			"message": "The JSON being sent is not accepted",
		})
		return
	}

	if req.Email == "" || req.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Missing Required Fields",
			"message": "Email and password are required",
		})
		return
	}

	existingUser, err := p.client.User.FindFirst(db.User.Email.Equals(req.Email)).Exec(ctx)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":   "Authentication Failed",
			"message": "Invalid email or password",
		})
		return
	}

	token, err := middleware.GenerateToken(existingUser.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Token Generation Failed",
			"message": "Could not create authentication token",
		})
		return
	}

	middleware.SetAuthCookie(c, token)
	result, _ := json.MarshalIndent(existingUser, "", "  ")
	var userData map[string]interface{}
	_ = json.Unmarshal(result, &userData)
	delete(userData, "password")

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   userData,
	})
}
