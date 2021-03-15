import {
  TreflePlant,
  TreflePlantList,
  UserPlantList,
  UserPlant,
  Zone,
  IPlantService,
} from "../PlantTypes";

let mockPlant: TreflePlant = {
  id: 0,
  common_name: "plant 1",
  image_url: "image-url.com/12345",
  scientific_name: "plantius science",
  edible: false,
  light: 0,
  humidity: 10,
  min_temp: 0,
  max_temp: 50,
  min_precip: 0,
  max_precip: 40,
};

let mockPlant2: TreflePlant = {
  id: 0,
  common_name: "plant 1",
  image_url: "image-url.com/12345",
  scientific_name: "plantius science",
  edible: false,
  light: 0,
  humidity: 10,
  min_temp: 0,
  max_temp: 50,
  min_precip: 0,
  max_precip: 40,
};

let mockUserPlant: UserPlant = {
  id: 0,
  plant_id: "1",
  name: "my plant",
  last_watered: "123",
  watering_frequency: "daily",
};

let mockUserPlantList: UserPlantList = {
  name: "My first list",
  id: "123",
  user_id: "1",
};

let mockPlantList: TreflePlantList = {
  plants: [mockPlant, mockPlant2],
  links: {
    self: "self-url",
    next: "next-url",
    last: "last-url",
    first: "first-url",
  },
  total: 1,
};

let mockZone: Zone = {
  id: 0,
  name: "zone-1",
  tdwg_code: "EUR",
  tdwg_level: 1,
};

export class MockPlantService implements IPlantService {
  __getOne = mockPlant;
  __getNone = null;
  __getSome = mockPlantList;
  __getZone = mockZone;
  __getOneUserPlant = mockUserPlant;
  __getUserPlantList = [mockUserPlant];
  __getUserPlantsLists = [mockUserPlantList];
  async ListTreflePlants(params: URLSearchParams): Promise<TreflePlantList> {
    return Promise.resolve(mockPlantList);
  }

  async GetTreflePlant(id: string): Promise<TreflePlant> {
    if (id !== "") {
      Promise.resolve(mockPlant);
    }
    return Promise.reject();
  }

  async GetDistribution(id: number): Promise<Zone> {
    if (id !== null) {
      return Promise.resolve(mockZone);
    }
    return Promise.reject();
  }

  async GetUserPlantLists(userID: string): Promise<UserPlantList[]> {
    if (userID !== null) {
      return Promise.resolve(this.__getUserPlantsLists);
    }
    return Promise.reject();
  }

  async GetUserPlantList(id: string): Promise<UserPlant[]> {
    if (id !== null) {
      return Promise.resolve(this.__getUserPlantList);
    }
    return Promise.reject();
  }

  async GetUserPlant(id: string): Promise<UserPlant> {
    if (id != "") {
      return Promise.resolve(mockUserPlant);
    }
    return Promise.reject();
  }

  async AddUserPlant(
    name: string,
    listID: string,
    trefleID: string
  ): Promise<void> {
    if (name !== "" && listID != "" && trefleID != "") {
      return Promise.resolve();
    }
    return Promise.reject();
  }

  async AddUserList(name: string, userID: string): Promise<void> {
    if (name !== "" && userID !== "") {
      return Promise.resolve();
    }
    return Promise.reject();
  }

  GetLevel(measurement: number): string {
    if (measurement <= 3) {
      return "Low";
    } else if (measurement > 3 && measurement < 6) {
      return "Medium";
    } else {
      return "High";
    }
  }
}

export default new MockPlantService();
