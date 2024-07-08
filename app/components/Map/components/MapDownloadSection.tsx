import React from 'react'
import styles from '@/styles/Map/map.module.css';
import Link from 'next/link';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';

const MapDownloadSection = () => {
    return (
        <div className={styles.map_download_container}>
            <div className='container-fluid'>
                <div className={styles.widget_header}>
                    <div className={styles.widget_header_left}>
                        <h5 className={styles.widget_header_left_title}>Status of Adivasi Livelihood Interactive Map</h5>
                        {/* <div className="widget-header__left__cta">Interact with the map to dive deeper</div> */}
                    </div>
                    <Link className={styles.download_button} href='#'><span data-v-0905137e="">Download data</span><VerticalAlignBottomIcon /></Link>
                </div>
            </div>
        </div>
    )
}

export default MapDownloadSection
