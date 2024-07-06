export function getEndpointUrl(endpoint: string): string {
    return process.env['SWAPI_SERVER'] + endpoint;
}