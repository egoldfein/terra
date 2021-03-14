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

let mockPlantList: TreflePlantList = {
  plants: [mockPlant, mockPlant2],
  links: {
    self: "",
    next: "",
    last: "",
    first: "",
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

  // TO DO all mocks below
  async GetUserPlantLists(userID: string): Promise<UserPlantList[]> {
    return Promise.reject();
  }

  async GetUserPlantList(id: string): Promise<UserPlant[]> {
    return Promise.reject();
  }

  async GetUserPlant(id: string): Promise<UserPlant> {
    return Promise.reject();
  }

  async AddUserPlant(
    name: string,
    listID: string,
    trefleID: string
  ): Promise<void> {
    return Promise.reject();
  }

  async AddUserList(name: string, userID: string): Promise<void> {
    return Promise.reject();
  }
}

export default new MockPlantService();
