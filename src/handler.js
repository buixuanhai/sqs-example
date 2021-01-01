"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const getQueueUrl = (queueName)  => {
	const {
		NODE_ENV, AWS_DEPLOY_REGION, AWS_ACCOUNT_ID, SERVICE,
	} = process.env;

	const fullName = [SERVICE, NODE_ENV, "sqs", queueName].join("-");

	if (NODE_ENV === "development") {
		return [
			"http://localhost:9324",
			"queue",
			fullName,
		].join("/");
	}

	return [
		`https://sqs.${AWS_DEPLOY_REGION}.amazonaws.com`,
		AWS_ACCOUNT_ID,
		fullName,
	].join("/");
};

async function sendMessage(event) {
	const sqs = new AWS.SQS();

	try {
		const body = JSON.parse(event.body);
		await sqs.sendMessage({
			MessageBody: JSON.stringify(body),
			QueueUrl: getQueueUrl('myQueue')
		}).promise();

	} catch (error) {
		console.log(error);
	}
}

async function receiveMessage(event) {
	console.log('Receive event')
	console.log(JSON.parse(event.Records[0].body))
}

module.exports.sendMessage = sendMessage;
module.exports.receiveMessage = receiveMessage;
