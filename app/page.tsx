'use client';
import React,{useEffect, useState} from 'react';
import Image from "next/image";
import styles from "./page.module.css";

import ReactGA from 'react-ga4';


const MeasurementID = 'G-2B6WMLFDEQ'
ReactGA.initialize(MeasurementID);

export default function Home() {

  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: { target: { value: any; }; }) => {
    ReactGA.event({
      category: 'User',
      action: 'Searched'
    });
    setSearchValue(event.target.value);
  };
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
     <input
        type="text"
        placeholder="Enter your search query"
        value={searchValue}
        onChange={handleInputChange}
      />
    
     <button onClick={handleButtonClick}>click</button>
    </div>
  );
}



