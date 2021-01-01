# Serverless SNS SQS offline Example


We are using [ElasticMQ](https://github.com/softwaremill/elasticmq), an in-memory message queue system, with serverless-offline-sqs plugin to simulate the local AWS SQS environment. We have provided a docker-compose file to establish the ElasticMQ service. 

```sh 
$ cd ./elasticMQ
$ docker-compose up -d
```

### Development
We are using [nodemon](https://www.npmjs.com/package/nodemon) for hot loading and [serverless-offline](https://www.npmjs.com/package/serverless-offline) to simulate the lambda environment.

```sh
$ npm install
$ npm run dev
```

### Deploy

```sh
$ npm install
$ npm run deploy
```
