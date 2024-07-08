import React from 'react';
import styles from '@/styles/Map/map.module.css';


const PopupContent = ({ stateName, indicators, filterIndicator }: any) => {

  // here indicator is indicator="HH income"

  console.log(":::",filterIndicator)

  return (
    <div className={`${styles.pop_up_container}`}>
      <div className={`${styles.state_container}`}>
        <h4 className="">{stateName}</h4>
      </div>

      <div className={`info_container pt-2`}>
        {Array.isArray(indicators) && indicators.length > 0 && indicators.map((data: any, index: number) => {
          return (
            <div className='py-1' key={index}>
              <span>{data?.date}</span>
              <div className={`info`}>
                <h6 style={{ backgroundColor: data?.indicator === 'Per capita income' ? 'lightgray' : 'transparent' }}>
                  {data?.indicator}
                </h6>

                {data?.data?.map((data: any, index: number) => {
                  return (
                    <div key={index} className='d-flex'>
                      <p>{data?.year}</p>
                      <p>{data?.value}</p>
                    </div>
                  )
                })}

              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
};

export default PopupContent;
