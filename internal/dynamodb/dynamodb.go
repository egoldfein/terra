package dynamodb

import (
	"context"

	log "github.com/sirupsen/logrus"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

//go:generate go run github.com/maxbrunsfeld/counterfeiter/v6 . API
type API interface {
	Put(ctx context.Context, tableName string, item map[string]*dynamodb.AttributeValue) (map[string]*dynamodb.AttributeValue, error) 
	Scan(ctx context.Context, input *dynamodb.ScanInput) (*dynamodb.ScanOutput, error)
	Get(ctx context.Context, tableName string, input map[string]*dynamodb.AttributeValue) (map[string]*dynamodb.AttributeValue, error)
	Update(ctx context.Context, tableName string, item map[string]*dynamodb.AttributeValue, key map[string]*dynamodb.AttributeValue, updateExpression string) (map[string]*dynamodb.AttributeValue, error) 
}

type Client struct {
	Client *dynamodb.DynamoDB
	logger *log.Logger
}

func New(sess *session.Session, log *log.Logger) *Client {
	client := dynamodb.New(sess)

	return &Client{
		Client: client,
		logger: log,
	}
}

func (c Client) Put(ctx context.Context, tableName string, item map[string]*dynamodb.AttributeValue) (*dynamodb.PutItemOutput, error) {
	input := &dynamodb.PutItemInput{
		Item:      item,
		TableName: aws.String(tableName),
	}

	output, err := c.Client.PutItem(input)
	if err != nil {
		return nil, err
	}

	log.Info("Succesfully created new db item")
	return output, nil
}

func (c Client) Get(ctx context.Context, tableName string, input map[string]*dynamodb.AttributeValue) (map[string]*dynamodb.AttributeValue, error) {
	item := &dynamodb.GetItemInput{
		Key: input,
		TableName: aws.String(tableName),
	}

	result, err := c.Client.GetItem(item)
	if err != nil {
		return nil, err
	}

	return result.Item, nil
}

func (c Client) Scan(ctx context.Context, input *dynamodb.ScanInput) (*dynamodb.ScanOutput, error) {
	result, err := c.Client.Scan(input)
	if err != nil {
		return nil, err
	}

	return result, nil
}


func (c Client) Update(ctx context.Context, tableName string, item map[string]*dynamodb.AttributeValue, key map[string]*dynamodb.AttributeValue, updateExpression string) (map[string]*dynamodb.AttributeValue, error) {
	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeValues: item,
		TableName: aws.String(tableName),
		Key: key,
		UpdateExpression: aws.String(updateExpression),
	}

	output, err := c.Client.UpdateItem(input)
	if err != nil {
		return nil, err
	}

	log.Info("Succesfully updated db item")
	return output.Attributes, nil
}

// TO DO ADD DELETE FUNCTIONALITY
// func (c Client) Delete(ctx context.Context, tableName string, item map[string]*dynamodb.AttributeValue) (Attributes map[string]*dynamodb.AttributeValue, error) {
	
// }

