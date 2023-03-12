This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Outdefine Frontend

## Node Version

### `16.15.1`

## Available Scripts 

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
### `yarn test`

Runs tests against the application.

### `yarn build`

Builds the app with react-scripts

## Tech Stack
```
- Core: React 17.0.2, Typescript 4.6.3
- Bootstrap: Create-react-app
- Styling: TailwindCSS
- State Management: Redux, Redux-thunk (redux-toolkit)
- Unit Test: Jest & React Testing Library
```
## Project Structure

```
/public [All static content]
/src
    /__test__ [test files]
    /assets
        Images and svgs used in application
    /app [redux store]
    /components [common reusable components]
        /forms
        /containers
        /LocationAutoComplete
        /Logo
        /onboarding
        /profile
        /upload
        /UploadButton
        ...
    /config [application config]
        /aws [aws config]
        /profile [profile config]
    /network [All Apis]
    /constants [constants used in project]
        /profile
        /userRole
    /helpers [helper functions like axios]
        /axios
        /user
    /redux
        /slices [reducers & actions in redux-toolkit]
        /types [types definitions used in project redux]
    /routes
    /styles [some common scss files]
    /utils [common logics, routes and stage testing files]
    App.tsx
package.json
jest.config.js [jest configuration]
tailwind.config.js [tailwindCSS config]
tsconfig.json [typescript config]
README.md
```

## Deployment

Using AWS amplify for deployment.

```
pre - 
    All modified code for deployment must show in the main branch
    change version number in package.json file
    run  `yarn install`

Deploy
        All commits and PRs made to the main branch will instantly trigger Amplify deployment
```

## Responsive Checks

Two media query break-downs

```
sm: '576px',
md: '768px',
lg: '1024px',
xl: '1440px'
```

## App All Routes

for client panel -
```
Auth & Onboarding
/
/welcome
/login
/signup
/forgotpassword
/confirmUser
/resetPassword
/onboard

Profile
/profile
    /profile/edit
    /edit/preference
    /edit/summary
    /edit/projects
    /edit/experience
    /edit/education

Dashboard
/
```
