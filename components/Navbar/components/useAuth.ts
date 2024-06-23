import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ClearToken} from '@/store/slices/auth_slice/login_slice';
import { ClearGoogleToken } from '@/store/slices/auth_slice/google_login_slice';
import LogoutList from '@/services/api/auth_api/logout_api';

const useAuth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [LoggedIn, setLoggedIn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("loginStatus");
    if (storedLoginStatus) {
      const parsedLoginStatus = JSON.parse(storedLoginStatus);
      setLoggedIn(parsedLoginStatus?.LoggedIn || false);
    }
  }, []);

  const handleLogout = async () => {
    const response = await LogoutList();
    localStorage.removeItem("loginStatus");
    dispatch(ClearToken());
    dispatch(ClearGoogleToken());
    setLoggedIn(false);
    router.push('/');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleLoginModal = () => {
    setIsModalLoginOpen(!isModalLoginOpen);
  };

  return {
    isModalOpen,
    isModalLoginOpen,
    LoggedIn,
    handleLogout,
    toggleModal,
    toggleLoginModal,
    setIsModalOpen,
    setIsModalLoginOpen,
  };
};

export default useAuth;
