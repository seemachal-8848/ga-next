'use client';

import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import states from '@/components/data/india_states.json';
import { backData } from '@/components/data/backData';;
import 'leaflet/dist/leaflet.css';

import ReactDOMServer from 'react-dom/server';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import chartData from '@/components/data/chartData.json';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PopupContent = ({ stateName, population, visited }) => (
  <div className="card">
    <h4 className="card-header">{stateName}</h4>
    <p className="card-text">Number of People: {population}</p>
    <p className="card-text">Visited People: {visited}</p>
  </div>
);

const App = () => {

  const stateStyle = (feature) => {
    const stateName = feature.properties.NAME_1;
    const stateData = backData.find((data) => data.state === stateName);

    let fillColor = 'transparent'; // Default color for states not specified

    if (stateData) {
      const population = stateData.population;
      if (population < 1000) {
        fillColor = 'red';
      } else if (population >= 1000 && population < 2000) {
        fillColor = 'yellow';
      } else {
        fillColor = 'green';
      }
    }

    return {
      fillColor: fillColor,
      fillOpacity: 0.5,
      color: 'black',
      weight: 1,
    };
  };


  const onEachCountry = (state, layer) => {
    const stateName = state.properties.NAME_1;

    const stateData = backData.find((data) => data.state === stateName) || {
      population: 'No Data',
      visited: 'No Data'
    };

    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        const popupContent = ReactDOMServer.renderToString(
          <PopupContent
            stateName={stateName}
            population={stateData.population}
            visited={stateData.visited}
          />
        );
        layer.bindPopup(popupContent).openPopup();
      },

    });
  };

  return (
    <>
      {/* <section>Section 1</section> */}
      <div>
        <MapContainer center={[20.593683, 78.962883]} zoom={5} scrollWheelZoom={false} className="leaf-container">

          <GeoJSON data={states.features} style={stateStyle} onEachFeature={onEachCountry} />
        </MapContainer>
        {/* chart */}
        <div className='chart_container'>
          <Bar
            data={{
              labels: chartData.map((data) => data.label),
              datasets: [{
                label: "Count",
                data: chartData.map((data) => data.value),
                backgroundColor: ["#FFA27F", "#97BE5A", "#003285"],
                barThickness: [20, 20, 20],
                borderRadius: [5, 5, 5]
              }]
            }}
          />

        </div>
        <div className='chart_doughnut'>
          <Doughnut
            data={{
              labels: chartData.map((data) => data.label),
              datasets: [{
                label: "Count",
                data: chartData.map((data) => data.value),
                backgroundColor: ["#FFA27F", "#97BE5A", "#003285"],
                barThickness: [20, 20, 20],
                borderRadius: [5, 5, 5]
              }]
            }}
          />
        </div>

      </div>
    </>
  );
};

export default App;