package api

import (
	"net/http"

	"github.com/egoldfein/terra/internal/trefle"
	"github.com/gin-gonic/gin"
)


func GetPlant(c *gin.Context, trefleClient *trefle.Client) error{
	id := c.Param("id")
	plant, err := trefleClient.GetPlant(c, id)
	if err != nil {
		return err 
	}

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data":  plant,
	})

	return nil
}

func ListPlants(c *gin.Context, trefleClient *trefle.Client) error{
	query := c.Request.URL.Query()
	light := query.Get("light")	
	edible := query.Get("edible")
	search := query.Get("search")
	page := query.Get("page")

	plantListResp, err := trefleClient.SearchPlants(c, &light, &edible, &search, &page)
	if err != nil {
		return err 
	}

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data": plantListResp,
	})

	return nil
}
