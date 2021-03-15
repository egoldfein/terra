package user_plants

import (
	"context"
	"errors"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/expression"
	dbClient "github.com/egoldfein/terra/internal/dynamodb"

	"github.com/google/uuid"
)

const (
	plantListTable = "plant_list"
	plantsTable = "plants"
)

//go:generate go run github.com/maxbrunsfeld/counterfeiter/v6 . API
type API interface {
	CreatePlantList(ctx context.Context, userID string, name string) (*PlantList, error)
	AddPlant(ctx context.Context, name, listID, treflePlantID string, wateringFrequency string) (*Plant, error)
	GetPlantLists(ctx context.Context, userID string) (*[]PlantList, error)
	GetPlantList(ctx context.Context, listID string) (*[]Plant, error)
	GetPlant(ctx context.Context, plantID string) (*Plant, error)
	UpdatePlant(ctx context.Context, plantID string, lastWatered string) (*Plant, error)
}

type APIClient struct {
	Db *dbClient.Client
	logger *log.Logger
}


// New returns a new User Plants API Client for creating and 
// retrieving user-defined plants and plant lists
func New(db *dbClient.Client, log *log.Logger) (*APIClient, error) {
	if db == nil {
		return nil, errors.New("database client cannot be empty")
	}
	
	a := &APIClient{
		Db: db,
		logger: log,
	}

	return a, nil
}

// CreatePlantList creates a new PlantList item for a user in DynamoDB
func (a *APIClient) CreatePlantList(ctx context.Context, userID string, name string) (*PlantList, error) {
	if (userID == "" || name == "") {
		return nil, errors.New("userID and name cannot be empty")
	}

	item := PlantList{
		ID:   uuid.New().String(),
		UserID: userID,
		Name: name,
	}

	av, err := dynamodbattribute.MarshalMap(item)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	output, err := a.Db.Put(ctx, plantListTable, av)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	list := PlantList{}
	err = dynamodbattribute.UnmarshalMap(output.Attributes, &list)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	return &list, nil
}

// GetPlantLists retrieves all of a user's plant lists by UserID
func (a *APIClient) GetPlantLists(ctx context.Context, userID string) (*[]PlantList, error){	
	if userID == "" {
		return nil, errors.New("userID cannot be empty")
	}

	filt := expression.Name("user_id").Equal(expression.Value(userID))
	proj := expression.NamesList(expression.Name("id"), expression.Name("name"))
	expr, err := expression.NewBuilder().WithFilter(filt).WithProjection(proj).Build()
	if err != nil {
  		return nil, err
	}

	input := &dynamodb.ScanInput{
  		ExpressionAttributeNames:  expr.Names(),
  		ExpressionAttributeValues: expr.Values(),
  		FilterExpression:          expr.Filter(),
  		ProjectionExpression:      expr.Projection(),
  		TableName:                aws.String(plantListTable),
	}

	result, err := a.Db.Scan(ctx, input)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	list := []PlantList{}
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &list)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	return &list, nil
}

// AddPlant creates a new user-defined plant item in DynamoDB
func (a *APIClient) AddPlant(ctx context.Context, name, listID, treflePlantID, wateringFrequency string) (*Plant, error) {
	if name == "" || listID == "" || treflePlantID == "" || wateringFrequency == "" {
		return nil, errors.New("parameters cannot be empty")
	}

	item := Plant{
		ID:   uuid.New().String(),
		PlantListID: listID,
		PlantID: treflePlantID,
		Name: name,
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
		UpdatedAt: time.Now().UTC().Format(time.RFC3339),
		LastWatered: time.Now().UTC().Format(time.RFC3339),
		WateringFrequency: wateringFrequency,
	}

	av, err := dynamodbattribute.MarshalMap(item)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	output, err := a.Db.Put(ctx, plantsTable, av)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	plant := Plant{}
	err = dynamodbattribute.UnmarshalMap(output.Attributes, &plant)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	return &plant, nil
}

// GetPlantList retrieves a single user-defined plant list from DynamoDB
func (a *APIClient) GetPlantList(ctx context.Context, listID string) (*[]Plant, error) {
	if (listID == "") {
		return nil, errors.New("listID cannot be empty")
	}

	filt := expression.Name("plant_list_id").Equal(expression.Value(listID))
	proj := expression.NamesList(expression.Name("id"), expression.Name("name"), expression.Name("last_watered"), expression.Name("watering_frequency"))
	expr, err := expression.NewBuilder().WithFilter(filt).WithProjection(proj).Build()
	if err != nil {
		return nil, err
	}

	input := &dynamodb.ScanInput{
  		ExpressionAttributeNames:  expr.Names(),
  		ExpressionAttributeValues: expr.Values(),
  		FilterExpression:          expr.Filter(),
  		ProjectionExpression:      expr.Projection(),
  		TableName:                aws.String(plantsTable),
	}

	result, err := a.Db.Scan(ctx, input)
	if err != nil {
		return nil, err
	}

	plants := []Plant{}
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &plants)
	if err != nil {
		return nil, err
	}

	return &plants, nil
}

// GetPlant retrieves a single user-defined plant from DynamoDB
func (a *APIClient) GetPlant(ctx context.Context, plantID string) (*Plant, error) {
	if (plantID == "") {
		return nil, errors.New("plantID cannot be empty")
	}

	input := map[string]*dynamodb.AttributeValue{
		"id": {
			S: aws.String(plantID),
		},
	}

	result, err := a.Db.Get(ctx, plantsTable, input)

	if err != nil {
		log.Error(err)
		return nil, err
	}

	plant := Plant{}
	err = dynamodbattribute.UnmarshalMap(result, &plant)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	return &plant, nil
}

// UpdatePlant updates a single user-defined plant in DynamoDB
func (a *APIClient)	UpdatePlant(ctx context.Context, plantID string, lastWatered string) (*Plant, error) {	
	if (plantID == "" || lastWatered == "") {
		return nil, errors.New("plantID and lastWatered cannot be empty")
	}
	input := map[string]*dynamodb.AttributeValue{
		":w": {	
			S: aws.String(time.Now().UTC().Format(time.RFC3339)),
		},
		":u": {
			S: aws.String(time.Now().UTC().Format(time.RFC3339)),
		},
	}
	key := map[string]*dynamodb.AttributeValue{
        "id": {
            S: aws.String(plantID),
        },

    }

	output, err := a.Db.Update(ctx, plantsTable, input, key, "set last_watered = :w, updated_at = :u")
	if err != nil {
		log.Error(err)
		return nil, err
	}

	plant := Plant{}
	err = dynamodbattribute.UnmarshalMap(output, &plant)

	return &plant, nil
}
