package trefle

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
	Duration []string `json:"duration"`
	Distributions Distribution `json:"distributions"`
	Specifications Specifications `json:"specifications"`
	Growth Growth `json:"growth"`
}

type DistributionResp struct {
	Zone Zone `json:"zone"`
}

type Distribution struct {
	Native []Zone `json:"native"`
	Introduced []Zone `json:"introduced"`
}

type Zone struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Slug string `json:"slug"`
	TDWGLevel int `json:"tdwg_level"`
	TDWGCode string `json:"tdwg_code"`
	Parent *Zone `json:"parent,omitempty"`
	Child []*Zone `json:"child,omitempty"`
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
	Light int `json:"light,omitempty"`
	Humidity int `json:"humidity,omitempty"`
	MinTemperature int `json:"min_temp,omitempty"`
	MaxTemperature int `json:"max_temp,omitempty"`
	MinPrecipitation int `json:"min_precip,omitempty"`
	MaxPrecipitation int `json:"max_precip,omitempty"`
	GrowthMonths []string `json:"growth_months,omitempty"`
	Duration []string `json:"duration,omitempty"`
	ImageURL   string    `json:"image_url,"`
	Zones []Zone `json:"zones"`
}