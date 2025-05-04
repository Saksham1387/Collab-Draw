package controllers

import (
	"api-backend/db"
	"api-backend/middleware"
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	client *db.PrismaClient
}

func GetUserController(client *db.PrismaClient) *UserController {
	return &UserController{
		client: client,
	}
}

func (p *UserController) GetUser(c *gin.Context) {
	ctx := context.Background()
	userId, err := middleware.GetUserIDFromContext(c)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error":   "Getting UserId Failed",
			"message": err.Error(),
		})
	}

	user, err := p.client.User.FindUnique(db.User.ID.Equals(userId)).Exec(ctx)

	fmt.Println("here-----------", user)
	result, _ := json.MarshalIndent(user, "", "  ")

	var userData map[string]interface{}
	_ = json.Unmarshal(result, &userData)

	fmt.Print(userData)

	c.JSON(http.StatusCreated, gin.H{
		"status": "success",
		"data":   userData,
	})
}
