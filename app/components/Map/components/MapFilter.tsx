import React from 'react';
import styles from '@/styles/Map/map.module.css';
import PopupContent from './PopupContent';
const MapFilter = ({setFilterIndicator,filterIndicator}) => {
  return (
    <div className={styles.map_filter_container}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4'>
            <label htmlFor="sort" className={styles.search_sort_label}>Indicators</label>
            <select
              id="sort"
              className={`form-select ${styles.search_sort_select}`}
            value={filterIndicator}
            onChange={(e) => setFilterIndicator(e.target.value)}
            >
              <option value="HH income">HH income</option>
              <option value="Per capita income">Per capita income</option>
              <option value="Food security">Food security</option>
              <option value="Dietary diversity">Dietary diversity</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Sources of LH">Sources of LH</option>
              <option value="Income percent">Income percent</option>
            </select>
          </div>

          <div className='col-md-4'>
            <label htmlFor="sort" className={styles.search_sort_label}>Year</label>
            <select
              id="sort"
              className={`form-select ${styles.search_sort_select}`}
            // value={sortOption}
            // onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>

            </select>
          </div>
          {/* second select */}
          <div className='col-md-4'>
            <label htmlFor="sort" className={styles.search_sort_label}>States</label>
            <select
              id="sort"
              className={`form-select ${styles.search_sort_select}`}
            // value={sortOption}
            // onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="bengal">West Bengals</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="chatisgarh">Chatisgarh</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapFilter
