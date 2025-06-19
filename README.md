# Swift Dynamics Frontend Developer Test Submission

This repository contains the submission for the frontend developer test from Swift Dynamics, created by Thanabodee P. The project is a single-page application for managing a list of personal records.

## 🎥 Application Demo

Here is a short video demonstrating the application's features, including creating, editing, sorting, and deleting records, as well as language switching.

![Application Demo](https://youtu.be/KCj4ILKRnC0)

## ✨ Features

- **Form Management**: A comprehensive form for creating and updating user data with real-time validation.
- **Data Table**: Displays user data in a table with the following functionalities:
  - **Pagination**: Handles large sets of data by splitting it into pages.
  - **Sorting**: Allows sorting data by name, gender, mobile phone, and nationality.
  - **CRUD Operations**:
    - **Create**: Add new persons via the form.
    - **Read**: View person data in the table.
    - **Update**: Edit existing data by clicking the "EDIT" button, which populates the form.
    - **Delete**: Remove a single record with a confirmation pop-up.
    - **Bulk Delete**: Select and delete multiple records at once.
- **State Management**: Utilizes Redux Toolkit for robust client-side state management, ensuring data persists through navigation and re-renders.
- **Internationalization (i18n)**: Supports both **English (EN)** and **Thai (TH)** languages, which can be switched dynamically.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14
- **UI Library**: [Ant Design](https://ant.design/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [SCSS Modules](https://sass-lang.com/)
- **Date & Time**: [Day.js](https://day.js.org/)
- **Internationalization**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Thanabodee-Pond/swd-frontend-test-Pond.git](https://github.com/Thanabodee-Pond/swd-frontend-test-Pond.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd swd-frontend-test-Pond
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```
    or if you use yarn:
    ```sh
    yarn install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    or if you use yarn:
    ```sh
    yarn dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `.next` folder.
- `npm run start`: Starts a Next.js production server.
- `npm run lint`: Runs the Next.js linter to identify and fix code quality issues.
