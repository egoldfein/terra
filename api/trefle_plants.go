package api

import (
	"net/http"

	"github.com/egoldfein/terra/internal/trefle"
	"github.com/gin-gonic/gin"
)

type PlantsHandler struct {
	Trefle trefle.API
}

func NewPlantsHandler(t trefle.API) *PlantsHandler {
	return &PlantsHandler{
		Trefle: t,
	}
}

func (p *PlantsHandler) GetPlant(c *gin.Context) error{
	id := c.Param("id")
	plant, err := p.Trefle.GetPlant(c, id)
	if err != nil {
		return err 
	}

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data":  plant,
	})

	return nil
}

func (p *PlantsHandler) ListPlants(c *gin.Context) error{
	query := c.Request.URL.Query()
	light := query.Get("light")	
	edible := query.Get("edible")
	search := query.Get("search")
	page := query.Get("page")

	plantListResp, err := p.Trefle.SearchPlants(c, &light, &edible, &search, &page)
	if err != nil {
		return err 
	}

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data": plantListResp,
	})

	return nil
}

func (p *PlantsHandler) GetDistribution(c *gin.Context) error{
	id := c.Param("id")

	distributionResp, err := p.Trefle.GetDistribution(c, id)
	if err != nil {
		return err 
	}
	
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"data": distributionResp,
	})

	return nil
}
