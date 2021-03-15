package dynamodb_test

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
	"github.com/egoldfein/terra/internal/dynamodb/dynamodbfakes"
	user_plants "github.com/egoldfein/terra/internal/userPlants"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

type mockDynamoDBClient struct {
    dynamodbiface.DynamoDBAPI
}

func (m *mockDynamoDBClient) MockGet(item *dynamodb.GetItemInput) (*dynamodb.GetItemOutput, error) {
	plant := user_plants.Plant{
		ID:   uuid.New().String(),
		PlantListID: "1",
		PlantID: "2",
		Name: "name",
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
		UpdatedAt: time.Now().UTC().Format(time.RFC3339),
		LastWatered: time.Now().UTC().Format(time.RFC3339),
		WateringFrequency: "daily",
	}

	av, _ := dynamodbattribute.MarshalMap(plant)	
	output := dynamodb.GetItemOutput{
		Item: av,
	}
	return &output, nil
}

func TestPutError(t *testing.T) {
	var dbFake = &dynamodbfakes.FakeAPI{
		PutStub: func(context.Context, string, map[string]*dynamodb.AttributeValue) (map[string]*dynamodb.AttributeValue, error) {
			return nil, errors.New("Unable to add item to database")
		},
	}

	ctx := context.Background()
	input := map[string]*dynamodb.AttributeValue{}
	output, err := dbFake.Put(ctx, "tableName", input)
	assert.Error(t, err)
	assert.Nil(t, output)
}

func TestGetSuccess(t *testing.T) {
	mockSvc := &mockDynamoDBClient{}
	var dbFake = &dynamodbfakes.FakeAPI{
		GetStub: func(ctx context.Context, tableName string, item map[string]*dynamodb.AttributeValue) (map[string]*dynamodb.AttributeValue, error) {
			input := &dynamodb.GetItemInput{
				Key:      item,
				TableName: aws.String(tableName),
			}
			output, err := mockSvc.MockGet(input)
			return output.Item, err
		},
	}



	ctx := context.Background()
	input := map[string]*dynamodb.AttributeValue{
		"id": {
			S: aws.String("1"),
		},
	}
	output, err := dbFake.Get(ctx, "tableName", input)
	assert.NoError(t, err)
	assert.NotNil(t, output)

	plant := user_plants.Plant{}
	err = dynamodbattribute.UnmarshalMap(output, &plant)	
	expectedoutput := map[string]*dynamodb.AttributeValue(map[string]*dynamodb.AttributeValue{"created_at":{
		S: &plant.CreatedAt,
	  }, "id":{
		S: &plant.ID,
	  }, "last_watered":{
		S: &plant.LastWatered,
	  }, "name":{
		S:  &plant.Name,
	  }, "plant_id":{
		S:  &plant.PlantID,
	  }, "plant_list_id":{
		S:  &plant.PlantListID,
	  }, "updated_at":{
		S: &plant.CreatedAt,
	  }, "watering_frequency":{
		S: &plant.WateringFrequency,
	  }})
	
	assert.Equal(t, output, expectedoutput)
}

func TestGetError(t *testing.T) {
	var dbFake = &dynamodbfakes.FakeAPI{
		PutStub: func(context.Context, string, map[string]*dynamodb.AttributeValue) (map[string]*dynamodb.AttributeValue, error) {
			return nil, errors.New("Unable to get item in database")
		},
	}

	ctx := context.Background()
	input := map[string]*dynamodb.AttributeValue{}
	output, err := dbFake.Put(ctx, "tableName", input)
	assert.Error(t, err)
	assert.Nil(t, output)
}


func TestScanSuccess(t *testing.T) {
	var dbFake = &dynamodbfakes.FakeAPI{
		ScanStub: func(context.Context, *dynamodb.ScanInput) (*dynamodb.ScanOutput, error) {
			output := dynamodb.ScanOutput{}
			return &output, nil
		},
	}

	ctx := context.Background()
	input := dynamodb.ScanInput{}
	output, err := dbFake.Scan(ctx, &input)
	assert.NoError(t, err)
	assert.NotNil(t, output)
}

func TestScanError(t *testing.T) {
	var dbFake = &dynamodbfakes.FakeAPI{
		ScanStub: func(context.Context, *dynamodb.ScanInput) (*dynamodb.ScanOutput, error)  {
			return nil, errors.New("Unable to scan items in database")
		},
	}

	ctx := context.Background()
	input := dynamodb.ScanInput{}
	output, err := dbFake.Scan(ctx, &input)
	assert.Error(t, err)
	assert.Nil(t, output)
}

func TestUpdateSuccess(t *testing.T) {
	var dbFake = &dynamodbfakes.FakeAPI{
		UpdateStub: func(context.Context, string, map[string]*dynamodb.AttributeValue, map[string]*dynamodb.AttributeValue, string) (map[string]*dynamodb.AttributeValue, error) {
			output := map[string]*dynamodb.AttributeValue{}
			return output, nil
		},
	}

	ctx := context.Background()
	input := map[string]*dynamodb.AttributeValue{}
	output, err := dbFake.Update(ctx, "tableName", input, input, "")
	assert.NoError(t, err)
	assert.NotNil(t, output)
}

func TestUpdateError(t *testing.T) {
	var dbFake = &dynamodbfakes.FakeAPI{
		UpdateStub: func(context.Context, string, map[string]*dynamodb.AttributeValue, map[string]*dynamodb.AttributeValue, string) (map[string]*dynamodb.AttributeValue, error) {
			return nil, errors.New("Unable to update item in database")
		},
	}

	ctx := context.Background()
	input := map[string]*dynamodb.AttributeValue{}
	output, err := dbFake.Update(ctx, "tableName", input, input, "")
	assert.Error(t, err)
	assert.Nil(t, output)
}