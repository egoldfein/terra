import {
  Zone,
  UserPlantList,
  UserPlant,
  TreflePlant,
  TreflePlantList,
  IPlantService,
} from "./PlantTypes";
import api from "../Api";

export class PlantService implements IPlantService {
  private endpoint: string = "http://localhost:8080/api/v1";

  // ListTreflePlants returns a list of plants from the from the Trefle API
  async ListTreflePlants(params: URLSearchParams): Promise<TreflePlantList> {
    let resp = await api
      .get(`${this.endpoint}/search?${params.toString()}`)
      .catch((err) => {
        return new Error(err);
      });
    return resp as TreflePlantList;
  }

  // GetTreflePlant returns a plant by id from the Trefle API
  async GetTreflePlant(id: string): Promise<TreflePlant> {
    let resp = await api
      .get(`${this.endpoint}/plant/${id}/detail`)
      .catch((err) => {
        return new Error(err);
      });
    return resp as TreflePlant;
  }

  // GetUserPlantLists returns all of a user's lists
  async GetUserPlantLists(userID: string): Promise<UserPlantList[]> {
    let resp = await api
      .get(`${this.endpoint}/user/${userID}/lists`)
      .catch((err) => {
        return new Error(err);
      });
    return resp as UserPlantList[];
  }

  // GetUserPlantList returns a user's list of plants by list id
  async GetUserPlantList(id: string): Promise<UserPlant[]> {
    let resp = await api.get(`${this.endpoint}/list/${id}`).catch((err) => {
      return new Error(err);
    });

    return resp as UserPlant[];
  }

  // GetUserPlant returns a user's plant by id
  async GetUserPlant(id: string): Promise<UserPlant> {
    let resp = await api.get(`${this.endpoint}/plant/${id}`).catch((err) => {
      return new Error(err);
    });
    return resp as UserPlant;
  }

  // AddUserPlant creates a new plant in a user's list
  async AddUserPlant(
    name: string,
    listID: string,
    trefleID: string,
    frequency: string
  ): Promise<void> {
    let requestBody = JSON.stringify({
      list_id: listID,
      name: name,
      trefle_plant_id: trefleID.toString(),
      watering_frequency: frequency,
    });
    await api.post(`${this.endpoint}/plant/`, requestBody).catch((err) => {
      return new Error(err);
    });
  }

  // AddUserList creates a new user plant list
  async AddUserList(name: string, userID: string): Promise<void> {
    let requestBody = JSON.stringify({
      user_id: userID,
      name: name,
    });
    await api.post(`${this.endpoint}/list`, requestBody).catch((err) => {
      return new Error(err);
    });
  }

  // UpdateLastWatered updates when plant was last watered
  async UpdateLastWatered(plantID: string, date: string): Promise<void> {
    let requestBody = JSON.stringify({
      id: plantID,
      last_watered: date,
    });
    await api.put(`${this.endpoint}/plant`, requestBody).catch((err) => {
      return new Error(err);
    });
  }

  // GetDistribution returns a distribution zone by id
  async GetDistribution(id: number): Promise<Zone> {
    let resp = await api
      .get(`${this.endpoint}/distribution/${id.toString()}`)
      .catch((err) => {
        return new Error(err);
      });
    return resp as Zone;
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

export default new PlantService();
