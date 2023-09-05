import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";


const {
    REACT_APP_API_BASE,
} = process.env;


const captureMethodConfirmationsURIs = {
    manual: REACT_APP_API_BASE + '/payment/confirm',
    automatic: REACT_APP_API_BASE + '/payment/confirmed-automatic'
}

export default function CheckoutForm(props) {
    const {
        currency,
        clientSecret,
        captureMethod
    } = props;

    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (!clientSecret) {
            return;
        }

        stripe
            .retrievePaymentIntent(
                clientSecret
            )
            .then(data => {
                const { paymentIntent } = data;
                if (data.error) {
                    console.log(data);
                    throw new Error(data.message);
                }

                switch (paymentIntent.status) {
                    case "succeeded":
                        setMessage("Payment succeeded!");
                        break;
                    case "processing":
                        setMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        setMessage("Your payment was not successful, please try again.");
                        break;
                    default:
                        setMessage("Something went wrong.");
                        break;
                }
            })
            .catch(console.error);
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: captureMethodConfirmationsURIs[captureMethod],
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <form id="payment-form" onSubmit={handleSubmit}>
                <LinkAuthenticationElement
                    id="link-authentication-element"
                    onChange={(e) => setEmail(e?.target?.value)}
                />
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            <div style={{ minWidth: '200px', overflowY: 'scroll', padding: '0rem 1rem' }}>
                <h2>Available cards</h2>
            </div>
        </div>
    );
}