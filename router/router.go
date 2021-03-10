package router

import (
	"context"

	"github.com/egoldfein/terra/api"
	"github.com/egoldfein/terra/internal/trefle"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func AddStaticRoutes(r *gin.Engine) {
	r.LoadHTMLGlob("./client/dist/*.html")    // load the built dist path
	r.Use(static.Serve("/", static.LocalFile("./client/dist", true))) // router endpoints
	r.NoRoute(func(c *gin.Context) {
		c.File("./client/dist/index.html")
	})

}

func AddAPIRoutes(ctx context.Context, r *gin.Engine, trefleClient *trefle.Client){
	r.GET("/api/v1/search", func(c *gin.Context) {
		api.ListPlants(c, trefleClient)
	})
	
	r.GET("/api/v1/plant/:id", func(c *gin.Context) {
		api.GetPlant(c, trefleClient)
	})

}

func AddRoutes(ctx context.Context, r *gin.Engine, trefleClient *trefle.Client) {
	AddAPIRoutes(ctx, r, trefleClient)
	AddStaticRoutes(r)
}