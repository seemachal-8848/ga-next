'use client';
import React,{useEffect} from 'react';
import Image from "next/image";
import styles from "./page.module.css";

import ReactGA from 'react-ga4';


const MeasurementID = 'G-2B6WMLFDEQ'
ReactGA.initialize(MeasurementID);

export default function Home() {
  const handleButtonClick = () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked a button'
    });
  };




  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  return (
    <div>
     <p>App d</p>
     <button onClick={handleButtonClick}>click</button>
    </div>
  );
}


