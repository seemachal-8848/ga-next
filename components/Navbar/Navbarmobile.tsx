// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import styles from '@/styles/Navbar/Navbar.module.css';
// import Image from 'next/image';
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import MobileDropdown from './components/MobileDropdown';
// import LoginModal from '../Auth/LoginModal';
// import SignUpModal from '../Auth/SignUpModal';
// import LogoutList from '@/services/api/auth_api/logout_api';
// import { CONSTANTS } from '@/services/config/app-config';
// import { useDispatch, useSelector } from 'react-redux';
// import { ClearToken } from '@/store/slices/auth_slice/login_slice';
// import { ClearGoogleToken } from '@/store/slices/auth_slice/google_login_slice';
// import { useRouter } from 'next/router';
// import { fetchNavbar, get_navbar_from_store } from "@/store/slices/home_page_slice/navbar_slice";
// import { fetchLogo, get_logo_from_store } from "@/store/slices/home_page_slice/logo_slice";
// import { fetchSearch, get_search_from_store } from "@/store/slices/search_slice/search_slice";
// import GoogleTranslator from '@/GoogleTranslator/GoogleTranslator';
// import { constructUrl, constructOptions } from '@/utils/search_utils';
// import Skeleton from 'react-loading-skeleton';


// const NavbarMobile = () => {
//     const [inputLocalValue, setInputLocalValue] = useState("");
//     const [isRecording, setIsRecording] = useState(false);
//     const recordingDuration = 5000; // 5 seconds
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [isCanvasOpen, setIsCanvasOpen] = useState(false);
//     const searchParams = new URLSearchParams(window.location.search);
//     const searchKeyParam = searchParams.get('search_key');

//     //   const { logoData, loadingLogo } = useLogo();
//     const logoFromStore = useSelector(get_logo_from_store);
//     const navbarFromStore = useSelector(get_navbar_from_store);
//     const navData = navbarFromStore?.data
//     const logoData = logoFromStore?.data


//     let isLoggedIn: any;
//     let isLoggedInGoogle: any;

//     const storedLoginStatus = localStorage.getItem("loginStatus");
//     let parsedLoginStatus: any

//     if (storedLoginStatus) {
//         parsedLoginStatus = JSON.parse(storedLoginStatus);

//     }

//     if (typeof window !== 'undefined') {
//         isLoggedIn = parsedLoginStatus?.LoggedIn;
//         isLoggedInGoogle = parsedLoginStatus?.LoggedInGoogle
//     }

//     const {
//         transcript,
//         interimTranscript,
//         finalTranscript,
//         listening,
//         resetTranscript,
//         browserSupportsSpeechRecognition,
//     } = useSpeechRecognition();

//     if (!browserSupportsSpeechRecognition) {
//         console.warn("browser doesn't support speech recognition");
//     }

//     // mobile navbar canvas open close functions
//     const openCanvas = () => {
//         setIsCanvasOpen(true);
//         const backdropElements = document.getElementsByClassName('offcanvas-backdrop');
//         if (backdropElements.length > 0) {
//             (backdropElements[0] as HTMLElement).style.opacity = '0.5';
//         }
//     };

//     const closeCanvas = () => {
//         setIsCanvasOpen(false);
//         const backdropElements = document.getElementsByClassName('offcanvas-backdrop');
//         if (backdropElements.length > 0) {
//             (backdropElements[0] as HTMLElement).style.opacity = '0';
//         }
//     };

//     const startRecording = () => {
//         if (!isRecording) {
//             resetTranscript(); // Clear any existing transcript
//             SpeechRecognition.startListening({ continuous: true });
//             setIsRecording(true);
//             setTimeout(() => {
//                 SpeechRecognition.stopListening();
//                 setIsRecording(false);
//             }, recordingDuration);
//         }
//     };

//     const handleClick = async () => {
//         const response = await LogoutList()

//         const LOGOUT_SUCCESS = 'LogoutSuccess'; // Define the action type constant
//         // dispatch(fetchLoginUser(obj));
//         localStorage.removeItem("loginStatus");
//         dispatch(ClearToken());
//         dispatch(ClearGoogleToken());
//         dispatch({ type: LOGOUT_SUCCESS }); // Dispatch the action using the correct constant
//         closeCanvas()
//         router.push('/');
//         // window.location.href = '/';
//     };

