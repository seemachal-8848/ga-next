import React, { useState } from 'react';
import MapSection from './components/Mapsection';
import ChartSection from './components/ChartSection';
import MapFilter from './components/MapFilter';
import MapReport from './components/MapReport';
import MapDownloadSection from './components/MapDownloadSection';
import styles from '@/styles/Map/map.module.css';

const MapMaster = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [filterIndicator, setFilterIndicator] = useState('');

    const handleMapLoad = () => {
        setIsMapLoaded(true);
    };

 
    return (
        <div className={styles.map_container}>
            <MapDownloadSection />
            <MapFilter setFilterIndicator={setFilterIndicator} filterIndicator={filterIndicator}/>
            <MapSection onMapLoad={handleMapLoad} filterIndicator={filterIndicator} />
            {isMapLoaded && (
                <>
                    <ChartSection />
                    <MapReport />
                </>
            )}
        </div>
    );
};

export default MapMaster;
