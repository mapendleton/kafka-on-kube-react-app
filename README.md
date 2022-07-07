**kafka-on-kube-react-app**

---

This repo contains a React app that connects to kafka in kubernetes for POC purposes.

<u>\*Development Setup</u>

1. clone this repo
2. CD into new folder from clone
3. Run `npm i` to install dependencies
4. Run `npm run start:dev` to start the project locally

\* Messages will only be produced to a kafka topic if you are also running the [kafka-on-kube-react-app](https://github.gapinc.com/services-integration/kafka-on-kube-react-app) (including kafka,zookeeper).

To run in a Docker Container in Kubernetes (minikube), locally:

1. run `local-setup/start.sh`
2. navigate to localhost:4001

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
CommitLint is being used to generate team alignment on commits. Additional details on commit rules can be found in commitlint.config.js, in the project's root directory. Example commits:  
feat(producer-component): add connection to RESTful service
chore: adding sonar scan

<u>Husky</u>  
Husky is being used to add pre commit hooks that help enforce prettier, linting, and unit testing standards. Additional information can be held [here](https://www.npmjs.com/package/husky).
