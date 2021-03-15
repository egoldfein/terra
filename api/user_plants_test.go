package api_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	handler "github.com/egoldfein/terra/api"
	user_plants "github.com/egoldfein/terra/internal/userPlants"
	"github.com/egoldfein/terra/internal/userPlants/userPlantsfakes"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// TODO Add error check tests

func TestGetUserPlantSuccess(t *testing.T) {
	var fakeUserPlants = &userPlantsfakes.FakeAPI{}
	plantResp := user_plants.Plant{}
	fakeUserPlants.GetPlantReturns(&plantResp, nil)

	h := handler.NewUserPlantHandler(fakeUserPlants)
	c, r := gin.CreateTestContext(httptest.NewRecorder())
	w := httptest.NewRecorder()

	c.Request, _ = http.NewRequest(http.MethodGet, "/api/v1/plant", nil)
    r.ServeHTTP(w, c.Request)
	err := h.GetPlant(c)
	assert.NoError(t, err)
}

func TestAddUserPlantSuccess(t *testing.T) {
	var fakeUserPlants = &userPlantsfakes.FakeAPI{}
	plantResp := user_plants.Plant{}
	fakeUserPlants.AddPlantReturns(&plantResp, nil)

	h := handler.NewUserPlantHandler(fakeUserPlants)

	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)

	req := handler.AddPlantRequest{
		ListID: "1",
		TreflePlantID: "2",
		WateringFrequency: "daily",
		Name: "1",
	}

	json, _ := json.Marshal(req)
    c.Request, _ = http.NewRequest(http.MethodPost, "/api/v1/plant", bytes.NewBuffer(json))
    r.ServeHTTP(w, c.Request)
	err := h.AddPlant(c)
	assert.NoError(t, err)
}

func TestUpdateUserPlantSuccess(t *testing.T) {
	var fakeUserPlants = &userPlantsfakes.FakeAPI{}
	fakeUserPlants.UpdatePlantReturns(nil, nil)

	h := handler.NewUserPlantHandler(fakeUserPlants)

	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)

	req := handler.UpdatePlantRequest{
		PlantID: "1",
		LastWatered: "today",
	}

	json, _ := json.Marshal(req)
   	c.Request, _ = http.NewRequest(http.MethodPut, "/", bytes.NewBuffer(json))
   	r.ServeHTTP(w, c.Request)
	err := h.UpdatePlant(c)
	assert.NoError(t, err)
}


func TestCreateListPlantSuccess(t *testing.T) {
	var fakeUserPlants = &userPlantsfakes.FakeAPI{}
	plantResp := user_plants.Plant{}
	fakeUserPlants.AddPlantReturns(&plantResp, nil)

	h := handler.NewUserPlantHandler(fakeUserPlants)

	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)

	req := handler.AddPlantRequest{
		ListID: "1",
		TreflePlantID: "2",
		WateringFrequency: "daily",
		Name: "1",
	}

	json, _ := json.Marshal(req)
    c.Request, _ = http.NewRequest(http.MethodPut, "/", bytes.NewBuffer(json))
    r.ServeHTTP(w, c.Request)
	err := h.UpdatePlant(c)
	assert.NoError(t, err)
}
