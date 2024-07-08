import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import states from '../mapData/india_states.json'
import { backData } from '../mapData/backData';;
import 'leaflet/dist/leaflet.css';

import ReactDOMServer from 'react-dom/server';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import chartData from '../mapData/chartData.json';
import styles from '@/styles/Map/map.module.css';
import { Modal } from 'react-bootstrap';
import { useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:992px)');
  const [showChart, setShowChart] = useState(true)

  const chartHandler = () => {
    setShowChart(!showChart)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>

      {isSmallScreen ? (
        <>
          <button type="button" className={`btn btn-secondary ${styles.chart_modal_btn}`} data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={toggleModal}>Show Chart</button>
          <Modal show={isModalOpen} onHide={toggleModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Score trend</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Bar
                data={{
                  labels: chartData.map((data) => data.label),
                  datasets: [{
                    label: "Count",
                    data: chartData.map((data) => data.value),
                    backgroundColor: ["#FFA27F", "#97BE5A", "#003285"],
                    // @ts-ignore
                    barThickness: [20, 20, 20],
                    borderRadius: [5, 5, 5]
                  }]
                }}
              />
            </Modal.Body>
          </Modal>
        </>) :
        (<div className={styles.chart_container}>
          <div className={`${styles.report_read_section}`}>
            <h6>Score trend</h6>
            <div className={`${styles.report_btn}`}>
              {showChart ? <RemoveIcon onClick={chartHandler} /> : <AddIcon onClick={chartHandler} />}
            </div>
          </div>

          <div className={`${styles.bar_chart_container} ${showChart ? styles.show : styles.hide}`}>
            <Bar
              data={{
                labels: chartData.map((data) => data.label),
                datasets: [{
                  label: "Count",
                  data: chartData.map((data) => data.value),
                  backgroundColor: ["#FFA27F", "#97BE5A", "#003285"],
                  // @ts-ignore
                  barThickness: [20, 20, 20],
                  borderRadius: [5, 5, 5]
                }]
              }}
            />
          </div>
        </div>)
      }
    </>

  )
}

export default ChartSection
