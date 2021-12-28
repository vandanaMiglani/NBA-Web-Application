import React from "react";
import "./homeStyle.css";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import './HomePage.css';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const AutoplaySlider = withAutoplay(AwesomeSlider);


const Slider = (
  <AutoplaySlider
    className="slider"
    cssModule={AwesomeSliderStyles}
    play={true}
    interval={4500}
    bullets={false}
  >
    <div
      data-src={require("../media/img1.jpeg").default}
      className="image__description"
    >
      <h2 style={{color: '#fff'}}>NBA Game Time</h2>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <Button id="getstarted" onClick={event =>  window.location.href='/home'}>Get Started</Button> 
      
    </div>
    <div
      data-src={require("../media/image2.jpeg").default}
      className="image__description"
    >
      <h2 style={{color: '#fff'}}>NBA Game Time</h2>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Button id="getstarted" onClick={event =>  window.location.href='/home'}>Get Started</Button>  
      
    </div>
    <div
      data-src={require("../media/img3.jpeg").default}
      className="image__description"
    >
      <h2 style={{color: '#fff'}}>NBA Game Time</h2>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Button id="getstarted" onClick={event =>  window.location.href='/home'}>Get Started</Button>  
      
    </div>
    <div
      data-src={require("../media/img4.jpeg").default}
      className="image__description"
    >
      <h2 style={{color: '#fff'}}>NBA Game Time</h2>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Button id="getstarted" onClick={event =>  window.location.href='/home'}>Get Started</Button> 
      
    </div>
  </AutoplaySlider>
);

function Home() {

    const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/home");
  }

  return (
    <div id="container">
      <div className="header">{Slider}</div>
    </div>
  );
}
export default withRouter(Home);
