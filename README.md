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
  - [🎉 Hacktoberfest 2024](#-hacktoberfest-2024)
    - [How to Participate](#how-to-participate)
    - [Contribution Tips](#contribution-tips)
    - [Why Contribute?](#why-contribute)

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



---

## 🎉 Hacktoberfest 2024

Thank you for your interest in contributing during [Hacktoberfest](https://hacktoberfest.com/)! We’re excited to have contributors from around the world join us in building a platform that can make a real impact in public health.

### How to Participate

1. **Sign Up for Hacktoberfest**: Go to the [Hacktoberfest website](https://hacktoberfest.com/) and register to have your contributions counted.
2. **Browse Issues**: Check out the [Issues](https://github.com/SixthFlow-Reserach-OS/OutbreakX/issues) labeled with `hacktoberfest`, `good first issue`, or `help wanted` for tasks suited for all experience levels.
3. **Get Started**:
   - Fork this repository and clone it locally.
   - Work on the issue, following our [contribution guidelines](docs/CONTRIBUTING.md).
   - Once ready, open a pull request for review.

### Contribution Tips

- **Quality Contributions**: To ensure meaningful contributions, please avoid making low-quality PRs. PRs that are spammy or unrelated will be marked as invalid.
- **Documentation is Important**: Contributions to documentation, adding tests, or improving the code structure are highly appreciated.
- **Follow the Code of Conduct**: Our [Code of Conduct](docs/CODE_OF_CONDUCT.md) outlines the standards we expect. Please ensure all interactions are respectful and constructive.

### Why Contribute?

By participating in Hacktoberfest with **OutbreakX**, you’re helping to create a tool for tracking infectious disease outbreaks, benefiting both local and global communities. This is a chance to make an impact with open-source contributions that really matter. 

Thank you for being part of this effort, and happy coding!


