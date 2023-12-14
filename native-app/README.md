# Machine Health App (React Native Expo)

Welcome to the Machine Health App, a React Native Expo project designed to evaluate the health of various machines in an automobile factory. This README will guide you on setting up and running the app, as well as understanding its structure.

## Getting Started

To get started with the app, follow these steps:

### Prerequisites

Before you begin, make sure you have the following software installed on your development machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (package manager)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running Expo projects)

### Installation

```bash
yarn
```

### Install Native module

```bash
cd ios & pod install
```
this is required because we added a new native module for auth (@descope/react-native-sdk)

### Running the App

To run the app, use the following command:

```bash
yarn start
```

This will launch the Expo development server, and you can access the app on your device using the Expo Go app or an emulator. You can hit `i` or `a` on the keyboard to launch the ios or android app respectively.

Expo App will fail since it doesn't have the native modules, then you need to build the app on the device/emulator.

## Project Structure

The project structure is organized as follows:

- `App.tsx`: The entry point of the Expo app, where the navigation is configured.
- `components/`: Contains reusable components used throughout the app.
- `app/`: Contains individual screens or pages/tabs of the app.
- `data/`: Stores JSON files with machine and part data for evaluation.

## Screens and Features

The app has the following screens and features:

- **Login**: Allows users to log in with email or Social (Social might fail on DEV because of custom redirect required)
- **Machine Health**: Allows users to select a machine, part name, and part value, and calculates the health score of the machine.
- **Setting**: Allows users to see their data and logout
- **History** Allow users to retrieve historical data
