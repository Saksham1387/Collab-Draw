package main

import (
	"api-backend/router"
	"fmt"
)

func main() {
	// Initialize router
	r := router.SetupRouter()

	// Start server
	port := ":8080"
	fmt.Printf("Server is running on port %s\n", port)
	r.Run(port)
}
