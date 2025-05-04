package router

import (
	"api-backend/controllers"
	"api-backend/db"
	"api-backend/middleware"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter(client *db.PrismaClient) *gin.Engine {
	r := gin.Default()

	authController := controllers.NewAuthController(client)
	userController := controllers.GetUserController(client)

	r.Use(middleware.Logger())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/health", controllers.HealthCheck)

	auth := r.Group("/auth")
	{
		auth.POST("/signup", authController.SignUp)
		auth.POST("/signin", authController.LogIn)
	}

	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		user := protected.Group("/user")
		{
			user.GET("/", userController.GetUser)
		}
	}

	r.NoRoute(controllers.NotFoundHandler)

	return r
}
