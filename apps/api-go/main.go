package main

import (
	"api-backend/db"
	"api-backend/router"
	"fmt"
	"log"
)

func main() {
	if err := db.ConnectClient(); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	client := db.GetClient()

	defer func() {
		if err := db.DisconnectClient(); err != nil {
			log.Fatalf("Failed to disconnect from database: %v", err)
		}
	}()

	// Initialize router
	r := router.SetupRouter(client)

	// Start server
	port := ":8080"
	fmt.Printf("Server is running on port %s\n", port)
	r.Run(port)
}
