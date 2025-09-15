// import React, { useState, useRef } from 'react';
// import { uploadRecording } from '../api';

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// function Recorder({ onUploadSuccess }) {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const [error, setError] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const recognitionRef = useRef(null);

//   // Initialize speech recognition
//   if (!recognitionRef.current && SpeechRecognition) {
//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = true;
//     recognition.continuous = true;

//     recognition.onresult = (event) => {
//       let interimTranscript = '';
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const result = event.results[i];
//         if (result.isFinal) {
//           setTranscript((prev) => prev + result[0].transcript + ' ');
//         } else {
//           interimTranscript += result[0].transcript;
//         }
//       }
//     };

//     recognition.onerror = (event) => {
//       setError(event.error);
//     };

//     recognitionRef.current = recognition;
//   }

//   const startRecording = async () => {
//     setError(null);
//     setTranscript('');
//     audioChunksRef.current = [];

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (e) => {
//         audioChunksRef.current.push(e.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//         try {
//           await uploadRecording(audioBlob, transcript.trim());
//           onUploadSuccess();
//           setTranscript('');
//         } catch (err) {
//           setError('Upload failed: ' + err.message);
//         }
//       };

//       mediaRecorder.start();
//       recognitionRef.current.start();
//       setIsRecording(true);
//     } catch (err) {
//       setError('Could not start recording: ' + err.message);
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     recognitionRef.current.stop();
//     setIsRecording(false);
//   };

//   const speakText = (text) => {
//     if (!window.speechSynthesis) {
//       setError('Text-to-speech not supported');
//       return;
//     }
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'en-US';
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div style={{ marginBottom: 20 }}>
//       <h2>Voice Recorder</h2>
//       <button onClick={isRecording ? stopRecording : startRecording}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       <div style={{ marginTop: 10 }}>
//         <strong>Transcript:</strong> {transcript}
//       </div>
//       <button
//         onClick={() => speakText(transcript)}
//         disabled={!transcript}
//         style={{ marginTop: 10 }}
//       >
//         Speak Text
//       </button>
//       {error && <div style={{ color: 'red' }}>Error: {error}</div>}
//     </div>
//   );
// }

// export default Recorder;


import React, { useState, useRef } from 'react';
import { uploadRecording } from '../api';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function Recorder({ onUploadSuccess }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  // Initialize speech recognition once
  if (!recognitionRef.current && SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          setTranscript((prev) => prev + result[0].transcript + ' ');
        } else {
          interimTranscript += result[0].transcript;
        }
      }
    };

    recognition.onerror = (event) => {
      setError(event.error);
    };

    recognitionRef.current = recognition;
  }

  const startRecording = async () => {
    setError(null);
    setTranscript('');
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        try {
          await uploadRecording(audioBlob, transcript.trim());
          onUploadSuccess();
          setTranscript('');
        } catch (err) {
          setError('Upload failed: ' + err.message);
        }
      };

      mediaRecorder.start();
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError('Could not start recording: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) {
      setError('Text-to-speech not supported');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Voice Recorder</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div style={{ marginTop: 10 }}>
        <strong>Transcript:</strong> {transcript}
      </div>
      <button
        onClick={() => speakText(transcript)}
        disabled={!transcript}
        style={{ marginTop: 10 }}
      >
        Speak Text
      </button>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
}

export default Recorder;