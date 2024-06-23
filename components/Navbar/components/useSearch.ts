import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchSearch } from '@/store/slices/search_slice/search_slice';
import { constructUrl, constructOptions } from '@/utils/search_utils';


const useSearch = (closeCanvas) => {
  const [inputLocalValue, setInputLocalValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
    const searchKeyParam = searchParams.get('search_key');

  const searchHandler = () => {
    if (inputLocalValue.trim() === '') {
      return;
    }

    const url = constructUrl(1, inputLocalValue);
    const options = constructOptions(1, inputLocalValue);
    dispatch(fetchSearch(options) as any);
    router.push(url);
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputLocalValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchHandler();
      closeCanvas()
    }
  };

  useEffect(() => {
        const currentRoute = router.pathname;
        if (searchKeyParam && currentRoute.includes("search-result")) {
          setInputLocalValue(searchKeyParam);
        }
        else {
          setInputLocalValue('');
        }
      }, [searchKeyParam, router.pathname]);
  return {
    inputLocalValue,
    setInputLocalValue,
    handleInputChange,
    handleKeyDown,
    searchHandler,
  };
};

export default useSearch;
