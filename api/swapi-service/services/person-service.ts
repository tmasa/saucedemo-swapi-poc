import { APIRequestContext, test } from "@playwright/test";
import { People, Result as PeopleResult } from "../contracts/people";
import { getEndpointUrl } from "../api-configuration";

const ENDPOINTS = {
    GET_ALL_PEOPLE: (pageNumber: number) => `people/?page=${pageNumber}`,
    GET_PERSON_BY_ID: (personId: number) => `people/${personId}`,
    //TODO: Can add all the endpoints here
};

export class PersonService {
    static async getAllPeople(request: APIRequestContext, pageNumber: number = 1): Promise<People> {
        return await test.step("Get people", async () => {
            const endpoint = getEndpointUrl(ENDPOINTS.GET_ALL_PEOPLE(pageNumber));
            const personResponse = await request.get(endpoint);
            return await personResponse.json();
        });
    }

    static async getPersonById(request: APIRequestContext, personId: number): Promise<PeopleResult> {
        return await test.step("Get people", async () => {
            const planetResponse = await request.get(getEndpointUrl(ENDPOINTS.GET_PERSON_BY_ID(personId)));
            return await planetResponse.json();
        });
    }

    static async getRandomPerson(request: APIRequestContext): Promise<PeopleResult> {
        return await test.step("Get person", async () => {
            let peopleData = await this.getAllPeople(request);

            const indexToSelect = Math.floor(Math.random() * peopleData.count);
            const pageToOpen = Math.floor(indexToSelect / 10) + 1;

            if (pageToOpen > 1) {
                peopleData = await this.getAllPeople(request, pageToOpen);
            }

            const itemToPick = indexToSelect % 10;
            return peopleData.results[itemToPick];
        });
    }
}