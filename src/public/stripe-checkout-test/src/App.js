import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./Stripe/CheckoutForm";
import "./App.css";

import { currencies } from './imports';

const {
  REACT_APP_STRIPE_PUBLIC_KEY,
  REACT_APP_API_BASE,
} = process.env;

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  const [isPaymentIntentReceived, setPaymentIntent] = useState(null);

  const [isRetrievingIntent, setintentRetrieving] = useState(null);

  const [currency, setCurrency] = useState('EUR');

  const [value, setValue] = useState(0);

  const [token, setToken] = useState('');

  const [captureMethod, setCaptureMethod] = useState('automatic');

  const [isLoading, setLoading] = useState(true);

  const [paymentSuccessful, setPaymentSuccessful] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');

    setPaymentSuccessful(payment);

    setLoading(false);
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const createIntent = async () => {

    setClientSecret('');
    setPaymentIntent(false);
    setintentRetrieving(true);

    if (!(token && currency && value))
      return false;

    // Create PaymentIntent as soon as the page loads
    try {
      const paymentIntent = fetch(REACT_APP_API_BASE + '/payment/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '.concat(token)
        },
        body: JSON.stringify(
          {
            "paymentMethodId": "pm_1N3E7iGdYzWy8gXys7U9bhRr",
            // Converting cents to currency
            "amount": +value * 100,
            "currency": currency,
            "customerId": "cus_NorrnC56D3wpzk"
          }
        ),
      });

      // const paymentMethods = fetch(REACT_APP_API_BASE + '/payment/methods', {
      //   method: "GET",
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: 'Bearer '.concat(token)
      //   }
      // });



      const [fetched] = await Promise.all([
        paymentIntent,
      ])

      // eslint-disable-next-line no-unused-vars
      const {
        data,
        data: {
          client_secret: useClientSecret,
          capture_method,
        }
      } = await fetched.json();

      setPaymentIntent(JSON.stringify(data));

      setCaptureMethod(capture_method)

      // eslint-disable-next-line no-unused-vars
      setClientSecret(useClientSecret);
    } catch (exc) {
      console.log(exc)
    }
  }

  const formHandler = () => {
    return false;
  }

  return (
    paymentSuccessful
      ? <div>
        <h1>
          'Payment Successful'
        </h1>
        <button
          onClick={() => {
            const params = new URLSearchParams();

            params.delete('payment');
            setPaymentSuccessful(null);
            window.location.href = window.location.origin;
          }}>
          Try another payment
        </button>
      </div >
      : !isLoading
        ? <div>
          <h1>Payment test</h1>
          <div className="App" style={{
            width: '500px',
            overflowWrap: 'break-word',
            fontSize: '0.7rem',
            padding: '1rem'
          }}>
            <form onSubmit={formHandler} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <select
                style={{ margin: '3px' }}
                onChange={({ target: { value } }) => setCurrency(value)}>
                {currencies
                  .map(currency => <option value={currency}>{currency}</option>)}
              </select>
              <input
                type="number"
                min="1"
                max="100000"
                placeholder="Enter currency"
                style={{ margin: '3px' }}
                onChange={({ target: { value } }) => setValue(value)} />
              <input
                placeholder="Auth token"
                style={{ margin: '3px' }}
                onChange={({ target: { value } }) => setToken(value)} />
            </form>
            <button
              onClick={createIntent}
            >Start Payment</button>
            {!isPaymentIntentReceived && isRetrievingIntent
              && <div style={{ fontSize: '3rem', color: 'black' }}>... Retrieving</div>}
            {isPaymentIntentReceived
              && <div style={{ padding: '1rem', margin: '1px' }}>In process</div>}
            {clientSecret && (console.log(options, stripePromise) || true) && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm
                  currency={currency}
                  captureMethod={captureMethod}
                  clientSecret={clientSecret}
                />
              </Elements>
            )}
          </div>
        </div>
        : <h1>Loading ...</h1>
  );
}