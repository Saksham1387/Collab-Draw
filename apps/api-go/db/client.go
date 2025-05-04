package db

import "sync"

var (
	client     *PrismaClient
	clientOnce sync.Once
)

func GetClient() *PrismaClient {
	clientOnce.Do(func() {
		client = NewClient()
	})

	return client
}

func ConnectClient() error {
	return GetClient().Connect()
}

func DisconnectClient() error {
	return GetClient().Disconnect()
}
