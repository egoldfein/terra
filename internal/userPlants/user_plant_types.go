package user_plants

// PlantList contains information related to a user's plant list
type PlantList struct {
	ID string `json:"id"`
	UserID string `json:"user_id"`
	Name string `json:"name"`
}

// Plant contains information about plants within a user's plant list
type Plant struct {
	ID string `json:"id"`
	PlantID    string `json:"plant_id"`
	PlantListID string `json:"plant_list_id"`
	Name string `json:"name"`	
	WateringFrequency string `json:"watering_frequency"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
	LastWatered string `json:"last_watered"`	
}