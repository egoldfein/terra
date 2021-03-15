package router

import (
	"context"

	"github.com/egoldfein/terra/api"
	"github.com/egoldfein/terra/internal/trefle"
	user_plants "github.com/egoldfein/terra/internal/userPlants"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

type Router struct {
	Engine *gin.Engine
	Dependencies *Dependencies
}

type Dependencies struct {
	plantsHandler *api.PlantsHandler
	userPlantHandler *api.UserPlantHandler
}

func New(ctx context.Context, t trefle.API, u user_plants.API) *Router{
	router := &Router{
		Engine: gin.New(),
		Dependencies: &Dependencies{
			plantsHandler: api.NewPlantsHandler(t),
			userPlantHandler: api.NewUserPlantHandler(u),
		},
	}

	router.AddRoutes(ctx)
	return router
}

func (r *Router) AddStaticRoutes() {
	r.Engine.LoadHTMLGlob("./client/dist/*.html")    // load the built dist path
	r.Engine.Use(static.Serve("/", static.LocalFile("./client/dist", true))) // router endpoints
	r.Engine.NoRoute(func(c *gin.Context) {
		c.File("./client/dist/index.html")
	})
}

func (r *Router) AddAPIRoutes(ctx context.Context){	
	r.Engine.GET("/api/v1/search", func (c *gin.Context) {
		r.Dependencies.plantsHandler.ListPlants(c)
	})
	
	r.Engine.GET("/api/v1/plant/:id/detail", func(c *gin.Context) {
		r.Dependencies.plantsHandler.GetPlant(c)
	})

	r.Engine.GET("/api/v1/distribution/:id", func(c *gin.Context) {
		r.Dependencies.plantsHandler.GetDistribution(c)
	})

	r.Engine.POST("/api/v1/list", func(c *gin.Context) {
		r.Dependencies.userPlantHandler.CreatePlantList(c)
	})

	r.Engine.GET("/api/v1/list/:id", func(c *gin.Context) {
		r.Dependencies.userPlantHandler.GetPlantList(c)
	})

	r.Engine.GET("/api/v1/user/:id/lists", func(c *gin.Context) {
		r.Dependencies.userPlantHandler.GetPlantLists(c)
	})

	r.Engine.POST("/api/v1/plant", func(c *gin.Context) {
		r.Dependencies.userPlantHandler.AddPlant(c)
	})

	r.Engine.GET("/api/v1/plant/:id", func(c *gin.Context) {
		r.Dependencies.userPlantHandler.GetPlant(c)
	})


	r.Engine.PUT("/api/v1/plant", func(c *gin.Context) {
		r.Dependencies.userPlantHandler.UpdatePlant(c)
	})
}

func (r *Router) AddRoutes(ctx context.Context) {
	r.AddAPIRoutes(ctx)
	r.AddStaticRoutes()
}
