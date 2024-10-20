# Contribution Guidelines for OutbreakX (Hacktoberfest 2024)

Thank you for your interest in contributing to **OutbreakX**, an open-source project for infectious disease surveillance using geospatial data. Contributions from the community are what make this project successful, and we are excited to have you onboard during Hacktoberfest!

OutbreakX is built with **ExpressJS**, **NodeJS**, **ReactJS**, **PostgreSQL** (with **PostGIS**), and **OpenStreetMaps**, and focuses on providing real-time tracking of disease outbreaks.

Please take a moment to review this document before contributing. By participating in this project, you agree to abide by the following guidelines.

## Table of Contents

- [Contribution Guidelines for OutbreakX (Hacktoberfest 2024)](#contribution-guidelines-for-outbreakx-hacktoberfest-2024)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Getting Started](#getting-started)
  - [How to Contribute](#how-to-contribute)
  - [Development Setup](#development-setup)
    - [Steps:](#steps)
  - [Contribution Guidelines](#contribution-guidelines)
    - [Coding Standards](#coding-standards)
    - [Git Workflow](#git-workflow)
    - [Frontend Contributions (ReactJS)](#frontend-contributions-reactjs)
    - [Backend Contributions (NodeJS/ExpressJS)](#backend-contributions-nodejsexpressjs)
    - [Testing](#testing)
  - [Issue Reporting](#issue-reporting)
  - [Pull Request Process](#pull-request-process)
  - [Hacktoberfest Participation](#hacktoberfest-participation)
  - [Contact](#contact)

---

## Code of Conduct

We expect all contributors to uphold our [Code of Conduct](CODE_OF_CONDUCT.md), which aims to create a welcoming and respectful community for everyone. Please make sure to familiarize yourself with it before contributing.

## Getting Started

To get started with contributing:

1. **Fork** the repository to your GitHub account.
2. **Clone** your fork to your local machine:
   ```bash
   git clone https://github.com/your-username/outbreakx.git
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How to Contribute

We welcome contributions in the following areas:

- **Bug Fixes**: If you encounter any bugs, feel free to tackle them.
- **New Features**: Check out the [issues](https://github.com/OutbreakX/issues) page for feature requests or suggest your own.
- **Documentation**: We always need improvements in documentation, including code comments and guides.
- **Testing**: Help improve test coverage for both the frontend and backend.
- **UI/UX Improvements**: Contributions to the ReactJS-based frontend are highly appreciated.

## Development Setup

Ensure you have the following installed:

- **Node.js** (version 18.x.x or higher)
- **PostgreSQL** (with PostGIS extension)
- **npm** or **yarn**

### Steps:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Set up the PostgreSQL database and configure the PostGIS extension.

3. Create a `.env` file in the project root with the required environment variables (you can use `.env.example` as a template).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. The application should be accessible at `http://localhost:3000`.

## Contribution Guidelines

### Coding Standards

- Follow **ESLint** rules for JavaScript and React.
- Make sure your code adheres to our formatting rules (we use **Prettier**).
- Keep your commits clean and organized. Follow a standard commit message format, such as:
  - `feat: description of the feature`
  - `fix: description of the fix`
  - `docs: description of documentation change`
  
### Git Workflow

- **Fork** the repository and create your branch from `main`.
- Ensure that your pull request is **small and focused**. Large PRs are harder to review and slower to merge.
- Keep your branch up-to-date with the latest changes in the `main` branch.
- Write **descriptive commit messages**.
- Squash commits if necessary, especially when addressing review comments.

### Frontend Contributions (ReactJS)

- Use functional components and React hooks where appropriate.
- Follow a **component-based architecture** for better maintainability.
- If introducing new UI elements, ensure they are **responsive** and follow accessible design patterns.

### Backend Contributions (NodeJS/ExpressJS)

- Follow **RESTful API design principles**.
- Ensure that database queries are optimized, especially when dealing with geospatial data in **PostgreSQL/PostGIS**.
- Add appropriate error handling.

### Testing

- Contributions should include tests for new or modified functionality.
- We use **Jest** for unit testing.
- Ensure that the test coverage does not decrease.

## Issue Reporting

If you find a bug or have a feature request:

1. Check the [issues](https://github.com/OutbreakX/issues) to see if the problem has already been reported.
2. If the issue is not listed, open a new one and provide a detailed description, steps to reproduce (if applicable), and any related logs or screenshots.

## Pull Request Process

1. **Fork** the repository and create your feature branch from `main`.
2. Ensure that your code follows the guidelines and that you have included relevant tests.
3. Submit your pull request.
4. Wait for feedback and respond to review comments.

Make sure that your pull request description includes:

- A **summary** of the changes.
- A link to the related issue (if applicable).
- Any **screenshots** or visuals if your changes involve UI improvements.

## Hacktoberfest Participation

OutbreakX is proud to be a part of **Hacktoberfest 2024**! To participate:

1. Ensure that your pull requests are **quality contributions** (not spam or trivial changes).
2. Each PR should address an issue, add a meaningful feature, or improve documentation in a significant way.
3. Make sure your pull request is marked as **Hacktoberfest-accepted** by our maintainers.

**Note**: PRs that are labeled as "invalid" or "spam" will not be counted towards Hacktoberfest.

## Contact

If you have any questions, feel free to reach out to us via:

- **GitHub Discussions**: [OutbreakX Discussions](https://github.com/OutbreakX/discussions)
- **Email**: outbreakx-support@sixthflow.com

We are looking forward to your contributions! Happy coding, and enjoy Hacktoberfest 2024! 🎉

