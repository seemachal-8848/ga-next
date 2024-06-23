'use client';
import React,{useEffect} from 'react';
import Image from "next/image";
import styles from "./page.module.css";

import ReactGA from 'react-ga4';

const MeasurementID = 'G-NPXGM1BY36'

ReactGA.initialize(MeasurementID);

export default function Home() {
  
 useEffect(() => {
   
    ReactGA.send({ hitType: 'pageview', page: '/about',title: "about" });

  }, []);
  return (
    <div>
     <p>about</p>
    
    </div>
  );
}


