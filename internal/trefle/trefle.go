package trefle

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
)

const (
	endpoint = "https://trefle.io/api/v1"
)

//go:generate go run github.com/maxbrunsfeld/counterfeiter/v6 . API
type API interface {
	SearchPlants(ctx context.Context, light *string, edible *string, search *string, page *string) (PlantListResp, error)
	GetPlant(ctx context.Context, id string) (*PlantResp, error)
	GetDistribution(ctx context.Context, id string) (*DistributionResp, error)
}

type APIClient struct {
	endpoint   string
	key        string
	Client *http.Client
}

// New returns a new NYT API Client
func New(key string) (*APIClient, error) {
	if key == "" {
		return nil, errors.New("api key cannot be empty")
	}
	a := &APIClient{
		endpoint:   endpoint,
		key:        key,
		Client: &http.Client{},
	}

	return a, nil
}

// SearchPlants gets a list of plants based on the search string and query parameters
func (api *APIClient) SearchPlants(ctx context.Context, light *string, edible *string, search *string, page *string) (PlantListResp, error) {
	// Build query string
	query := ""
	path := "/plants?"
	if light != nil && len(*light) > 0 {
		switch *light {
		case "low":
			query = "range[light]=0,3&"
		case "medium":
			query = "range[light]=4,6&"
		case "high":
			query = "range[light]=7,10&"
		}
	}

	if edible != nil && len(*edible) > 0 {
		query = fmt.Sprintf("%sfilter[edible]=%s&", query, *edible)
	}


	if page != nil && len(*page) > 0 {
		query = fmt.Sprintf("%spage=%s&", query, *page)
	}

	if search != nil && len(*search) > 0 {
		query = fmt.Sprintf("%sq=%s&", query, *search)
		path = "/plants/search?"
	}


	// Filter out plants that do not have these values set
	// query = fmt.Sprintf("%s&filter_not[light]=null&filter_not[maximum_temperature_deg_f]=null&filter_not[minimum_temperature_deg_f]=null&filter_not[minimum_precipitation_mm]=null&filter_not[maximum_precipitation_mm]=null", query)
	query = fmt.Sprintf("%s&filter_not[common_name]=null", query)
	urlStr := fmt.Sprintf("%s%s%s&token=%s", api.endpoint, path, query, api.key)
	resp, err := api.Client.Get(urlStr)
	if err != nil {
		return PlantListResp{}, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return PlantListResp{}, err
	}

	rawPlantList := RawPlantList{}
	err = json.Unmarshal(body, &rawPlantList)
	if err != nil {
		return PlantListResp{}, err
	}

	var plantListResp PlantListResp
	var plantResp []PlantResp
	for _, p := range rawPlantList.Data {
		plantResp = append(plantResp, PlantResp{
			ID: p.ID,
			CommonName: p.CommonName,
			ScientificName: p.ScientificName,
			ImageURL: p.ImageURL,
		})
	}

	plantListResp.Plants = plantResp
	plantListResp.Links = rawPlantList.Links
	plantListResp.Total = rawPlantList.Meta.Total

	return plantListResp, nil
}

// GetPlant gets a list of plants based on the query string
func (api *APIClient) GetPlant(ctx context.Context, id string) (*PlantResp, error) {
	if len(id) == 0 {
		return nil, errors.New("id cannot be empty")
	}

	urlStr := fmt.Sprintf("%s/plants/%s?token=%s", api.endpoint, id, api.key)
	resp, err := api.Client.Get(urlStr)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	rawPlant := RawPlant{}
	err = json.Unmarshal(body, &rawPlant)
	if err != nil {
		return nil, err
	}

	var zoneMap = make(map[int]bool)
	var zones []Zone
	for _, zone := range rawPlant.Data.Species.Distributions.Native {
		if !zoneMap[zone.ID] {
			zoneMap[zone.ID] = true
			zones = append(zones, zone)
		}
	}

	for _, zone := range rawPlant.Data.Species.Distributions.Introduced {
		if !zoneMap[zone.ID] {
			zoneMap[zone.ID] = true
			zones = append(zones, zone)
		}
	}

	plantResp := PlantResp{
		ID: rawPlant.Data.ID,
		CommonName: rawPlant.Data.CommonName,
		ScientificName: rawPlant.Data.ScientificName,
		Edible: rawPlant.Data.Species.Edible,
		Light: rawPlant.Data.Species.Growth.Light,
		Duration: rawPlant.Data.Species.Duration,
		Humidity: rawPlant.Data.Species.Growth.AtmosphericHumidity,
		MinTemperature: rawPlant.Data.Species.Growth.MinimumTemperature.Farenheit,
		MaxTemperature: rawPlant.Data.Species.Growth.MaximumTemperature.Farenheit,
		MinPrecipitation: rawPlant.Data.Species.Growth.MinimumPrecipitation.Millimeters,
		MaxPrecipitation: rawPlant.Data.Species.Growth.MaximumPrecipitation.Millimeters,
		GrowthMonths: rawPlant.Data.Species.Growth.GrowthMonths,
		ImageURL: rawPlant.Data.ImageURL,
		Zones: zones,
	}

	return &plantResp, nil
}

func (api *APIClient) GetDistribution(ctx context.Context, id string) (*DistributionResp, error) {

	if len(id) == 0 {
		return nil, errors.New("id cannot be empty")
	}

	urlStr := fmt.Sprintf("%s/distributions/%s?token=%s", api.endpoint, id, api.key)

	resp, err := api.Client.Get(urlStr)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	distrResp := DistributionResp{}
	err = json.Unmarshal(body, &distrResp)
	if err != nil {
		return nil, err
	}

	return &distrResp, nil
}