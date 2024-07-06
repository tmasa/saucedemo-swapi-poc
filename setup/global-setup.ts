/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FullConfig, request } from '@playwright/test';
import { InputData, jsonInputForTargetLanguage, quicktype } from 'quicktype-core';
import * as fs from 'fs';
import { assert } from "ts-essentials";

async function fetchSwApi(url: string): Promise<any> {
    const apiContext = await request.newContext();
    const response = await apiContext.get(url);
    return response.json();
}

async function generateTypes(json: any, typeName: string): Promise<string> {
    const language = 'typescript';
    const jsonInput = jsonInputForTargetLanguage(language);
    await jsonInput.addSource({
        name: typeName,
        samples: [JSON.stringify(json)],
    });

    const inputData = new InputData();
    inputData.addInput(jsonInput);

    const result = await quicktype({
        inputData,
        lang: language,
        rendererOptions: {
            'just-types': 'true'
        }
    });

    return result.lines.join('\n');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function generateContracts(config: FullConfig) {
    assert(process.env['SWAPI_SERVER'], 'External service URL is not defined!');
    const url = process.env['SWAPI_SERVER'];
    const data = await fetchSwApi(url);
    for (const endpoint of Object.keys(data)) {
        const data = await fetchSwApi(url + endpoint);
        const out = await generateTypes(data, endpoint.charAt(0).toUpperCase() + endpoint.slice(1));
        fs.writeFileSync(`api/swapi-service/contracts/${endpoint}.ts`, out);
    }


}

export default generateContracts;