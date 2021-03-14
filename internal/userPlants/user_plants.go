package user_plants

import (
	"context"
	"errors"
	"fmt"
	"time"

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
	UpdatePlant(ctx context.Context, plantID string, lastWatered string) (error)
}

type APIClient struct {
	db *dbClient.Client
}

// New returns a new User Plants API Client
func New(d *dbClient.Client) (*APIClient, error) {
	if d == nil {
		return nil, errors.New("dynamo client cannot be found")
	}
	
	a := &APIClient{
		db: d,
	}

	return a, nil
}

func (a *APIClient) CreatePlantList(ctx context.Context, userID string, name string) (*PlantList, error) {
	item := PlantList{
		ID:   uuid.New().String(),
		UserID: userID,
		Name: name,
	}

	av, err := dynamodbattribute.MarshalMap(item)
	if err != nil {
		return nil, err
	}

	output, err := a.db.Put(ctx, plantListTable, av)
	if err != nil {
		return nil, err
	}

	list := PlantList{}
	err = dynamodbattribute.UnmarshalMap(output, &list)
	if err != nil {
		return nil, err
	}

	return &list, nil
}

func (a *APIClient) GetPlantLists(ctx context.Context, userID string) (*[]PlantList, error){	
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

	result, err := a.db.Scan(ctx, input)
	if err != nil {
		return nil, err
	}

	list := []PlantList{}
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &list)
	if err != nil {
		return nil, err
	}

	return &list, nil
}

func (a *APIClient) AddPlant(ctx context.Context, name, listID, treflePlantID, wateringFrequency string) (*Plant, error) {	
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
		return nil, err
	}

	output, err := a.db.Put(ctx, plantsTable, av)
	if err != nil {
		return nil, err
	}

	plant := Plant{}
	err = dynamodbattribute.UnmarshalMap(output, &plant)
	if err != nil {
		return nil, err
	}

	return &plant, nil
}

func (a *APIClient) GetPlantList(ctx context.Context, listID string) (*[]Plant, error) {
	filt := expression.Name("plant_list_id").Equal(expression.Value(listID))
	proj := expression.NamesList(expression.Name("id"), expression.Name("name"))
	expr, err := expression.NewBuilder().WithFilter(filt).WithProjection(proj).Build()
	if err != nil {
  		fmt.Println(err)
	}

	input := &dynamodb.ScanInput{
  		ExpressionAttributeNames:  expr.Names(),
  		ExpressionAttributeValues: expr.Values(),
  		FilterExpression:          expr.Filter(),
  		ProjectionExpression:      expr.Projection(),
  		TableName:                aws.String(plantsTable),
	}

	result, err := a.db.Scan(ctx, input)
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

func (a *APIClient) GetPlant(ctx context.Context, plantID string) (*Plant, error) {
	input := map[string]*dynamodb.AttributeValue{
		"id": {
			S: aws.String(plantID),
		},
	}

	result, err := a.db.Get(ctx, plantsTable, input)

	if err != nil {
		return nil, err
	}

	plant := Plant{}
	err = dynamodbattribute.UnmarshalMap(result, &plant)
	if err != nil {
		return nil, err
	}

	return &plant, nil
}

func (a *APIClient)	UpdatePlant(ctx context.Context, plantID string, lastWatered string) (error) {	
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

	_, err := a.db.Update(ctx, plantsTable, input, key, "set last_watered = :w, updated_at = :u")
	if err != nil {
		return err
	}

	return nil
}
