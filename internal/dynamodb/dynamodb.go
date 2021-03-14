package dynamodb

import (
	"context"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type Client struct {
	client *dynamodb.DynamoDB
}

func New(sess *session.Session) *Client {
	client := dynamodb.New(sess)
	return &Client{
		client: client,
	}
}

func (c Client) Put(ctx context.Context, tableName string, item map[string]*dynamodb.AttributeValue) (map[string]*dynamodb.AttributeValue, error) {
	input := &dynamodb.PutItemInput{
		Item:      item,
		TableName: aws.String(tableName),
	}

	output, err := c.client.PutItem(input)
	if err != nil {
		return nil, err
	}

	return output.Attributes, nil
}

func (c Client) Get(ctx context.Context, tableName string, input map[string]*dynamodb.AttributeValue) (map[string]*dynamodb.AttributeValue, error) {
	item := &dynamodb.GetItemInput{
		Key: input,
		TableName: aws.String(tableName),
	}

	result, err := c.client.GetItem(item)
	if err != nil {
		return nil, err
	}

	return result.Item, nil
}

func (c Client) Scan(ctx context.Context, input *dynamodb.ScanInput) (*dynamodb.ScanOutput, error) {
	result, err := c.client.Scan(input)
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

	output, err := c.client.UpdateItem(input)
	if err != nil {
		return nil, err
	}

	return output.Attributes, nil
}

// TO DO ADD DELETE FUNCTIONALITY
// func (c Client) Delete(ctx context.Context, tableName string, item map[string]*dynamodb.AttributeValue) (Attributes map[string]*dynamodb.AttributeValue, error) {
	
// }

