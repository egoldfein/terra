export class Api {
  async get(url: string): Promise<object | object[]> {
    let request: RequestInit = {
      method: "GET",
      cache: "no-cache",
      mode: "no-cors",
    };
    let resp = await fetch(url, request);
    console.log(resp);
    return resp;
  }
}

export default new Api();
