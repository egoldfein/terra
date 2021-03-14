export class Api {
  async get(url: string): Promise<object | object[]> {
    let request: RequestInit = {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let resp = await fetch(url, request)
      .then(async (resp) => {
        return await resp.json();
      })
      .catch((err) => {
        throw new Error(err);
      });

    return resp.data;
  }

  async post(url: string, body: BodyInit): Promise<object | object[]> {
    let request: RequestInit = {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    let resp = await fetch(url, request)
      .then(async (resp) => {
        return await resp.json();
      })
      .catch((err) => {
        throw new Error(err);
      });

    return resp.data;
  }

  async put(url: string, body: BodyInit): Promise<object | object[]> {
    let request: RequestInit = {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    let resp = await fetch(url, request)
      .then(async (resp) => {
        return await resp.json();
      })
      .catch((err) => {
        throw new Error(err);
      });

    return resp.data;
  }
}

export default new Api();
