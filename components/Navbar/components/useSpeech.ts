import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { fetchSearch } from '@/store/slices/search_slice/search_slice';
import { constructUrl, constructOptions } from '@/utils/search_utils';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const useSpeech = () => {
  const [isRecording, setIsRecording] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const recordingDuration = 5000;

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startRecording = () => {
    if (!isRecording) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
      setTimeout(() => {
        SpeechRecognition.stopListening();
        setIsRecording(false);
      }, recordingDuration);
    }
  };

  useEffect(() => {
    if (!isRecording && transcript) {
      const url = constructUrl(1, transcript);
      const options = constructOptions(1, transcript);
      dispatch(fetchSearch(options) as any);
      router.push(url);
    }
  }, [transcript, isRecording]);

  return {
    startRecording,
    isRecording,
    transcript,
    browserSupportsSpeechRecognition,
  };
};

export default useSpeech;
