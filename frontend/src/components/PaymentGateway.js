import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js"; // all camponents that envold it. It will contect to stripe
import axios from 'axios'
import { Link as LinkRouter } from "react-router-dom"

const stripePromise = loadStripe('pk_test_51MgMN5BsuLFtwKBqS3KPoMOy5lHk9t6jsJAhFXy7G2E8IlqVfb0K7REOQSsEOXJcbsrpEHGkU4NxP7dsCvt0mNC600q3RKXJZn')
//new component

const CheckOutForm = () => {

    const stripe = useStripe(); //conection stripe send new pay
    const elements = useElements() // allowd use elements stripe

    let name = localStorage.getItem("name")
    let lastName = localStorage.getItem("lastName")

    console.log(name)

    const handleBuy = async (e) => {
        e.preventDefault()
        // console.log('handle')

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement), //use element to CardelementComponent,

        })

        if (!error) {
            console.log(paymentMethod)
            const { id } = paymentMethod

            const { data } = await axios.post('http://localhost:4000/api/checkout', {
                id,
                amount: 10000
            })

            console.log(data)

        }
        else {
            alert(error.message)
        }

    }

    return (
        <>

            <form onSubmit={handleBuy} className="card card-body">

                <img className="img-fluid" src="https://www.heart.org/-/media/Images/Healthy-Living/Fitness/BreakingDownBarriersFitness.jpg?h=417&w=740&hash=DC427ED98E1ED6D0D269A8131CF0AF89" alt="BreakingDownBarriers" ></img>
                <h3 className="text-center">price: 100 AUD</h3>
                <h3><input value={name}></input></h3>
                <h3><input value={lastName}></input></h3>
                <input placeholder="adress"></input>
                <div className="form-control">
                    
                    <CardElement className="form-control" /> {/* validate correct dates card by Card Element */}

                </div>

                <button type="submit" className="btn btn-success">
                    buy
                </button>
            </form>

        </>
    )


}




function Payment() {
    return (
        <>
            <Elements stripe={stripePromise}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <CheckOutForm />
                            <LinkRouter to="/" >
                                <button className="btn btn-primary">
                                    back
                                </button>
                            </LinkRouter>
                        </div>

                    </div>
                </div>

            </Elements>
        </>
    );
}

export default Payment;