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
	var fakeTrefle = &treflefakes.FakeAPI{
		SearchPlantsStub: func(context.Context, *string, *string, *string, *string) (trefle.PlantListResp, error) {
			return trefle.PlantListResp{
				Plants: []trefle.PlantResp{
					{
						ID: 1,
						CommonName: "plant1",
					},
					{
						ID: 2,
						CommonName: "plant2",
					},
				},
			}, nil
		},
	}

	ctx := context.Background()
	cases := []struct{
		light string
		edible string
		search string
		page string

	}{
		{
			light: "0",
			edible: "true",
			search: "rose",
			page: "",
		},
		{
			light: "",
			edible: "",
			search: "",
			page: "",
		},
		{
			light: "10",
			edible: "false",
			search: "rose",
			page: "2",
		},
	}

	for i, c := range cases {
		plantList, err := fakeTrefle.SearchPlants(ctx, &c.light, &c.edible, &c.search, &c.page)
		assert.NoError(t, err)
		assert.NotNil(t, plantList)
		_, light, edible, search, page := fakeTrefle.SearchPlantsArgsForCall(i)
		assert.Equal(t, light, &c.light)
		assert.Equal(t, edible, &c.edible)
		assert.Equal(t, search, &c.search)
		assert.Equal(t, page, &c.page)
		assert.Equal(t, plantList.Plants[0].CommonName, "plant1")
		assert.Equal(t, plantList.Plants[0].ID, 1)
	}

}

func TestGetPlant(t *testing.T) {
	var fakeTrefle = &treflefakes.FakeAPI{
		GetPlantStub: func(ctx context.Context, id string) (*trefle.PlantResp, error) {
			if id == "" {
				return nil, errors.New("id cannot be empty")
			}

			intID, _ := strconv.Atoi(id)
			return &trefle.PlantResp{
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

func TestGetDistribution(t *testing.T) {
	var fakeTrefle = &treflefakes.FakeAPI{
		GetDistributionStub: func(ctx context.Context, id string) (*trefle.DistributionResp, error) {
			if id == "" {
				return nil, errors.New("id cannot be empty")
			}

			intID, _ := strconv.Atoi(id)
			return &trefle.DistributionResp{
					Zone: trefle.Zone{
						ID: intID,
						Name: "EUR",
						Slug: "eur",
						TDWGLevel: 1,
						TDWGCode: "eur",
					},
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
			id: "",
			errorStr: "id cannot be empty",
		},

	}

	for i, c := range cases {
		zone, err := fakeTrefle.GetDistribution(ctx, c.id)
		if err != nil {
			assert.Equal(t, err.Error(), c.errorStr)
			assert.Nil(t, zone)
		} else {
			assert.NotNil(t, zone)
			_, id := fakeTrefle.GetDistributionArgsForCall(i)
			assert.Equal(t, id, c.id)
			assert.Equal(t, zone.Zone.Name, "EUR")
			intID, _ := strconv.Atoi(c.id)
			assert.Equal(t, zone.Zone.ID, intID)
		 }
	}
}
