package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/egoldfein/terra/internal/dynamodb"
	"github.com/egoldfein/terra/internal/trefle"
	user_plants "github.com/egoldfein/terra/internal/userPlants"
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

	logger := log.New()

	if os.Getenv("LOG_LEVEL") == "DEBUG" {
		logger.SetLevel(log.DebugLevel)
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

	// Using the config value, create the DynamoDB client
	dynamoDB := dynamodb.New(sess, logger)

	// Using config value, create S3 client
	// uploader := s3manager.NewUploader(sess)

	// Set up trefle client
	trefleClient, err := trefle.New(os.Getenv("TREFLE_API_KEY"), logger)
	if err != nil {
		logger.Fatalf("Initializing trefle client failed")
	}

	// Set up user plants client
	userPlantsClient, err := user_plants.New(dynamoDB, logger)
	if err != nil {
		logger.Fatalf("Initializing user plants client failed")
	}

	// Set up and run router
	router := router.New(ctx, trefleClient, userPlantsClient)

	srv := &http.Server{
		Addr:    ":8080",
		Handler: router.Engine,
	}

	// Initializing the server in a goroutine so that
	// it won't block the graceful shutdown handling
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatalf("listen: %s\n", err)
		}
	}()

	quit := make(chan os.Signal, 1)

	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	logger.Info("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		logger.Fatal("Server forced to shutdown:", err)
	}
	
	logger.Info("Server exiting")


}
