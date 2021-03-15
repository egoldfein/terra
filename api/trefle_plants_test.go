package api_test

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"testing"

	"net/http"

	"github.com/egoldfein/terra/api"
	"github.com/egoldfein/terra/internal/trefle"
	"github.com/egoldfein/terra/internal/trefle/treflefakes"
	"github.com/egoldfein/terra/utils"
	"github.com/stretchr/testify/assert"
)

const (
	testToken = "token"
)

// TODO Add error check tests
func TestGetPlantSuccess(t *testing.T) {
	var fakeTrefle = &treflefakes.FakeAPI{}
	plantResp := trefle.PlantResp{
		ID: 0,
		CommonName: "",
		ScientificName: "",
		Edible:false, 
		Light:0, 
		Humidity:0, 
		MinTemperature:0, 
		MaxTemperature:0, 
		MinPrecipitation:0, 
		MaxPrecipitation:0, 
		GrowthMonths:[]string(nil), 
		ImageURL:"", 
		Duration:[]string(nil), 
		Zones:[]trefle.Zone(nil),
	}
	fakeTrefle.GetPlantReturns(&plantResp, nil)
	
	body, err := json.Marshal(plantResp)
	client := utils.NewTestClient(func(req *http.Request) *http.Response {
		assert.Equal(t, req.URL.String(), fmt.Sprintf("https://trefle.io/api/v1/plants/1?token=%s", testToken))
		return &http.Response{
			StatusCode: 200,
			Body: ioutil.NopCloser(bytes.NewBufferString(string(body))),
			Header:     make(http.Header),
		}
	})

	ctx := context.Background()
	api, err := trefle.New(testToken, nil)
	assert.Nil(t, err)

	api.Client = client
	plant, err := api.GetPlant(ctx, "1")
	assert.NoError(t, err)
	assert.Equal(t, *plant, plantResp)
}


func TestGetDistributionSuccess(t *testing.T) {
	var fakeTrefle = &treflefakes.FakeAPI{}
	distrResp := trefle.DistributionResp{
		Zone: trefle.Zone{
			ID: 1,
			Name: "Europe",
			Slug: "europe",
			TDWGLevel: 1,
			TDWGCode: "EUR",
		},
	}
	fakeTrefle.GetDistributionReturns(&distrResp, nil)
	
	body, err := json.Marshal(distrResp)
	client := utils.NewTestClient(func(req *http.Request) *http.Response {
		assert.Equal(t, req.URL.String(), fmt.Sprintf("https://trefle.io/api/v1/distributions/1?token=%s", testToken))
		return &http.Response{
			StatusCode: 200,
			Body: ioutil.NopCloser(bytes.NewBufferString(string(body))),
			Header:     make(http.Header),
		}
	})

	ctx := context.Background()
	api, err := trefle.New(testToken, nil)
	assert.Nil(t, err)

	api.Client = client
	distr, err := api.GetDistribution(ctx, "1")
	assert.NoError(t, err)
	assert.Equal(t, *distr, distrResp)
}

func TestSearchPlantsSuccess(t *testing.T) {
	fakeTrefle := &treflefakes.FakeAPI{}
	p := api.NewPlantsHandler(fakeTrefle)
	plantListResp := trefle.PlantListResp{
		Plants: []trefle.PlantResp{
			{
				ID:0, 
				CommonName:"", 
				ScientificName:"", 
				Edible:false, 
				Light:0, 
				Humidity:0, 
				MinTemperature:0,
				MaxTemperature:0,
				MinPrecipitation:0, 
				MaxPrecipitation:0, 
				GrowthMonths:[]string{}, 
				ImageURL:"", 
				Duration:[]string{}, 
				Zones:[]trefle.Zone{},
			},
		},
		Links: trefle.Links{
			Self: "",
			First: "",
			Next: "",
			Prev: "",
			Last: "",
		},
		Total: 4,
	}
	fakeTrefle.SearchPlantsReturns(plantListResp, nil)
	body, err := json.Marshal(plantListResp)

	client := utils.NewTestClient(func(req *http.Request) *http.Response {
		query := req.URL.Query()
		standardQuery := "filter_not[frost_free_days_minimum]=null&filter_not[light]=null&filter_not[minimum_precipitation_mm]=null&filter_not[minimum_temperature_deg_f]=null&filter_not[minimum_precipitation_mm]=null&filter_not[maximum_precipitation_mm]=null&filter_not[growth_months]=null"
		assert.Equal(t, req.URL.String(), fmt.Sprintf("https://trefle.io/api/v1/plants/search?range[light]=4,6&q=%s&%s&token=%s", query.Get("q"), standardQuery, testToken))
		return &http.Response{
			StatusCode: 200,
			Body: ioutil.NopCloser(bytes.NewBufferString(string(body))),
			Header:     make(http.Header),
		}
	})

	ctx := context.Background()
	api, err := trefle.New(testToken, nil)
	assert.Nil(t, err)

	api.Client = client
	
	light := "medium"
	search := "rose"
	plantList, err := p.Trefle.SearchPlants(ctx, &light, nil, &search, nil)
	assert.NoError(t, err)
	assert.Equal(t, plantList, plantListResp)
}
