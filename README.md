# StockFlow Web

React and TypeScript frontend for the StockFlow inventory management API.

StockFlow Web provides a browser-based interface for interacting with inventory data exposed by the StockFlow backend. The project is being developed incrementally, with each implemented screen consuming the real REST API rather than relying on static or mocked data.

## Current features

| Feature                                | Status      |
| -------------------------------------- | ----------- |
| Product listing from the StockFlow API | Implemented |
| Product creation                       | Implemented |
| Loading and API error states           | Implemented |
| Stock movement history                 | Implemented |
| Movement pagination                    | Implemented |
| Movement filtering by IN/OUT type      | Implemented |
| Application routing and shared layout  | Implemented |
| Stock balance interface                | Planned     |
| Warehouse interface                    | Planned     |
| Replenishment order interface          | Planned     |

## Tech stack

| Technology   | Purpose                              |
| ------------ | ------------------------------------ |
| React 19     | User interface                       |
| TypeScript 6 | Static typing                        |
| Vite 8       | Development server and build tooling |
| React Router | Client-side routing                  |
| ESLint       | TypeScript and React linting         |
| Stylelint    | CSS linting                          |
| HTMLHint     | HTML validation                      |

## Backend API

This application consumes the StockFlow REST API:

https://github.com/leandrocsiqueira/stockflow

The backend is responsible for products, warehouses, stock movements, stock balances, automatic replenishment orders, pagination, filtering and inventory business rules.

## Configuration

Create a local environment file based on the provided example.

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

The API base URL is configured through:

```text
VITE_API_BASE_URL
```

The default example configuration uses:

```text
VITE_API_BASE_URL=/api
```

## Running locally

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run all configured linters:

```bash
npm run lint:all
```

The StockFlow backend must also be running for API-backed features to work.

## Project status

StockFlow Web is an actively developed portfolio frontend connected to the StockFlow backend.

The current implementation focuses on real API integration, typed data models, request state handling, pagination and incremental delivery of inventory management features.
