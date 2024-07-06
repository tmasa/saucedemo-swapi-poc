import { APIRequestContext, test } from "@playwright/test";
import { CheckoutInformationData } from "@pages/checkout-information/checkout-information-page";
import { parseFullName } from "../../../utils/utils";
import { Result as PlanetResult } from "@contracts/planets";
import { Result as PeopleResult } from "@contracts/people";
import { PersonService } from "@services/person-service";
import { PlanetService } from "@services/planet-service";


export async function generateCheckoutInformation(request: APIRequestContext): Promise<CheckoutInformationData> {
    return await test.step("Get data from the backend", async () => {
        const selectedPerson: PeopleResult = await PersonService.getRandomPerson(request);
        const {firstName, lastName} = parseFullName(selectedPerson.name);
        const planetData: PlanetResult = await PlanetService.getPlanetOfPerson(request, selectedPerson);
        return {
            firstName: firstName,
            lastName: lastName,
            postalCode: planetData.name
        };
    });
}