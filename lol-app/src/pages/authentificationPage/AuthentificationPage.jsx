import { useState } from 'react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "../../app/features/counterSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Axios from "axios";

import bcrypt from 'bcryptjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from "react-router-dom";


function AuthentificationPage() {
    const navigate = useNavigate()

	const dispatch = useDispatch()
    const myData = useSelector((state)=>state.counter)
    // États locaux pour gérer les valeurs des champs de formulaire
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");    
    const [authState, setAuthState] = useState(true)

    const [emailLoginValue, setEmailLoginValue] = useState("");
    const [passwordLoginValue, setPasswordLoginValue] = useState("");

    // Regex pour valider le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Fonction pour hasher le mot de passe
    function hashPassword(password) {
        const saltRounds = 10; // Le nombre de tours de salage
        return bcrypt.hash(password, saltRounds);
    }

    // Validation du formulaire de registre
    function valideForm() {
        if(!nameValue){
            alert("name is not filled !")
            return false;
        }
        
        if(!emailValue || !emailRegex.test(emailValue)){
            alert("Please enter a valid email !")
            return false;
        }
        if(!passwordValue){
            alert("password is not filled !")
            return false;
        }        
        if(!repeatPassword){
            alert("Please repeat the password !")
            return false;
        }
        if(passwordValue != repeatPassword){
            alert("Password does not match !")
            return false;
        }
        return true;        
    }
    // Fonction de reigstre
    async function register() {
        if (valideForm()) {
            try {
                const hashedPassword = await bcrypt.hash(passwordValue, 10);                
                const body = {
                    name: nameValue,
                    email: emailValue,
                    password: hashedPassword
                };
                Axios.post("http://localhost:3001/createPlayer", body)
                    .then(() => {
                        alert("Registration successful!");
                    })
                    .catch((error) => {
                        console.error("Error during registration:", error);
                        alert("Registration failed!");
                    });
            } catch (error) {
                console.error("Error hashing password:", error);
                alert("An error occurred while processing your registration.");
            }
        }
    }      
           
    // Fonction de login
    function login() {
        if (emailLoginValue && passwordLoginValue) {
            
            const body = {
                email: emailLoginValue,
                password: passwordLoginValue,
            };
            Axios.post("http://localhost:3001/loginPlayer", body)
                .then((rep) => {
                    if (rep.data === "LOGIN_SUCCESS") {
                        console.log("login success");
                        dispatch(connect(emailLoginValue));
                        console.log(myData.connected);
                        navigate('/');
                    } else {
                        alert(rep.data);
                    }
                })
                .catch((error) => {
                    console.error("Error during login:", error);
                    alert("Login failed!");
                });
        } else {
            alert('Invalid fields');
        }
    }

    return(
        <>
            <div className="mainPage">

<MDBContainer fluid>

{
    authState ?
    <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
<MDBCardBody>
    <MDBRow>
    <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

        <div className="d-flex flex-row align-items-center mb-4 ">
        <MDBIcon fas icon="user me-3" size='lg'/>
        <MDBInput label='Your Name' id='form1' type='text' className='w-100' onChange={(e)=> {setNameValue(e.target.value)}}/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon fas icon="envelope me-3" size='lg'/>
        <MDBInput label='Your Email' id='form2' type='email' onChange={(e)=> {setEmailValue(e.target.value)}}/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon fas icon="lock me-3" size='lg'/>
        <MDBInput label='Password' id='form3' type='password' onChange={(e)=> {setPasswordValue(e.target.value)}}/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon fas icon="key me-3" size='lg'/>
        <MDBInput label='Repeat your password' id='form4' type='password'onChange={(e)=> {setRepeatPassword(e.target.value)}}/>
        </div>

       
        <button className='mb-4' size='lg' onClick={register}>Register</button>
        <button onClick={()=>{setAuthState(false)}} className='mb-4 underline' >Already in the game? login here! </button>

    </MDBCol>

    <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
        <MDBCardImage src='https://logosmarcas.net/wp-content/uploads/2020/11/League-of-Legends-Logo.png'fluid/>
    </MDBCol>

    </MDBRow>
</MDBCardBody>
</MDBCard>
:
<MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
<MDBCardBody>
    <MDBRow>
    <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

        

        <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon fas icon="envelope me-3" size='lg'/>
        <MDBInput label='Your Email' id='form2' type='email' onChange={(e)=> {setEmailLoginValue(e.target.value)}}/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon fas icon="lock me-3" size='lg'/>
        <MDBInput label='Password' id='form3' type='password' onChange={(e)=> {setPasswordLoginValue(e.target.value)}}/>
        </div>

        

       
        <button className='mb-4' size='lg' onClick={login}>Register</button>

        <button onClick={()=>{setAuthState(true)}} className='mb-4 underline' >New Player ? sign up now</button>

    </MDBCol>

    <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
        <MDBCardImage src='https://logosmarcas.net/wp-content/uploads/2020/11/League-of-Legends-Logo.png'fluid/>
    </MDBCol>

    </MDBRow>
</MDBCardBody>
</MDBCard>
}

</MDBContainer>


</div>
<script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>

<script>var Alert = ReactBootstrap.Alert;</script>
        </>
    )

    
}

export default AuthentificationPage