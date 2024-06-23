// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import styles from '@/styles/Navbar/Navbar.module.css';
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
// import DropdownList from './components/Dropdown';
// import SignUpModal from '../Auth/SignUpModal';
// import LoginModal from '../Auth/LoginModal';
// import { ClearToken } from '@/store/slices/auth_slice/login_slice';
// import { ClearGoogleToken } from '@/store/slices/auth_slice/google_login_slice';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LogoutList from '@/services/api/auth_api/logout_api';
// import useLogo from '@/hooks/home_page_hooks/logo_hooks';
// import { CONSTANTS } from '@/services/config/app-config';
// import useNavbar from '@/hooks/home_page_hooks/navbar_hooks';
// import SkeletonNavbar from '@/skeletons/HomePage/SkeletonNavbar';
// import { fetchSearch, get_search_from_store } from "@/store/slices/search_slice/search_slice";
// import GoogleTranslator from '@/GoogleTranslator/GoogleTranslator';
// import { constructUrl, constructOptions } from '@/utils/search_utils';
// import Skeleton from 'react-loading-skeleton';


// const WebNavbar = () => {
//   const [inputLocalValue, setInputLocalValue] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
//   const [LoggedIn, setLoggedIn] = useState<boolean>(false);
//   const recordingDuration = 5000; // 5 seconds
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { logoData, loadingLogo } = useLogo();
//   const { navbarData, loadingNavbar } = useNavbar();

//   const searchParams = new URLSearchParams(window.location.search);
//   const searchKeyParam = searchParams.get('search_key');

//   let isLoggedIn: any;
//   let isLoggedInGoogle: any;

//   const storedLoginStatus = localStorage.getItem("loginStatus");
//   let parsedLoginStatus: any

//   if (storedLoginStatus) {
//     parsedLoginStatus = JSON.parse(storedLoginStatus);

//   }

//   if (typeof window !== 'undefined') {
//     isLoggedIn = parsedLoginStatus?.LoggedIn;
//     isLoggedInGoogle = parsedLoginStatus?.LoggedInGoogle
//   }

