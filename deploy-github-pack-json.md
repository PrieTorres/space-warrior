{
  "name": "space-warrior",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "homepage": "https://PrieTorres.github.io/space-warrior",
  "proxy": "http://localhost:4000",
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "animate.css": "^4.1.1",
    "babel-plugin-react-css-modules": "^5.2.6",
    "concurrently": "^8.2.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "firebase": "^10.12.4",
    "firebase-functions": "^5.0.1",
    "lodash": "^4.17.21",
    "mongoose": "^8.5.1",
    "nodemon": "^3.1.4",
    "postcss": "^8.4.31",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-joystick-component": "^6.2.1",
    "react-scripts": "5.0.1",
    "sass": "^1.67.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "predeploy": "npm run build",
    "deploy-pages": "gh-pages -d build",
    "deploy": "npm run build && npx firebase deploy",
    "start": "concurrently \"react-scripts start\" \"nodemon src/server.js\"",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "eslint-plugin-prettier": "^5.0.0",
    "gh-pages": "^6.0.0",
    "prettier": "^3.0.0"
  }
}