// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import Recorder from './components/Recorder';
// import QuickPhrases from './components/QuickPhrases';
// import RecordingsList from './components/RecordingsList';
// import TextToSpeech from './components/TextToSpeech';
// import { fetchRecordings, deleteRecording } from './api';

// function App() {
//   const [recordings, setRecordings] = useState([]);

//   useEffect(() => {
//     loadRecordings();
//   }, []);

//   const loadRecordings = async () => {
//     const data = await fetchRecordings();
//     setRecordings(data);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this recording?')) return;
//     try {
//       await deleteRecording(id);
//       loadRecordings();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
//       <h1>Accessibility Helper</h1>
//       <Recorder onUploadSuccess={loadRecordings} />
//       <QuickPhrases />
//       <RecordingsList recordings={recordings} onDelete={handleDelete}/>
//       <TextToSpeech />  {/* Tambahkan komponen TTS di sini */}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import Recorder from './components/Recorder';
import QuickPhrases from './components/QuickPhrases';
import RecordingsList from './components/RecordingsList';
import TextToSpeech from './components/TextToSpeech';
import { fetchRecordings, deleteRecording } from './api';

function App() {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const data = await fetchRecordings();
      setRecordings(data);
    } catch (error) {
      alert('Failed to load recordings: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recording?')) return;
    try {
      await deleteRecording(id);
      loadRecordings();
    } catch (err) {
      // alert(err.message);
      alert('Failed to delete recording: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Accessibility Helper</h1>

      {/* Voice Recorder Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Voice Recorder</h2>
        <Recorder onUploadSuccess={loadRecordings} />
        <QuickPhrases />
      </section>

      {/* Text to Speech Section */}
      <section style={styles.section}>
        <TextToSpeech />
      </section>

      {/* Saved Recordings Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Saved Recordings</h2>
        <RecordingsList recordings={recordings} onDelete={handleDelete} />
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: '20px auto',
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f7fa',
    borderRadius: 8,
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 6,
    marginBottom: 30,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    marginBottom: 15,
    color: '#34495e',
    borderBottom: '2px solid #2980b9',
    paddingBottom: 6,
    fontWeight: '600',
    fontSize: 20,
  },
};

export default App;