//     useEffect(() => {
//         // Update capturedTranscript whenever transcript changes
//         if (!isRecording) {
//             setInputLocalValue(transcript);
//             if (transcript) {

//                 const url = constructUrl(1, transcript);
//                 const options = constructOptions(1, transcript);
//                 dispatch(fetchSearch(options) as any);
//                 router.push(url);
//                 closeCanvas()
//             }

//         }
//     }, [transcript, isRecording]);

//     const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
//         setInputLocalValue(e.target.value);
//     };



//     const searchHandler = () => {
//         if (inputLocalValue.trim() === '') {
//             return;
//         }
//         const url = constructUrl(1, inputLocalValue);
//         const options = constructOptions(1, inputLocalValue);
//         // setCurrentPage(1);
//         dispatch(fetchSearch(options) as any);
//         router.push(url);
//         closeCanvas()

//     }

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter') {
//             searchHandler();
//             closeCanvas()
//         }
//     };

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

//     const toggleModal = () => {
//         setIsModalOpen(!isModalOpen);
//     };

//     const toggleLoginModal = () => {
//         setIsModalLoginOpen(!isModalLoginOpen);
//     };

//     const imageLoader = ({ src, width, quality }: any) => {
//         return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
//     };


//     const navData1 = [navData[0], navData[1]];

//     const navData2 = navData[2];



//     useEffect(() => {
//         const currentRoute = router.pathname;
//         if (searchKeyParam && currentRoute.includes("search-result")) {
//             setInputLocalValue(searchKeyParam);
//         }
//         else {
//             setInputLocalValue('');
//         }
//     }, [searchKeyParam, router.pathname]);

//     return (
//         <>
//             <div className='container-fluid py-4 bg-white'>
//                 <div className='row'>
//                     <div className='col-9'>
//                         <div className={`h-100 ${styles.logo_container}`}>
//                             {logoFromStore?.loading ? Array.from({ length: logoData?.length }).map((_, index: number) => (
//                                 <div key={index} className={`${styles.skeleton_wrapper}`}>
//                                     <Skeleton height={45} width={85} />
//                                 </div>
//                             )) :
//                                 <div>
//                                     {
//                                         logoData?.length > 0 && logoData?.map((data: any, index: number) => {

//                                             return (
//                                                 <Link key={index} className={`navbar-brand ${styles.vertical_bar} ${styles.header_logo_link}`} href="/">
//                                                     <Image src={data?.image} alt='NRLM logo' height={45} width={85}
//                                                         loader={imageLoader}
//                                                     />

//                                                 </Link>
//                                             )
//                                         })
//                                     }
//                                 </div>
//                             }
//                         </div>
//                     </div>

//                     <div className={`col-3`}>
//                         <div className={`text-end ${styles.bar_icon}`} onClick={openCanvas}>
//                             <i className="fa fa-bars" data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample" aria-hidden="true"></i>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className={`offcanvas offcanvas-start mobile_sidebar ${isCanvasOpen ? 'show' : ''} ${styles.mobile_sidebar}`} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" aria-modal="false">
//                 <div className="offcanvas-header">
//                     <div className=''>
//                     </div>
//                     <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={closeCanvas}></button>
//                 </div>
//                 <div className="offcanvas-body">
//                     <div className='container text-center'>
//                         <div className='row'>
//                             <div className=''>
//                                 <div className="row">
//                                     <div className="col-11">
//                                         <div className={`${styles.search_form_web}`}>
//                                             <input className={`form-control ${styles.search_input}`} value={inputLocalValue} onKeyDown={handleKeyDown} onChange={handleInputChange} placeholder="Search" aria-label="Search" />
//                                             <i className={`fa fa-search ${styles.search_icon}`} aria-hidden="true" onClick={searchHandler}></i>
//                                         </div>
//                                     </div>
//                                     <div className="col-1 p-0">
//                                         <div className={styles.mic_icon_wrapper}>
//                                             <i className={`fa fa-microphone ${styles.mic_icon}`} aria-hidden="true" onClick={startRecording}></i>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='d-flex justify-content-center align-items-center my-3 mx-auto'>
//                                 {
//                                     isLoggedIn == 'true' ?
//                                         <div className={`${styles.profile_dropdown}`}>
//                                             <div className={`${styles.dropdown}`}>
//                                                 <span className={`${styles.dropbtn}`}><AccountCircleIcon sx={{ fontSize: '40px' }} /></span>
//                                                 <div className={`${styles.profile_dropdown_content}`}>
//                                                     <button className={`bg-light ${styles.profile_dropdown_logout_btn}`} onClick={handleClick}>Logout</button>
//                                                     {isLoggedInGoogle == 'false' && <Link href="/change-password" onClick={closeCanvas}>Change Password</Link>}

