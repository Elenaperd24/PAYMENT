const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()

//const stripe = new Stripe(`${process.env.privateKey}`)

const stripe =  new Stripe('sk_test_51MgMN5BsuLFtwKBqEX27p2k8Dda11DggjYG7zRP9hoGpjGRVlEGuKV0P1GOc0aQUYoFw4XSXrREixs9mGn33cOtF0094cd15ip')

app.use(cors({ origin: 'http://localhost:3000' }))


const PORT = process.env.PORT || 4000
app.use(express.json())

app.post('/api/checkout', async (req, res) => {
    // console.log(req.body)

    try {

        const { id, amount } = req.body

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "AUD",
            description: "BreakingDownBarriers",
            payment_method: id,
            confirm: true
        })

        console.log(payment)

        res.send({ message: 'successul payment' })

    } catch (error) {
        console.log(error)
        res.json({message:error})
    }

})

app.listen(4000, () => {
    console.log(`server linste on port ${PORT}`)
})