package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	user_plants "github.com/egoldfein/terra/internal/userPlants"

	"github.com/gin-gonic/gin"
)

type CreateListRequest struct {
	UserID string `json:"user_id"`
	Name string `json:"name"`
}

type AddPlantRequest struct {
	ListID string `json:"list_id"`
	TreflePlantID string `json:"trefle_plant_id"`
	WateringFrequency string `json:"watering_frequency"`
	Name string `json:"name"`
}

type UpdatePlantRequest struct {
	PlantID string `json:"id"`
	LastWatered string `json:"last_watered"`
}

type UserPlantHandler struct {
	userClient user_plants.API
}


func NewUserPlantHandler(u user_plants.API) *UserPlantHandler {
	return &UserPlantHandler{
		userClient: u,
	}
}

func (u *UserPlantHandler) CreatePlantList(c *gin.Context) error{
	requestData, err := ioutil.ReadAll(c.Request.Body)
	var createListRequest CreateListRequest
	json.Unmarshal(requestData, &createListRequest)
	plantList, err := u.userClient.CreatePlantList(c, createListRequest.UserID, createListRequest.Name)

	if err != nil {
		return err
	}

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data": plantList,
	})

	return nil
}

func (u *UserPlantHandler) GetPlantLists(c *gin.Context) error{
	id := c.Param("id")
	plantList, err := u.userClient.GetPlantLists(c, id)

	if err != nil {
		return err
	}

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data": plantList,
	})

	return nil
}

func (u *UserPlantHandler) GetPlantList(c *gin.Context) error{
	id := c.Param("id")
	plantList, err := u.userClient.GetPlantList(c, id)
	if err != nil {
		return err
	}
	
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data": plantList,
	})

	return nil
}

func (u *UserPlantHandler) AddPlant(c *gin.Context) error{
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	var addPlantRequest AddPlantRequest
	json.Unmarshal(jsonData, &addPlantRequest)

	plant, err := u.userClient.AddPlant(c, addPlantRequest.Name, addPlantRequest.ListID, addPlantRequest.TreflePlantID, addPlantRequest.WateringFrequency)

	if err != nil {
		return err
	}

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data": plant,
	})

	return nil
}


func (u *UserPlantHandler) UpdatePlant(c *gin.Context) error{
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	var updatePlantRequest UpdatePlantRequest
	json.Unmarshal(jsonData, &updatePlantRequest)

	err = u.userClient.UpdatePlant(c, updatePlantRequest.PlantID, updatePlantRequest.LastWatered)
	if err != nil {
		return err
	}

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{})

	return nil
}

func (u *UserPlantHandler) GetPlant(c *gin.Context) error{
	id := c.Param("id")
	plant, err := u.userClient.GetPlant(c, id)

	if err != nil {
		return err
	}

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data": plant,
	})

	return nil
}