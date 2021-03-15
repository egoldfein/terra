package user_plants_test

import (
	"context"
	"errors"
	"testing"

	user_plants "github.com/egoldfein/terra/internal/userPlants"
	"github.com/egoldfein/terra/internal/userPlants/userPlantsfakes"
	"github.com/stretchr/testify/assert"
)

const (
	testToken = "token"
)

func TestGetPlantLists(t *testing.T) {
	var userPlantsfakes = &userPlantsfakes.FakeAPI{
		GetPlantListsStub: func(ctx context.Context, userID string) (*[]user_plants.PlantList, error) {
			if userID == "" {
				return nil, errors.New("userID cannot be empty")
			}			
			
			return	&[]user_plants.PlantList{
				{
					ID: "1",
					UserID: userID,
					Name: "My Plant List",
				},
				{
					ID: "2",
					UserID: userID,
					Name: "My Second Plant List",
				},
			}, nil
		},
	}

	ctx := context.Background()
	cases := []struct{
		userID string
		errorStr string
	}{
		{
			userID: "0",
		},

		{
			userID: "123",
		},
		{
			userID: "456",
		},
	}

	for i, c := range cases {
		plantLists, err := userPlantsfakes.GetPlantLists(ctx, c.userID)
		list := *plantLists
		assert.NoError(t, err)
		assert.NotNil(t, plantLists)
		_, userID := userPlantsfakes.GetPlantListsArgsForCall(i)
		assert.Equal(t, userID, c.userID)
		assert.Equal(t, list[0].UserID, c.userID)
	}
}

func TestGetPlant(t *testing.T) {
	var fakeUserPlants = &userPlantsfakes.FakeAPI{
		GetPlantStub: func(ctx context.Context, id string) (*user_plants.Plant, error) {
			if id == "" {
				return nil, errors.New("id cannot be empty")
			 }
			 
			 return &user_plants.Plant{}, nil
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

	for _, c := range cases {
		plant, err := fakeUserPlants.GetPlant(ctx, c.id)
		if err != nil {
			assert.Equal(t, err.Error(), c.errorStr)
			assert.Nil(t, plant)
		} else {
			assert.NotNil(t, plant)
		 }
	}
}

func TestAddPlant(t *testing.T) {
	var fakeUserPlants = &userPlantsfakes.FakeAPI{
		AddPlantStub: func(ctx context.Context, name, listID, treflePlantID, wateringFrequency string) (*user_plants.Plant, error) {
			return &user_plants.Plant{
				ID: "1",
				PlantID: "12",
				PlantListID: "123",
				Name: "My first plant",
				WateringFrequency: "daily",
				CreatedAt: "",
				UpdatedAt:"",
				LastWatered: "",
			}, nil
		},
	}

	ctx := context.Background();
	cases := []struct{
		name string
		listID string
		treflePlantID string
		wateringFrequency string
		errorStr string
	}{
		{
			name: "my first plant",
			listID: "1",
			treflePlantID: "123",
			wateringFrequency: "weekly",
			errorStr: "name cannot be empty",
		},
		{
			name: "my second plant",
			listID: "2",
			treflePlantID: "456",
			wateringFrequency: "daily",
			errorStr: "name cannot be empty",
		},
	}

	for i, c := range cases {
		plant, err := fakeUserPlants.AddPlant(ctx, c.name, c.listID, c.treflePlantID, c.wateringFrequency)
		if err != nil {
			assert.Equal(t, err.Error(), c.errorStr)
			assert.Nil(t, plant)
		} else {
			_, name, listID, treflePlantID, wateringFrequency := fakeUserPlants.AddPlantArgsForCall(i)
			assert.Equal(t, name, c.name)
			assert.Equal(t, listID, c.listID)
			assert.Equal(t, treflePlantID, c.treflePlantID)
			assert.Equal(t, wateringFrequency, c.wateringFrequency)
		 }
	}
}
