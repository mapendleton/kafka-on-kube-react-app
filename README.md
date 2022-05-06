**react-nodejs-basic**

---

This repo contains a generic react app template that is served by an express server. This is meant to serve as a starter project for any new frontends the Services Integration team wants to build out.

<u>Development Setup</u>

1. Select `Use this template` from this repository
2. Create a new repo named appropriately for your project
3. Clone this new repo
4. CD into new folder from clone
5. Run `npm i` to install dependencies
6. Run `npm run start:dev` to start the project locally

---

<u>Material UI</u>  
[Material UI](https://mui.com/material-ui/getting-started/installation/) is being used for styling to keep a consistent look and feel, maximize flexibility, and minimize the amount of effort required to style the page.

The color theme used throughout the site can be customized by updating `./client/util/theme.js`.

<u>PrettierJS</u>  
This project uses prettierjs to enforce consistent formatting. Prettier configurations can be added to the `.prettierrc` file in the root directory. In order to run prettier, run `npm run format`.
In order to ignore running prettier on specific files, add the file or directory to the `.prettierignore` file in the root directory.

Prettier will automatically be ran against the project when committing.

<u>Lint</u>
To run linting on the project, run `npm run clean`.

Linting will automatically be ran against the project when committing. All errors must be corrected prior to committing code.

<u>CommitLint</u>  
<u>Husky</u>
