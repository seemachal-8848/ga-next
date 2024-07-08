'use client';
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import L, { PathOptions } from 'leaflet';
import states from '../mapData/india_states.json';
import { backData } from '../mapData/backData';
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import chartData from '../mapData/chartData.json';
import ChartSection from './ChartSection';
import PopupContent from './PopupContent';
import styles from '@/styles/Map/map.module.css';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

interface StateFeatureProperties {
    NAME_1: string;
}

interface StateFeature extends Feature<Geometry, StateFeatureProperties> { }

interface BackData {
    state: string;
    population: number;
    visited: number;
}


const MapData = [
    {
      id: 1,
      state: 'Madhya Pradesh',
      indicators: [
        {
          indicator: 'HH income',
          data: [
            { year: '2021', value: 5 },
            { year: '2023', value: 8 },
          ],
        },
        {
          indicator: 'Per capita income',
          data: [
            { year: '2020', value: 9 },
            { year: '2022', value: 7 },
          ],
        },
        {
          indicator: 'Food security',
          data: [
            { year: '2021', value: 3 },
            { year: '2022', value: 4 },
          ],
        },
        {
          indicator: 'Dietary diversity',
          data: [
            { year: '2020', value: 6 },
            { year: '2021', value: 8 },
          ],
        },
        {
          indicator: 'Nutrition',
          data: [
            { year: '2021', value: 7 },
            { year: '2023', value: 9 },
          ],
        },
        {
          indicator: 'Source of LH',
          data: [
            { year: '2020', value: 2 },
            { year: '2022', value: 5 },
          ],
        },
        {
          indicator: 'Income Percent',
          data: [
            { year: '2021', value: 10 },
            { year: '2022', value: 12 },
          ],
        },
      ],
    },
    {
      id: 2,
      state: 'Gujarat',
      indicators: [
        {
          indicator: 'HH income',
          data: [
            { year: '2020', value: 1000 },
            { year: '2021', value: 1200 },
          ],
        },
        {
          indicator: 'Per capita income',
          data: [
            { year: '2021', value: 1100 },
            { year: '2022', value: 1300 },
          ],
        },
        {
          indicator: 'Food security',
          data: [
            { year: '2020', value: 800 },
            { year: '2021', value: 900 },
          ],
        },
        {
          indicator: 'Dietary diversity',
          data: [
            { year: '2020', value: 600 },
            { year: '2022', value: 700 },
          ],
        },
        {
          indicator: 'Nutrition',
          data: [
            { year: '2021', value: 750 },
            { year: '2023', value: 850 },
          ],
        },
        {
          indicator: 'Source of LH',
          data: [
            { year: '2020', value: 300 },
            { year: '2022', value: 400 },
          ],
        },
        {
          indicator: 'Income Percent',
          data: [
            { year: '2021', value: 1500 },
            { year: '2022', value: 1700 },
          ],
        },
      ],
    },
  ];
const Map: React.FC = ({filterIndicator}:any) => {

  
    const stateStyle = (feature: StateFeature): PathOptions => {
        const stateName = feature.properties.NAME_1;
        const stateData = MapData.find((data) => data.state === stateName);

        let fillColor = 'transparent';

        // if (stateData) {
        //     const population = stateData.population;
        //     if (population < 1000) {
        //         fillColor = '#A80C36';
        //     } else if (population >= 1000 && population < 2000) {
        //         fillColor = '#FFCC00';
        //     } else {
        //         fillColor = '#4FAD4A';
        //     }
        // }

        return {
            fillColor: fillColor,
            fillOpacity: 1,
            color: 'black',
            weight: 1,
        };
    };

    const onEachCountry = (state: StateFeature, layer: L.Layer) => {
        const stateName = state.properties.NAME_1;

        const stateData = MapData.find((data) => data.state === stateName);

        layer.on({
            mouseover: (e: L.LeafletMouseEvent) => {
                const layer = e.target as L.Layer;
                const popupContent = ReactDOMServer.renderToString(
                    <PopupContent
                        stateName={stateName}
                        indicators={stateData?.indicators}
                        filterIndicator={filterIndicator}
                       
                    />
                );
                layer.bindPopup(popupContent).openPopup();
            },
        });
    };

    return (
        <MapContainer center={[20.593683, 78.962883]} zoom={5} scrollWheelZoom={false} className={styles.leaf_container}>
            {/* @ts-ignore */}
            <GeoJSON data={states as FeatureCollection<Geometry, StateFeatureProperties>} style={stateStyle} onEachFeature={onEachCountry} />
        </MapContainer>
    );
};

export default Map;

