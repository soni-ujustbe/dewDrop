import React, { Component, useState, useEffect } from 'react';
import styles from '../styles/Login.module.scss';
import img from 'next/image';
import Head from 'next/head'
const axios = require('axios');
const API_URL = " https://api.ujustbe.com/";
import { useRouter } from "next/router";


const login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();


  function redirecttopartner() {
    router.push("/");
  }


  function saveState(user) {
    try {
      const serializedState = JSON.stringify(user);
      localStorage.setItem('user', serializedState);
      router.push("/");
      
    } catch {
      console.log("invalid credential")
    }
  };

  function handlesubmit() {
    axios.post('https://api.ujustbe.com/login', {
      username,
      password

    })
      .then(function (response) {
        console.log(response.data.data._id);
        //console.log("local storage", MessageList.data._id);
        //setstate(MessageList.data._id);
        const article = {
          userId: response.data.data._id,
          listedPartnerId: "",
          partnerId: "",
        };
        console.log("this userId", article);
        const headers = {
          "Content-Type": "application/json",
          //token: "ky23eiqgw5",
          token: "gxvy5ig98w",
        };
        axios
          .post("https://api.ujustbe.com/ValidateToken", article, {
            headers: headers,
          })
          .then((response) => {
            console.log("user validate", response.data.userData);
            if (response.statusText == "OK") {
              // Login the user using dispatch
              //dispatch(getuserdataSuccess(response.data.userData));
              //localStorage.setItem('user', data);
              saveState(response.data.userData);
              redirecttopartner();

            } else {
              // Send the error from API back
              //dispatch(getuserdataFailure(response.data.message));
              setUsername("");
              setUsername("")
              setError("set Error")
            }
          });
    //localStorage.setItem('user', data);
  })
          .catch (function (error) {
  console.log(error);
});


            // if (username === "" || password === "") {
            //   setError("Fields are required");
            //   return;
            // }
            // props.login({ username, password });
          
    }

    useEffect(() => {
      const name = localStorage.getItem('user');
      // if (name) {
      //     console.log('Name exists');
      //     // setpageload(true)
      // } else {
      //     console.log('Name is not found');
      //     router.push("/");
      // }

  }, [])

return (
  // container start here
  <div className={`${styles.container} ${styles.LoginPage}`}>


    <div className={styles.Logo}>
      <a
        href="https://www.ujustbe.com/"
        target="_blank"
        rel="noopener noreferrer">

        <img src="/images/logo.png" alt="ujustbe Logo" />
      </a>
    </div>

    <div className={styles.FormMain}>
      <div className="FormMain" >
        <input
          type="text"
          className="form-Username"
          placeholder="Enter Your Name"
          name="username"
          onChange={({ target }) => setUsername(target.value)}


        />
      </div>
      <div className="FormMain">
        <input
          type="password"
          className="form-Password"
          placeholder="Enter Your Password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}



        />
      </div>
      <div className="FormMain">
        <button
          type="submit"
          onClick={handlesubmit}>
          <span>Explore</span>
        </button>
      </div>
    </div>




  </div>
)
   
}

export default login