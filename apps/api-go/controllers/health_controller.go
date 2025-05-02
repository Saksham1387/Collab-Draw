package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "healthy",
	})
}

func NotFoundHandler(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{
		"error":   "Not Found",
		"message": "The requested resource does not exist",
	})
}
