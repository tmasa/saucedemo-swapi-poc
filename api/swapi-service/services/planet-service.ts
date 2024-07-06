import { APIRequestContext, test } from "@playwright/test";
import { Planets, Result as PlanetResult } from "../contracts/planets";
import { getEndpointUrl } from "../api-configuration";
import { Result as PeopleResult } from "../contracts/people";

const ENDPOINTS = {
    GET_ALL_PLANETS: (pageNumber: number) => `planets/?page=${pageNumber}`,
    GET_PLANET: (planetId: number) => `planets/${planetId}`,
    //TODO: Can add all the endpoints here
};

export class PlanetService {
    static async getPlanets(request: APIRequestContext, pageNumber: number = 1): Promise<Planets> {
        return await test.step("Get planet", async () => {
            const planetResponse = await request.get(getEndpointUrl(ENDPOINTS.GET_ALL_PLANETS(pageNumber)));
            return await planetResponse.json();
        });
    }

    static async getPlanetOfPerson(request: APIRequestContext, person: PeopleResult): Promise<PlanetResult> {
        return await test.step("Get planet for given person", async () => {
            const planetResponse = await request.get(person.homeworld);
            return await planetResponse.json();
        });
    }
}