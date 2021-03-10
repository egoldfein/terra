package trefle_test

import (
	"context"
	"errors"
	"strconv"
	"testing"

	"github.com/egoldfein/terra/internal/trefle"
	"github.com/egoldfein/terra/internal/trefle/treflefakes"
	"github.com/stretchr/testify/assert"
)

const (
	testToken = "token"
)

func TestNewSuccess(t *testing.T) {
	client, err := trefle.New(testToken)
	assert.NoError(t, err)
	assert.NotNil(t, client)
}

func TestNewError(t *testing.T) {
	client, err := trefle.New("")
	assert.Error(t, err)
	assert.Equal(t, err.Error(), "api key cannot be empty")
	assert.Nil(t, client)
}

func TestSearchPlant(t *testing.T) {
	var fakeTrefle = &treflefakes.FakeTrefle{
		SearchPlantsStub: func(context.Context, *string, *string, *string) ([]trefle.Plant, error) {
			return []trefle.Plant{
				{
					ID: 1,
					CommonName: "plant1",

				},
			}, nil
		},
	}

	ctx := context.Background()
	cases := []struct{
		light string
		edible string
		search string

	}{
		{
			light: "0",
			edible: "true",
			search: "rose",
		},
		{
			light: "",
			edible: "",
			search: "",
		},
		{
			light: "10",
			edible: "false",
			search: "rose",
		},
	}

	for i, c := range cases {
		plants, err := fakeTrefle.SearchPlants(ctx, &c.light, &c.edible, &c.search)
		assert.NoError(t, err)
		assert.NotNil(t, plants)
		_, light, edible, search := fakeTrefle.SearchPlantsArgsForCall(i)
		assert.Equal(t, light, &c.light)
		assert.Equal(t, edible, &c.edible)
		assert.Equal(t, search, &c.search)
		assert.Equal(t, plants[0].CommonName, "plant1")
		assert.Equal(t, plants[0].ID, 1)
	}

}

func TestGetPlant(t *testing.T) {
	var fakeTrefle = &treflefakes.FakeTrefle{
		GetPlantStub: func(ctx context.Context, id string) (*trefle.Plant, error) {
			if id == "" {
				return nil, errors.New("id cannot be empty")
			}

			intID, _ := strconv.Atoi(id)
			return &trefle.Plant{
					ID: intID,
					CommonName: "plant1",
			}, nil
		},
	}

	ctx := context.Background()
	cases := []struct{
		id string
		errorStr string
	}{
		{
			id: "123",
		},
		{
			id: "456",
		},
		{
			id: "",
			errorStr: "id cannot be empty",
		},

	}

	for i, c := range cases {
		plant, err := fakeTrefle.GetPlant(ctx, c.id)
		if err != nil {
			assert.Equal(t, err.Error(), c.errorStr)
			assert.Nil(t, plant)
		} else {
			assert.NotNil(t, plant)
			_, id := fakeTrefle.GetPlantArgsForCall(i)
			assert.Equal(t, id, c.id)
			assert.Equal(t, plant.CommonName, "plant1")
			intID, _ := strconv.Atoi(c.id)
			assert.Equal(t, plant.ID, intID)
		 }
	}
}

