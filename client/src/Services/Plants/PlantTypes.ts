export interface TreflePlantList {
  plants: TreflePlant[];
  total: number;
  links: Link;
}

export interface TreflePlant {
  id: number;
  common_name: string;
  image_url: string;
  scientific_name: string;
  edible: boolean;
  light?: number;
  humidity?: number;
  min_temp?: number;
  max_temp?: number;
  min_precip?: number;
  max_precip?: number;
  growth_months?: string[];
  zones?: Zone[];
}

export interface UserPlant {
  id: number;
  plant_id: string;
  name: string;
  last_watered: string;
  watering_frequency: string;
}

export interface UserPlantList {
  name: string;
  id: string;
  user_id: string;
}

export interface Zone {
  id: number;
  name: string;
  tdwg_level: number;
  tdwg_code: string;
  parent?: Zone;
  children?: Zone[];
}

export interface Link {
  self: string;
  next: string;
  last: string;
  first: string;
}

export interface IPlantService {
  ListTreflePlants(params: URLSearchParams): Promise<TreflePlantList>;
  GetTreflePlant(id: string): Promise<TreflePlant>;
  GetUserPlant(id: string): Promise<UserPlant>;
  AddUserPlant(
    name: string,
    listID: string,
    trefleID: string,
    watering_frequency: string
  ): Promise<void>;
  AddUserList(name: string, userID: string): Promise<void>;
  GetDistribution(id: number): Promise<Zone>;
  GetUserPlantLists(userID: string): Promise<UserPlantList[]>;
  GetUserPlantList(id: string): Promise<UserPlant[]>;
}
