import React, { useEffect, useState } from 'react';
import WebNavbar from './WebNavbar';
import NavbarMobile from './Navbarmobile';
import styles from '@/styles/Navbar/Navbar.module.css';
import GoogleTranslator from '@/GoogleTranslator/GoogleTranslator';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ paddingTop: '122px' }}>
      <div className={`navbar_wrapper_lang ${styles.navbar_wrapper}`} >
        {isMobile ? <NavbarMobile /> : <WebNavbar />}
      </div>
    </div>
  );
}

export default Navbar;