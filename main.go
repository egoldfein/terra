package main

import (
	"context"
	"os"

	"github.com/egoldfein/terra/internal/dynamodb"
	"github.com/egoldfein/terra/internal/trefle"
	"github.com/egoldfein/terra/internal/users"
	"github.com/egoldfein/terra/router"

	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
)

func main() {
	ctx := context.Background()

	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	// Using the SDK's default configuration, loading additional config
	// and credentials values from the environment variables, shared
	// credentials, and shared configuration files
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-west-2"))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	awscfg := &aws.Config{}
	if len(cfg.Region) > 0 {
		awscfg.WithRegion(cfg.Region)
	}

	sess := session.Must(session.NewSession(awscfg))

	// Using the Config value, create the DynamoDB client
	 dynamoDB := dynamodb.New(sess)

	// Set up trefle client
	trefleClient, err := trefle.New(os.Getenv("TREFLE_API_KEY"))
	if err != nil {
		log.Error(err)
	}

		// Set up trefle client
	usersClient, err := users.New(dynamoDB)
	if err != nil {
		log.Error(err)
	}

	// Set up and run router
	router := router.New(ctx, trefleClient, usersClient)
	router.Engine.Run()

}