//   const handleClick = async () => {
//     const response = await LogoutList()
//     const LOGOUT_SUCCESS = 'LogoutSuccess'; // Define the action type constant
//     localStorage.removeItem("loginStatus");
//     dispatch(ClearToken());
//     dispatch(ClearGoogleToken());
//     dispatch({ type: LOGOUT_SUCCESS }); // Dispatch the action using the correct constant
//     setLoggedIn(false);
//     router.push('/');
//     // window.location.href = '/';
//   };

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const toggleLoginModal = () => {
//     setIsModalLoginOpen(!isModalLoginOpen);
//   };

//   const {
//     transcript,
//     interimTranscript,
//     finalTranscript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     console.warn("browser doesn't support speech recognition");
//   }

//   const startRecording = () => {
//     if (!isRecording) {
//       resetTranscript(); // Clear any existing transcript
//       SpeechRecognition.startListening({ continuous: true });
//       setIsRecording(true);
//       setTimeout(() => {
//         SpeechRecognition.stopListening();
//         setIsRecording(false);
//       }, recordingDuration);
//     }
//   };


//   useEffect(() => {
//     // Update capturedTranscript whenever transcript changes
//     if (!isRecording) {
//       setInputLocalValue(transcript);
//       if (transcript) {
//         const url = constructUrl(1, transcript);
//         const options = constructOptions(1, transcript);
//         // setCurrentPage(1);
//         dispatch(fetchSearch(options) as any);
//         router.push(url);
//       }

//     }
//   }, [transcript, isRecording]);

//   const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
//     setInputLocalValue(e.target.value);
//     // dispatch(setInputValue(value)); 

//   };

//   const searchHandler = () => {
//     if (inputLocalValue.trim() === '') {
//       return;
//     }

//     const url = constructUrl(1, inputLocalValue);
//     const options = constructOptions(1, inputLocalValue);
//     // setCurrentPage(1);
//     dispatch(fetchSearch(options) as any);
//     router.push(url);
//   }

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       searchHandler();
//     }
//   };

//   const imageLoader = ({ src, width, quality }: any) => {
//     return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
//   };

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(true);
//   }

//   // to be used later 
//   useEffect(() => {
//     const currentRoute = router.pathname;
//     if (searchKeyParam && currentRoute.includes("search-result")) {
//       setInputLocalValue(searchKeyParam);
//     }
//     else {
//       setInputLocalValue('');
//     }
//   }, [searchKeyParam, router.pathname]);

//   return (

//     <div style={{ maxWidth: '2100px', margin: '0 auto', backgroundColor: '#ffffff' }}>
//       <nav className={`navbar navbar-expand-sm row ${styles.nav_top}`}>
//         <div className={styles.navGrid}>
//           <div className={styles.logo_container}>
//             {loadingLogo ? Array.from({ length: 4 }).map((_, index: number) => (
//               <div key={index} className={` py-3 ${styles.skeleton_wrapper}`}>
//                 <Skeleton height={45} width={70} />
//               </div>
//             )) :
//               <div>
//                 {
//                   logoData?.length > 0 && logoData?.map((data: any, index: number) => {
//                     return (
//                       <Link key={index} className={`navbar-brand ${styles.vertical_bar} ${styles.header_logo_link}`} href="/">
//                         <Image src={data?.image} alt='NRLM logo' height={45} width={100}
//                           loader={imageLoader}
//                         />
//                       </Link>
//                     )
//                   })
//                 }
//               </div>
//             }
//           </div>
//           <div className=''>
//             <div className="row">
//               <div className="col-11">
//                 <div className={`${styles.search_form_web}`}>
//                   <input className={`form-control ${styles.search_input}`} value={inputLocalValue} onKeyDown={handleKeyDown} onChange={handleInputChange} placeholder="Search" aria-label="Search" />
//                   <i className={`fa fa-search ${styles.search_icon}`} aria-hidden="true" onClick={searchHandler}></i>
//                 </div>
//               </div>
//               <div className="col-1 p-0">
//                 <div className={styles.mic_icon_wrapper}>
//                   <i className={`fa fa-microphone ${styles.mic_icon}`} aria-hidden="true" onClick={startRecording}></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className='d-flex justify-content-end'>
//             <div className='mt-3 ms-3'>
//               <GoogleTranslator />
//             </div>
//             <div className='d-flex justify-content-center align-items-center'>
//               {
//                 isLoggedIn == 'true' ?
//                   <div className={`${styles.profile_dropdown}`}>
//                     <div className={`${styles.dropdown}`}>
//                       <span className={`${styles.dropbtn}`}><AccountCircleIcon sx={{ fontSize: '40px' }} /></span>
//                       <div className={`${styles.profile_dropdown_content}`}>
//                         <button className={`bg-light ${styles.profile_dropdown_logout_btn}`} onClick={handleClick}>Logout</button>
//                         {isLoggedInGoogle == 'false' && <Link href="/change-password">Change Password</Link>}

//                       </div>
//                     </div>
//                   </div>
//                   : <div>
//                     <LoginModal toggleLoginModal={toggleLoginModal} setIsModalLoginOpen={setIsModalLoginOpen} isModalLoginOpen={isModalLoginOpen} setIsModalOpen={setIsModalOpen} />
//                   </div>
//               }
//               {
//                 isLoggedIn === 'true' ? '' :
//                   <div className={`${styles.signup_btn}`}>
//                     <SignUpModal toggleModal={toggleModal} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setIsModalLoginOpen={setIsModalLoginOpen} />
//                   </div>
//               }

//             </div>
//           </div>
//         </div>
//       </nav>
//       <div className={`navbar navbar-expand-sm row ${styles.second_nav}`}>
//         <div className={`col-md-12 ${styles.navbar_list}`}>
//           <>
//             {loadingNavbar ? (
//               <SkeletonNavbar length={navbarData?.length} />
//             ) : (Array.isArray(navbarData) && navbarData?.length > 0 && navbarData?.map((menu: any, index: number) => (
//               <div key={index} className={styles.dropdown}>
//                 {menu?.values.length > 0 ? (
//                   <>
//                     <button className={index !== navbarData.length - 1 ? styles.dropbtn : styles.dropbtn_no_bar} onMouseOver={toggleDropdown}>{menu?.name}</button>
//                     {isDropdownOpen && <DropdownList sections={menu?.values} setIsDropdownOpen={setIsDropdownOpen} />}
//                   </>
//                 ) : <Link href={menu?.url ?? ''}>
//                   <button className={index !== navbarData.length - 1 ? styles.dropbtn : styles.dropbtn_no_bar} onMouseOver={toggleDropdown}>{menu?.name}</button>
//                 </Link>}


//               </div>
//             ))
//             )}
//           </>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WebNavbar

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar/Navbar.module.css';
import DropdownList from './components/Dropdown';
import SignUpModal from '../Auth/SignUpModal';
import LoginModal from '../Auth/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useLogo from '@/hooks/home_page_hooks/logo_hooks';
import { CONSTANTS } from '@/services/config/app-config';
import useNavbar from '@/hooks/home_page_hooks/navbar_hooks';
import SkeletonNavbar from '@/skeletons/HomePage/SkeletonNavbar';
import Skeleton from 'react-loading-skeleton';
import useAuth from './components/useAuth';
import useSearch from './components/useSearch';
import useSpeech from './components/useSpeech';
import GoogleTranslator from '@/GoogleTranslator/GoogleTranslator';

const WebNavbar = () => {
  const { isModalOpen, isModalLoginOpen, LoggedIn, handleLogout, toggleModal, toggleLoginModal, setIsModalOpen, setIsModalLoginOpen } = useAuth();
  const { inputLocalValue, handleInputChange, handleKeyDown, searchHandler } = useSearch();
  const { startRecording, isRecording, browserSupportsSpeechRecognition } = useSpeech();
  const { logoData, loadingLogo } = useLogo();
  const { navbarData, loadingNavbar } = useNavbar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(true);
  }

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("browser doesn't support speech recognition");
    }
  }, [browserSupportsSpeechRecognition]);

  return (
       <div style={{ maxWidth: '2100px', margin: '0 auto', backgroundColor: '#ffffff' }}>
      <nav className={`navbar navbar-expand-sm row ${styles.nav_top}`}>
        <div className={styles.navGrid}>
          <div className={styles.logo_container}>
            {loadingLogo ? Array.from({ length: 4 }).map((_, index: number) => (
              <div key={index} className={` py-3 ${styles.skeleton_wrapper}`}>
                <Skeleton height={45} width={70} />
              </div>
            )) :
              <div>
                {
                  logoData?.length > 0 && logoData?.map((data: any, index: number) => {
                    return (
                      <Link key={index} className={`navbar-brand ${styles.vertical_bar} ${styles.header_logo_link}`} href="/">
                        <Image src={data?.image} alt='NRLM logo' height={45} width={100}
                          loader={imageLoader}
                        />
                      </Link>
                    )
                  })
                }
              </div>
            }
          </div>
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
          <div className='d-flex justify-content-end'>
            <div className='mt-3 ms-3'>
              <GoogleTranslator />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              {
                LoggedIn ?
                  <div className={`${styles.profile_dropdown}`}>
                    <div className={`${styles.dropdown}`}>
                      <span className={`${styles.dropbtn}`}><AccountCircleIcon sx={{ fontSize: '40px' }} /></span>
                      <div className={`${styles.profile_dropdown_content}`}>
                        <button className={`bg-light ${styles.profile_dropdown_logout_btn}`} onClick={handleLogout}>Logout</button>
                        {LoggedIn && <Link href="/change-password">Change Password</Link>}

                      </div>
                    </div>
                  </div>
                  : <div>
                    <LoginModal toggleLoginModal={toggleLoginModal} setIsModalLoginOpen={setIsModalLoginOpen} isModalLoginOpen={isModalLoginOpen} setIsModalOpen={setIsModalOpen} />
                  </div>
              }
              {
                LoggedIn ? '' :
                  <div className={`${styles.signup_btn}`}>
                    <SignUpModal toggleModal={toggleModal} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setIsModalLoginOpen={setIsModalLoginOpen} />
                  </div>
              }

            </div>
          </div>
        </div>
      </nav>
      <div className={`navbar navbar-expand-sm row ${styles.second_nav}`}>
        <div className={`col-md-12 ${styles.navbar_list}`}>
          <>
            {loadingNavbar ? (
              <SkeletonNavbar length={navbarData?.length} />
            ) : (Array.isArray(navbarData) && navbarData?.length > 0 && navbarData?.map((menu: any, index: number) => (
              <div key={index} className={styles.dropdown}>
                {menu?.values.length > 0 ? (
                  <>
                    <button className={index !== navbarData.length - 1 ? styles.dropbtn : styles.dropbtn_no_bar} onMouseOver={toggleDropdown}>{menu?.name}</button>
                    {isDropdownOpen && <DropdownList sections={menu?.values} setIsDropdownOpen={setIsDropdownOpen} />}
                  </>
                ) : <Link href={menu?.url ?? ''}>
                  <button className={index !== navbarData.length - 1 ? styles.dropbtn : styles.dropbtn_no_bar} onMouseOver={toggleDropdown}>{menu?.name}</button>
                </Link>}


              </div>
            ))
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default WebNavbar;








