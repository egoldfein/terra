import { Plant, PlantList, IPlantService } from "./PlantTypes";

export class PlantService implements IPlantService {
  searchEndpoint: string = "http://localhost:8080/api/v1/search?";
  plantEndpoint: string = "http://localhost:8080/api/v1/plant";
  async ListPlants(params: URLSearchParams): Promise<PlantList> {
    let request: RequestInit = {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let resp = await fetch(
      this.searchEndpoint + params.toString(),
      request
    ).then(async (resp) => {
      return await resp.json();
    });
    return resp.data;
  }

  async GetPlant(id: string): Promise<Plant> {
    let request: RequestInit = {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let resp = await fetch(this.plantEndpoint + "/" + id, request).then(
      async (resp) => {
        return await resp.json();
      }
    );
    return resp.data;
  }
}

export default new PlantService();
