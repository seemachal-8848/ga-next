import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./Map'), { ssr: false });

const MapSection = ({ onMapLoad,filterIndicator }:  any ) => {
    useEffect(() => {
        const mapLoadTimeout = setTimeout(() => {
            onMapLoad();
        }, 2000);

        return () => clearTimeout(mapLoadTimeout);
    }, [onMapLoad]);

    return (
        <div>
            <DynamicMap filterIndicator={filterIndicator}/>
        </div>
    );
};

export default MapSection;
