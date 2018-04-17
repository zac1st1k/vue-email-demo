# (WIP) vue-email-app

> Sending email

## Build Setup

``` bash
# install dependencies
npm install

# serve front end with hot reload at localhost:8080
npm run dev

# serve back end at localhost:8888
npm run server

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Instruction
 * Run`npm run server` to start back end
 * Run`npm start` to start front end
 * Enter one email in the `To` input field
 * Enter subject and and body
 * Click `send` button to send the email

## To-do
 * Front end
   * Progressively disclose CC & BCC fields
   * Animate form Validation
   * Re-layout Multiple emails pills

 * Back end
   * Sendgrid integration
   * CC BCC is ignored on back
   * Multiple emails on back end is not ready due to Mailgun recipients white list

 * Demo
   * Host frond end on gitHub pages
   * Host back end on heroku
   * Add GIF in markdown to show the e2d journey 