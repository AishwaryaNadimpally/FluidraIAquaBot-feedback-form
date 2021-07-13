//import logo from './logo.svg';
import './App.css';

import {Container, Button, Form} from 'react-bootstrap';
import Amplify from "aws-amplify";
import { API } from 'aws-amplify';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import React, { useState, setState , Component} from "react";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);
const formState = { FirstName: '',  Mailid: '', FeedbackMessage: '' ,Rating:''};




function updateFormState(key, value) {
  formState[key] = value;
  console.log(formState)
}

function Feedback() {

  const { search } = useLocation();
  console.log(search);
  const {name, email} = queryString.parse(search);

  async function addContact() {
    const data = {
      body: {
        FirstName: formState.FirstName,
        Mailid: formState.Mailid,
        FeedbackMessage: formState.FeedbackMessage,
        Rating: formState.Rating
      }
        };
  
    console.log("formdata",data);
    if (data.body.Mailid === ""){
      
      data.body.Mailid = email
      
    }
    
    console.log("sent");
    const apiData = await API.post('feedbackmap', '/feedform', data);
    console.log({ apiData });
    console.log("api data posted",data);
    
      
  }
  
  
 

  const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      e.target.reset();
      setTimeout(() => setSubmitted(true),3000);
    }

  return (
    <Container>
    <div className="feedback">
      <h3  className="App-header">Feedback</h3>
        <Form onSubmit={handleSubmit}>
        
            <div className="heading4" onChange={updateFormState('FirstName', name)}>Hello {name}!! </div>
            <br></br>
            <div className="username"> Please submit your valuable feedback below.</div>
            <br></br>
            <div className="clear"></div> 
            <div className="row">
            <div className="col">
            <Form.Label className="txt">Email id</Form.Label><br></br>
            <Form.Control className="txt" placeholder="Your email id" defaultValue={email} required onChange={e=>updateFormState('Mailid', e.target.value)} />
            
            </div></div>
            <div className="clear"></div> 
            <div className="row">
            <div className="col">
            <Form.Label className="txt">Feedback</Form.Label>
            <Form.Control className="txt" as="textarea" required={true} cols="75" rows="10" placeholder="Feedback Message" onChange={e => updateFormState('FeedbackMessage', e.target.value)} />
         </div> </div>
         <br></br>
         <div className="row">
          <Form.Label className="txt"> Your overall experience with us ?</Form.Label><br></br>
        <span className="star-rating">
            <input type="radio" name="rating1" value="1" onChange={e => updateFormState('Rating', e.target.value)}/><i></i>
            <input type="radio" name="rating1" value="2" onChange={e => updateFormState('Rating', e.target.value)}/><i></i>
            <input type="radio" name="rating1" value="3" onChange={e => updateFormState('Rating', e.target.value)}/><i></i>
            <input type="radio" name="rating1" value="4" onChange={e => updateFormState('Rating', e.target.value)}/><i></i>
            <input type="radio" name="rating1" value="5" onChange={e => updateFormState('Rating', e.target.value)}/><i></i>
          </span>
        </div>
        <br></br>
        <div align="center">
            <Button type="submit" className="button" disabled={submitted} onClick={addContact}>Submit</Button>
        </div>
        </Form>
        
        <br></br>
        {submitted ? <div className="App-header">Thank you for your feedback</div>:null}
      </div>
    </Container>
  );

}

export default Feedback;
