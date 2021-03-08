## Entry point of the application is local.js ##

## Serverless Deploy Configure ##

npm install serverless --dev
create lambda.js and serverless.yml
npm install aws-serverless-express
npm install serverless
aws configure --> reset accesskey and secreat key id


2 step to deploy

step 1 -

add package.json -

  "scripts": {
    "deploy": "serverless deploy"
  },

npm run deploy

Else --
step 2
serverless deploy
