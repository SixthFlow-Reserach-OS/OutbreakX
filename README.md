# OutbreakX

OutbreakX is an open-source platform designed for **infectious disease surveillance**. It utilizes geospatial data to track and visualize disease outbreaks in real time, aiding public health efforts with detailed, accurate, and up-to-date location-based insights.
The platform leverages **ExpressJS, NodeJS, ReactJS, PostgreSQL with PostGIS,** and **OpenStreetMaps** to enable efficient data collection, analysis, and visualization of infectious disease patterns.

## Table of Contents

- [OutbreakX](#outbreakx)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Project](#running-the-project)
      - [Start Frontend](#start-frontend)
      - [Start Backend](#start-backend)
      - [Start Full Project with Turborepo](#start-full-project-with-turborepo)
  - [Contributing](#contributing)

## Features

- **Real-Time Outbreak Tracking**: Monitor infectious disease outbreaks with real-time data and visualizations.
- **Geospatial Analysis**: Powered by PostGIS, OutbreakX enables precise mapping and spatial analysis of disease data.
- **User-Friendly Interface**: A React-based frontend provides a smooth, responsive experience.
- **Open Data Integration**: Integrates OpenStreetMaps for comprehensive mapping capabilities.
- **API Access**: Node.js backend with Express allows seamless access to data for further analysis.

## Technologies

- **Frontend**: ReactJS, leafletjs, OpenStreetMaps
- **Backend**: ExpressJS, NodeJS
- **Database**: PostgreSQL with PostGIS extension for geospatial data
- **Monorepo Management**: Turborepo, pnpm

## Getting Started

### Prerequisites

Ensure you have the following tools installed:

- **Node.js** (>= 14.x)
- **pnpm** (Package manager, installation instructions [here](https://pnpm.io/installation))
- **PostgreSQL** (with PostGIS extension)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SixthFlow-Reserach-OS/OutbreakX.git
   cd OutbreakX
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up PostgreSQL and PostGIS**:

   - Ensure PostgreSQL is running and initialize a database for OutbreakX.
   - Enable PostGIS on the database. For example:
     ```sql
     CREATE EXTENSION postgis;
     ```

4. **Configure Environment Variables**:

   - Create a `.env` file in the root directory and add necessary environment variables (e.g., database credentials, API keys).

### Running the Project

#### Start Frontend

To start the frontend workspace:

```bash
pnpm --filter frontend start
```

#### Start Backend

To start the backend workspace:

```bash
pnpm --filter backend dev
```

#### Start Full Project with Turborepo

To run both frontend and backend together using Turborepo:

```bash
turbo run dev
```

> **Note**: If you encounter any errors, please check the Turborepo configuration or the `package.json` files in individual workspaces for any issues.


## Contributing

We welcome contributions! Please read our [Contributing Guidelines](docs/CONTRIBUTING.md) for details on the process for submitting pull requests and reporting issues.
