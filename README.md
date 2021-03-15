# terra

A web service for all your plant needs:

- Uses the [Trefle API](https://docs.trefle.io/) to gather specific plant data
- Allows user to create lists of plants and set watering frequency and update when the plant was last watered
- Allows user to search Trefle's plant data to learn more about a plant

What's next:

- Notify user when it's time to water a plant on their list(s)
- Allow users to upload photos of their own plants

# Running locally

- retrieve all environment variables detailed in environment.template and copy into .env
  - Trefle API Key can be retrieved [here](https://docs.trefle.io/docs/guides/getting-started/#what-you-need)
- cd into client directory and create `auth_config.json` and add the following [Auth0](https://auth0.com/) credentials:

```{
  "domain": <YOUR DOMAIN ID>
  "clientId": <YOUR CLIENT ID>
}
```

- run `npm run build`
- cd to root directory and run `make dev`
- go to http://localhost:8080
