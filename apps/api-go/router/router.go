package router

import (
	"api-backend/controllers"

	"api-backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(middleware.Logger())
	r.GET("/health", controllers.HealthCheck)

	r.NoRoute(controllers.NotFoundHandler)

	return r

}
