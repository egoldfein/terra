package trefle

// type RawSpeciesListResp struct {
// 	Data  []Species `json:"data"`
// 	Links Link     `json:"links"`
// 	Meta  Meta     `json:"meta"`
// }

// type RawSpeciesResp struct {
// 	Data  Species `json:"data"`
// 	Meta  Meta     `json:"meta"`
// }

type RawPlantList struct {
	Data  []Plant `json:"data"`
	Links Links    `json:"links"`
	Meta  Meta     `json:"meta"`
}

type RawPlant struct {
	Data Plant `json:"data"`
	Meta  Meta     `json:"meta"`
}

type Plant struct {
	ID         int       `json:"id"`
	CommonName string    `json:"common_name"`
	ScientificName string `json:"scientific_name"`
	MainSpeciesID int `json:"main_species_id"`
	ImageURL   string    `json:"image_url"`
	PlantLinks PlantLink `json:"links"`
	Species Species `json:"main_species"`
}

type PlantLink struct {
	Self  string `json:"self"`
	Genus string `json:"genus"`
	Plant string `json:"plant"`
}

type Links struct {
	Self  string `json:"self"`
	First string `json:"first"`
	Next  string `json:"next"`
	Prev  string `json:"prev"`
	Last  string `json:"last"`
}

type Meta struct {
	LastModified string `json:"last_modified"`
	Total int `json:"total"`
}

type Species struct {
	ID         int       `json:"id"`
	CommonName string    `json:"common_name"`
	ScientificName string `json:"scientific_name"`
	Edible bool `json:"edible"`
	Distributions Distribution `json:"distributions"`
	Specifications Specifications `json:"specifications"`
	Growth Growth `json:"growth"`
}

type Distribution struct {
	Native []Native `json:"native"`
}

type Native struct {
	Name string `json:"name"`
	Slug string `json:"slug"`
}

type Specifications struct {
	GrowthRate string `json:"growth_rate"`
	AverageHeight Height `json:"average_height"`
	MaximumHeight Height `json:"maximum_height"`
}

type Growth struct {
	Description string `json:"description"`
	Light int `json:"light"`
	AtmosphericHumidity int `json:"atmospheric_humidity"`
	GrowthMonths []string `json:"growth_months"`
	Spread Width `json:"spread"`
	MinimumPrecipitation Precipitation `json:"minimum_precipitation"`
	MaximumPrecipitation Precipitation `json:"maximum_precipitation"`
	MinimumTemperature Temperature `json:"minimum_temperature"`
	MaximumTemperature Temperature `json:"maximum_temperature"`
}

type Height struct {
	Centimeters int `json:"cm"`
}

type Width struct {
	Centimeters int `json:"cm"`
}

type Precipitation struct {
	Millimeters int `json:"mm"`
}

type Temperature struct {
	Farenheit int `json:"deg_f"`
	Celcius int `json:"deg_c"`
}

type PlantListResp struct {
	Plants []PlantResp `json:"plants"`
	Links Links `json:"links"`
	Total int `json:"total"`
}

type PlantResp struct {
	ID int `json:"id"`
	CommonName string    `json:"common_name"`
	ScientificName string `json:"scientific_name"`
	Edible bool `json:"edible"`
	Light int `json:"light"`
	Humidity int `json:"humidity"`
	MinTemperature int `json:"min_temp"`
	MaxTemperature int `json:"max_temp"`
	MinPrecipitation int `json:"min_precip"`
	MaxPrecipitation int `json:"max_precip"`
	GrowthMonths []string `json:"growth_months"`
	ImageURL   string    `json:"image_url"`
}