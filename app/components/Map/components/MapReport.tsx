import React, { useState } from 'react';
import styles from '@/styles/Map/map.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Modal } from 'react-bootstrap';
import { useMediaQuery } from '@mui/material';

const reportData = [
  {
    id: 1,
    severity: 'Very High',
    colorIndicator: '#a80c36',
    value: '60-70'
  },
  {
    id: 2,
    severity: 'Medium',
    colorIndicator: '#FFCC00',
    value: '40-50'
  },
  {
    id: 2,
    severity: 'Low',
    colorIndicator: '#4FAD4A',
    value: '10-30'
  }

]

const MapReport = () => {
  const [showReport, setShowReport] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:992px)');

  const reportHandler = () => {
    setShowReport(!showReport);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isSmallScreen ? (
        <>
          <button
            type="button"
            className={`btn btn-secondary ${styles.report_modal_btn}`}
            onClick={toggleModal}
          >
            How to read
          </button>
          <Modal show={isModalOpen} onHide={toggleModal} centered className="report_modal">
            <Modal.Header closeButton>
              <Modal.Title>
                Severity report
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <div className={`card border-0 ${showReport ? styles.show : styles.hide} ${styles.mobile_report}`}>
                <ul className="list-group list-group-flush">
                  {Array.isArray(reportData) && reportData.length > 0 && reportData.map((data: any, index: number) => <div key={index} className="list-group-item d-flex gap-2">
                    <div
                      className={`${styles.report_list_indicator}`}
                      style={{ backgroundColor: `${data?.colorIndicator}` }}
                    ></div>
                    <p className="m-0">{data?.severity}</p>
                    <p className="m-0 text-secondary">{data?.value}</p>
                  </div>)}
                </ul>
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <div className={`${styles.report_container}`}>
          <div className={`${styles.report_read_section}`}>
            <h6>Severity report</h6>
            <div className={`${styles.report_btn}`}>
              {showReport ? (
                <RemoveIcon onClick={reportHandler} />
              ) : (
                <AddIcon onClick={reportHandler} />
              )}
            </div>
          </div>
          <div className={`card border-0 ${showReport ? styles.show : styles.hide}`}>
            <ul className="list-group list-group-flush">
              {Array.isArray(reportData) && reportData.length > 0 && reportData.map((data: any, index: number) => <div className="list-group-item d-flex gap-2">
                <div
                  className={`${styles.report_list_indicator}`}
                  style={{ backgroundColor: `${data?.colorIndicator}` }}
                ></div>
                <p className="m-0">{data?.severity}</p>
                <p className="m-0 text-secondary">{data?.value}</p>
              </div>)}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default MapReport;
