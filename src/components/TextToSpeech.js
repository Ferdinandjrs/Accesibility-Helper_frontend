import React, { useEffect, useState } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    function loadVoices() {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    }
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);
  
  
  const handleSpeak = () => {
    if (!text.trim()) {
      alert('Please enter some text to speak.');
      return;
    }

    // Membatalkan jika ada suara yang sedang diputar
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    // Optional: atur bahasa, kecepatan, pitch, dll
    //utterance.lang = 'id-ID'; // Bahasa Indonesia, ganti sesuai kebutuhan
    utterance.rate = rate;       // Kecepatan bicara (0.1 - 10)
    utterance.pitch = pitch;      // Pitch suara (0 - 2)

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Text to Speech</h2>
      <textarea
        rows={4}
        style={{ width: '100%', padding: 8, fontSize: 16 }}
        placeholder="Masukkan teks, angka, atau kalimat di sini..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <label>
          Voice:
          <select
            value={selectedVoice || ''}
            onChange={(e) => setSelectedVoice(e.target.value)}
            style={{ marginLeft: 10 }}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>
          Rate: {rate.toFixed(1)}
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>

       <div style={{ marginTop: 10 }}>
        <label>
          Pitch: {pitch.toFixed(1)}
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>


      <button onClick={handleSpeak} style={{ marginTop: 10, padding: '8px 16px', fontSize: 16 }}>
        Play Speech
      </button>
    </div>
  );
}
    
export default TextToSpeech;