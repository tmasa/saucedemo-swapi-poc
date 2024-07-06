## Rationale

This POC was created as a homework exercise in July 2024.

The POC fits into a 3-tier test automation architecture to manage multiple test levels and types in one test automation framework.

## Goal

The goal of the POC is to provide a simple demonstration of executing an E2E workflow on a demo web shop.
Some of the fields must be filled with data fetched from an external API, so the POC also contains some simple API calls.

## Preconditions

NodeJS and NPM must be installed.

# Execution

- Install dependencies (defined in the package.json file) by executing "npm install" command
- Execute the test script "test:poc" defined in the package.json file

## Tools

The solution uses Playwright with TypeScript, along with the following dependencies.
- EsLint/TsLint: for static analysis to enforce good coding practices
- QuickType: to provide type safety by generating contracts for an external API that does not have an OpenAPI specification 
- DotEnv: to provide environment variables (hardcoded with static data for the purpose of the POC)

# Layers

- Test Layer: Utilizes the Playwright test runner to execute E2E and API scripts. The POC has only one E2E test under tests/e2e/main folder. 
- Business Logic Layer: Uses Page Objects and API Services to encapsulate business logic of the tested application(s)
- Core Layer: In addition to Playwright core interfaces (Page, Locator, Test, etc.), this layer also contains 
  - contracts for used APIs
  - setup scripts for global setup
  - fixtures for test-specific setup
  - configuration files for executing different suites of tests by using projects
  - built-in reporting
  - test steps to generate a readable report even for non-technical people

