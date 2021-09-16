# *_Quick start_*

This project is developed in Angular for Raychem Supervisor Client application. Basic steps are available in this guide to setup application on local machine.

* ## *_Prerequisite_*

1. In order to install Node.js and npm, follow [NodeJs](https://nodejs.org/en/) official site.
   Run the following command to check the version of node and npm.

```
$ node -v

$ npm -v
```

2. To install the Angular CLI globally using NPM, open a terminal/command window, and enter the following command:
```
$ npm install -g @angular/cli
```

* ## *_Setup_*

1. Clone this repo using git clone.
```
$ git clone git@gitlab.com:EngineeringSoftware/rs-iot-client-ng.git
```
2. Move to the appropriate directory.
```
 $ cd /rs-iot-client-ng
```
3. Run in order to install dependencies.
```
$ npm install
```
4. At this point, you can run
 ```
$ ng serve
 ``` 
5. Frontend application runs on `http://localhost:4200`

* ## *_Run Unit Test_*

1. Unit tests are configured with Jest, run below command to execute
````
npm test
````

2. To run a specific test file
````
npm test (/relative_path for the test file)
````

* ## *_Run end-to-end tests_*

1. End-to-end tests are configured with [Cypress](https://www.cypress.io/) and [Cucumber](https://cucumber.io/).
  Run below command to execute end-to-end in headless mode:
```
npm run ci
```
2. End-to-end tests are configured with [Cypress](https://www.cypress.io/) and [Cucumber](https://cucumber.io/).
  Run below command to execute end-to-end in nonheadless mode:
```
npm run co
```

* #### Note: This command runs the application on http://localhost:4200 and then runs end-to-end. There is no need to up the application in advance.

If application is already running on http://localhost:4200, please follow below steps:

Run end-to-end with cypress
```
npx cypress open --project FunctionalTest  // To run with open browser, or
npm cypress run --project FunctionalTest  // To run in headless mode
```

* ## *_Run as container_*

1. Following code can be run in containerised docker environment.
   Run the following command to build the docker image.

```
$ docker build -t <docker-image-name> .
```

2. To run the above built docker image, run the following command:
```
$ docker run -d -p 4200:80 <docker-image-name> 
```

3. Frontend application runs on `http://localhost:4200`


* ## *_GitLab ci Variable_*

Gitlab-ci job "build" accept an optional variable to assign a particular image tag. By default, image will be build with branch name as image tag. This can be over-ridden by providing below variable:

```
$ <branch-name>_IMAGE
Eg. for master branch:
$ master_IMAGE 
```

Note: Optional variable will not work for feature/improvement branches. These branches will by default build images with "feature" tag.


