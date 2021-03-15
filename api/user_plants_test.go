package api_test

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	handler "github.com/egoldfein/terra/api"
	user_plants "github.com/egoldfein/terra/internal/userPlants"
	"github.com/egoldfein/terra/internal/userPlants/userPlantsfakes"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)
func TestGetUserPlant(t *testing.T) {
	mockPlant := &user_plants.Plant{
		ID: "1",
		PlantID: "123",
		PlantListID: "456",
		Name: "My First List",
		WateringFrequency: "Daily",
		CreatedAt: "2006-01-02T15:04:05Z07:00",
		UpdatedAt: "2006-01-02T15:04:05Z07:00",
		LastWatered: "2006-01-02T15:04:05Z07:00",
	}
	var fakeUserPlants = &userPlantsfakes.FakeAPI{
		GetPlantStub: func(context.Context, string) (*user_plants.Plant, error) {
			return mockPlant, nil
		},
	}

	h := handler.NewUserPlantHandler(fakeUserPlants)
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "http://localhost/api/v1/plant/12", nil)
    r.ServeHTTP(w, c.Request)
	err := h.GetPlant(c)
	assert.NoError(t, err)

	resp := w.Result()
	body, _ := io.ReadAll(resp.Body)
	plantJSON, _ := json.Marshal(mockPlant)
	assert.Contains(t, string(body), string(plantJSON))
}

func TestAddUserPlant(t *testing.T) {
	mockPlant := &user_plants.Plant{
		ID: "1",
		PlantID: "123",
		PlantListID: "456",
		Name: "My First List",
		WateringFrequency: "Daily",
		CreatedAt: "2006-01-02T15:04:05Z07:00",
		UpdatedAt: "2006-01-02T15:04:05Z07:00",
		LastWatered: "2006-01-02T15:04:05Z07:00",
	}

	var fakeUserPlants = &userPlantsfakes.FakeAPI{
		AddPlantStub: func(context.Context, string, string, string, string) (*user_plants.Plant, error) {
			return mockPlant, nil
		},
	}

	h := handler.NewUserPlantHandler(fakeUserPlants)
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodPost, "http://localhost/api/v1/plant", nil)
    r.ServeHTTP(w, c.Request)
	err := h.AddPlant(c)
	assert.NoError(t, err)

	resp := w.Result()
	body, _ := io.ReadAll(resp.Body)
	plantJSON, _ := json.Marshal(mockPlant)
	assert.Contains(t, string(body), string(plantJSON))
}

func TestGetPlantList(t *testing.T) {
	mockPlantList := []user_plants.Plant{
		{
			ID: "1",
			Name: "My First Plant",
		},
	}

	var fakeUserPlants = &userPlantsfakes.FakeAPI{
		GetPlantListStub: func(context.Context, string) (*[]user_plants.Plant, error) {
			return &mockPlantList, nil
		},
	}

	h := handler.NewUserPlantHandler(fakeUserPlants)
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodPost, "http://localhost/api/v1/list", nil)
    r.ServeHTTP(w, c.Request)
	err := h.GetPlantList(c)
	assert.NoError(t, err)

	resp := w.Result()
	body, _ := io.ReadAll(resp.Body)
	plantJSON, _ := json.Marshal(mockPlantList)
	assert.Contains(t, string(body), string(plantJSON))
}

func TestGetPlantLists(t *testing.T) {
	mockPlantLists := []user_plants.PlantList{
		{
			ID: "1",
			Name: "My First List",
			UserID: "123",
		},
	}

	var fakeUserPlants = &userPlantsfakes.FakeAPI{
		GetPlantListsStub: func(context.Context, string) (*[]user_plants.PlantList, error) {
			return &mockPlantLists, nil
		},
	}

	h := handler.NewUserPlantHandler(fakeUserPlants)
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodPost, "http://localhost/api/v1/list", nil)
    r.ServeHTTP(w, c.Request)
	err := h.GetPlantLists(c)
	assert.NoError(t, err)

	resp := w.Result()
	body, _ := io.ReadAll(resp.Body)
	plantJSON, _ := json.Marshal(mockPlantLists)
	assert.Contains(t, string(body), string(plantJSON))
}

func TestCreatePlantList(t *testing.T) {
	mockPlantList := &user_plants.PlantList{
		ID: "1",
		Name: "My First List",
		UserID: "123",
	}

	var fakeUserPlants = &userPlantsfakes.FakeAPI{
		CreatePlantListStub: func(context.Context, string, string) (*user_plants.PlantList, error) {
			return mockPlantList, nil
		},
	}

	h := handler.NewUserPlantHandler(fakeUserPlants)
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodPost, "http://localhost/api/v1/list", nil)
    r.ServeHTTP(w, c.Request)
	err := h.CreatePlantList(c)
	assert.NoError(t, err)

	resp := w.Result()
	body, _ := io.ReadAll(resp.Body)
	plantJSON, _ := json.Marshal(mockPlantList)
	assert.Contains(t, string(body), string(plantJSON))
}
