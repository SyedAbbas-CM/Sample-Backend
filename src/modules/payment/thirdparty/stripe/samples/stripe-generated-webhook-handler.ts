// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

import stripe from 'stripe';

import express from 'express';

import * as dotenv from 'dotenv';


import EnvironmentVariables from 'src/common/interfaces/environmentVariables';

import { STRIPE_API_VERSION } from '../config';


dotenv.config({
    path: '../../.env'
});

const app = express();


const {
    STRIPE_SECRET_KEY,
    STRIPE_ENDPOINT_SECRET_LOCAL,
} = process.env as EnvironmentVariables;

const stripeInstance = new stripe(
    STRIPE_SECRET_KEY,
    {
        apiVersion: STRIPE_API_VERSION
    });

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = STRIPE_ENDPOINT_SECRET_LOCAL;


const eventProcessorFunctions = {
    default: (...args): void => { console.log(args) }
}


export const stripeGeneratedWebhookHandler = (data, options: any = {}): unknown => {
    const { 'stripe-signature': signature } = options;

    let event;

    try {
        event = stripeInstance
            .webhooks
            .constructEvent(data, signature, endpointSecret);
    } catch (err) {
        throw `Webhook Error: ${err.message}`;
    }

    const {
        type,
        data: { object: dataObject }
    } = event;

    const processor = eventProcessorFunctions[type] || eventProcessorFunctions.default;

    const responseToSend = processor(dataObject);

    return responseToSend;
}

app.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (req, res, next) => {
        const responded = stripeGeneratedWebhookHandler(req.body, { ...req.headers });
        res.send(responded);
    })

app.listen(4242, () => { console.log('live') });