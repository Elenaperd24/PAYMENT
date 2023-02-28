import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import swal from 'sweetalert'
import Payment from "./PaymentGateway";

import axios from "axios";



function SignUp() {

    const [payment, setpayment] = useState()
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")


    const responseGoogle = async (response) => {

        const dataUser = {
            img: response.profileObj.imageUrl,
            name: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email,
            password: response.googleId + "Ep",
            from: "Google"
        }
        detectFrom(dataUser)
    }

    const responseFacebook = async (response) => {

        const dataUser = {
            img: response.picture.data.url,
            name: response.name,
            lastName: response.lastName,
            email: response.email,
            password: response.id + "Ep",
            from: "Facebook"
        }
        detectFrom(dataUser)
    }

    async function newUser(event) {
        event.preventDefault()

        let name = event.target[0].value
        let lastName = event.target[1].value
        let email = event.target[2].value
        let password = event.target[3].value

        if (name != "" & password != "" & email != "") {

            if (password == event.target[4].value) {

                let iniciales = name.charAt(0) + lastName.charAt(0)
                const dataUser = {
                    img: iniciales.toUpperCase(),
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                    from: "XKal Fitness"
                }
                detectFrom(dataUser)
            } else {
                alert("the password dosen't match")
            }

        } else {
            alert("there is a field empty")
        }



    }
    async function detectFrom(dataUser) {
        //await axios.post("http://localhost:4000/api/SingUPXla", { dataUser }) EDPOINTS      

        swal({
            title: "Welcome XKal Fitness",
            icon: "success",
            text: 'by' + dataUser.from,
            buttons: "ok"
        })

        setpayment(true)
        localStorage.setItem("name", dataUser.name)
        localStorage.setItem('lastName',dataUser.lastName)


           }
    return (
        <>
      {payment ?<Payment/>:<div className=" FormSig  d-flex shadow" >
                <div className="info">

                    <form onSubmit={newUser} className="container-md form-SignUP">

                        <div className="d-flex">
                            <div className="mb-3 container-md">
                                <label for="exampleInputName" className="form-label">Name</label>
                                <input type="name" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                                <div id="exampleInputName" className="form-text">Please enter your Name.</div>
                            </div>
                            <div className="mb-3 container-md">
                                <label for="exampleInputName2" className="form-label">Last Name</label>
                                <input type="name" className="form-control" id="exampleInputName2" aria-describedby="emailHelp" />
                                <div id="exampleInputName2" className="form-text">Please enter your Last Name.</div>
                            </div>
                        </div>
                        <div className="mb-3 container-md">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="" className="form-text">Please enter a email.</div>
                        </div>
                        <div className="d-flex passwordSignUp">
                            <div className="mb-3 container-md" >
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                <div id="exampleInputPassword1" className="form-text">Please enter a password.</div>
                            </div>
                            <div className="mb-3 container-md" >
                                <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword2" />
                                <div id="exampleInputPassword2" className="form-text">Please enter again your password.</div>
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Remember me</label>
                        </div>
                        <div>
                            <button type="submit" className="btn d-flex btn-signUp" >
                                send
                            </button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <div style={{ margin: "4px", backgroundColor: "white", borderRadius: "10px", display: "flex", justifyContent: "center" }}>
                                    <GoogleLogin
                                        clientId="800359852680-6rhb9r988gompretejui4b0lmr8ok60i.apps.googleusercontent.com"
                                        buttonText="SignIn with Google Account"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                <div style={{ margin: "4px", backgroundColor: "rgb(76, 105, 186)", borderRadius: "10px", display: "flex", justifyContent: "center" }}>
                                    <FacebookLogin
                                        appId="1157819554991138"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        callback={responseFacebook}
                                    />
                                </div>
                                <img className="img-fluid" src="https://media.licdn.com/dms/image/C4D1BAQFIabh7v-lnSw/company-background_10000/0/1652779947855?e=1678201200&v=beta&t=SC2BZwZNuiCYnmsfdevVzxi5xSR03WXIXHLOAYbn32c" ></img>

                            </div>
                        </div>
                    </form>
                </div>
            </div>}


            

        </>




    )
}
export default SignUp;



