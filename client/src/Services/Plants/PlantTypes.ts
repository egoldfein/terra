export interface PlantList {
  plants: Plant[];
  total: number;
  links: Link;
}

export interface Link {
  self: string;
  next: string;
  last: string;
  first: string;
}

export interface Plant {
  id: number;
  common_name: string;
  image_url: string;
  scientific_name: string;
  edible: boolean;
  light: number;
  humidity: number;
  min_temp: number;
  max_temp: number;
  min_precip: number;
  max_precip: number;
  growth_months?: string[];
}

// export interface Species {
//   id: number;
//   common_name: string;
//   edible: boolean;
//   scientific_name: string;
//   distributions: Distribution;
//   specifications: Specifications;
//   growth: Growth;
// }

// export interface Distribution {
//   native: Native[];
// }

// export interface Specifications {
//   growth_rate?: string;
//   average_height?: Height;
//   maximum_height?: Height;
// }

// export interface Growth {
//   description?: string;
//   light: number;
//   atmospheric_humidity: number;
//   growth_months?: string[];
//   spread?: Width;
//   maximum_temperature?: Temperature;
//   minimum_temperature?: Temperature;
//   maximum_precipitation?: Precipitation;
//   minimum_precipitation?: Precipitation;
// }

// export interface Native {
//   name: string;
//   slug: string;
// }

// export interface Height {
//   cm: number;
// }
// export interface Width {
//   cm: number;
// }

// export interface Precipitation {
//   mm: number;
// }

// export interface Temperature {
//   deg_f: number;
//   deg_c: number;
// }

export interface IPlantService {
  ListPlants(params: URLSearchParams): Promise<PlantList>;
  GetPlant(id: string): Promise<Plant>;
}