//                                                 </div>
//                                             </div>
//                                         </div> :
//                                         <div>
//                                             <LoginModal toggleLoginModal={toggleLoginModal} setIsModalLoginOpen={setIsModalLoginOpen} isModalLoginOpen={isModalLoginOpen} setIsModalOpen={setIsModalOpen} closeCanvas={closeCanvas} />
//                                         </div>
//                                 }
//                                 {
//                                     isLoggedIn === 'true' ? '' :
//                                         <div className={`${styles.signup_btn}`}>
//                                             <SignUpModal toggleModal={toggleModal} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setIsModalLoginOpen={setIsModalLoginOpen} closeCanvas={closeCanvas} />
//                                         </div>
//                                 }
//                             </div>
//                             <div className=''>
//                                 <GoogleTranslator />
//                             </div>


//                             {/* accordian */}
//                             <div>
//                                 {Array.isArray(navData1) && navData1.length > 0 && navData1.map((menu, index) => (
//                                     <div className='mb-1' key={index}>
//                                         {
//                                             menu?.url ?
//                                                 <Link href={menu?.url} onClick={closeCanvas}>{menu?.name}</Link>
//                                                 : <span>{menu?.name}</span>
//                                         }
//                                     </div>
//                                 ))}
//                             </div>


//                             <div className="accordion mt-3" id="accordionExample">
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header">
//                                         <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
//                                             {navData2?.label}
//                                         </button>
//                                     </h2>
//                                     <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
//                                         <div className={`accordion-body ${styles.accordian_body_mobile}`}>
//                                             <MobileDropdown sections={navData2?.values || []} closeCanvas={closeCanvas} />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* accordian */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div >

//         </>
//     )
// }

// export default NavbarMobile


import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Navbar/Navbar.module.css';
import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MobileDropdown from './components/MobileDropdown';
import LoginModal from '../Auth/LoginModal';
import SignUpModal from '../Auth/SignUpModal';
import { CONSTANTS } from '@/services/config/app-config';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchSearch, get_search_from_store } from "@/store/slices/search_slice/search_slice";
import { get_navbar_from_store } from "@/store/slices/home_page_slice/navbar_slice";
import { get_logo_from_store } from "@/store/slices/home_page_slice/logo_slice";
import GoogleTranslator from '@/GoogleTranslator/GoogleTranslator';
import { constructUrl, constructOptions } from '@/utils/search_utils';
import Skeleton from 'react-loading-skeleton';
import useAuth from './components/useAuth';
import useSearch from './components/useSearch';
import useSpeech from './components/useSpeech';
import useCanvas from './components/useCanvas';

const NavbarMobile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isCanvasOpen, openCanvas, closeCanvas } = useCanvas();
  const { inputLocalValue,setInputLocalValue, handleInputChange, handleKeyDown, searchHandler } = useSearch(closeCanvas);
  const { startRecording, isRecording, browserSupportsSpeechRecognition, transcript } = useSpeech();
 
  const { isModalOpen, isModalLoginOpen, LoggedIn, handleLogout, toggleModal, toggleLoginModal, setIsModalOpen, setIsModalLoginOpen } = useAuth();
  
  const searchParams = new URLSearchParams(window.location.search);
  const searchKeyParam = searchParams.get('search_key');
  
  const logoFromStore = useSelector(get_logo_from_store);
  const navbarFromStore = useSelector(get_navbar_from_store);
  const navData = navbarFromStore?.data;
  const logoData = logoFromStore?.data;
  
  const imageLoader = ({ src, width, quality }: any) => `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  
  const navData1 = [navData[0], navData[1]];
  const navData2 = navData[2];

  useEffect(() => {
    if (!isRecording && transcript) {
      const url = constructUrl(1, transcript);
      const options = constructOptions(1, transcript);
      dispatch(fetchSearch(options) as any);
      router.push(url);
      closeCanvas();
    }
  }, [transcript, isRecording]);

  useEffect(() => {
    const currentRoute = router.pathname;
    if (searchKeyParam && currentRoute.includes("search-result")) {
      setInputLocalValue(searchKeyParam);
    } else {
      setInputLocalValue('');
    }
  }, [searchKeyParam, router.pathname]);

  return (
    <>
      <div className='container-fluid py-4 bg-white'>
        <div className='row'>
          <div className='col-9'>
            <div className={`h-100 ${styles.logo_container}`}>
              {logoFromStore?.loading ? Array.from({ length: logoData?.length }).map((_, index: number) => (
                <div key={index} className={`${styles.skeleton_wrapper}`}>
                  <Skeleton height={45} width={85} />
                </div>
              )) :
                <div>
                  {
                    logoData?.length > 0 && logoData?.map((data: any, index: number) => (
                      <Link key={index} className={`navbar-brand ${styles.vertical_bar} ${styles.header_logo_link}`} href="/">
                        <Image src={data?.image} alt='NRLM logo' height={45} width={85}
                          loader={imageLoader}
                        />
                      </Link>
                    ))
                  }
                </div>
              }
            </div>
          </div>
          <div className={`col-3`}>
            <div className={`text-end ${styles.bar_icon}`} onClick={openCanvas}>
              <i className="fa fa-bars" data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>

      <div className={`offcanvas offcanvas-start mobile_sidebar ${isCanvasOpen ? 'show' : ''} ${styles.mobile_sidebar}`} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" aria-modal="false">
        <div className="offcanvas-header">
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={closeCanvas}></button>
        </div>
        <div className="offcanvas-body">
          <div className='container text-center'>
            <div className='row'>
              <div className=''>
                <div className="row">
                  <div className="col-11">
                    <div className={`${styles.search_form_web}`}>
                      <input className={`form-control ${styles.search_input}`} value={inputLocalValue} onKeyDown={handleKeyDown} onChange={handleInputChange} placeholder="Search" aria-label="Search" />
                      <i className={`fa fa-search ${styles.search_icon}`} aria-hidden="true" onClick={searchHandler}></i>
                    </div>
                  </div>
                  <div className="col-1 p-0">
                    <div className={styles.mic_icon_wrapper}>
                      <i className={`fa fa-microphone ${styles.mic_icon}`} aria-hidden="true" onClick={startRecording}></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center align-items-center my-3 mx-auto'>
                {LoggedIn ? (
                  <div className={`${styles.profile_dropdown}`}>
                    <div className={`${styles.dropdown}`}>
                      <span className={`${styles.dropbtn}`}><AccountCircleIcon sx={{ fontSize: '40px' }} /></span>
                      <div className={`${styles.profile_dropdown_content}`}>
                        <button className={`bg-light ${styles.profile_dropdown_logout_btn}`} onClick={handleLogout}>Logout</button>
                        {LoggedIn && <Link href="/change-password" onClick={closeCanvas}>Change Password</Link>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <LoginModal toggleLoginModal={toggleLoginModal} setIsModalLoginOpen={setIsModalLoginOpen} isModalLoginOpen={isModalLoginOpen} setIsModalOpen={setIsModalOpen} closeCanvas={closeCanvas} />
                  </div>
                )}
                {!LoggedIn && (
                  <div className={`${styles.signup_btn}`}>
                    <SignUpModal toggleModal={toggleModal} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setIsModalLoginOpen={setIsModalLoginOpen} closeCanvas={closeCanvas} />
                  </div>
                )}
              </div>
              <div className=''>
                <GoogleTranslator />
              </div>
              <div>
                {Array.isArray(navData1) && navData1.length > 0 && navData1.map((menu, index) => (
                  <div className='mb-1' key={index}>
                    {menu?.url ? (
                      <Link href={menu?.url} onClick={closeCanvas}>{menu?.name}</Link>
                    ) : (
                      <span>{menu?.name}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="accordion mt-3" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      {navData2?.label}
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className={`accordion-body ${styles.accordian_body_mobile}`}>
                      <MobileDropdown sections={navData2?.values || []} closeCanvas={closeCanvas} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default NavbarMobile;
