import React from 'react';

const phrases = ['Okay', 'Thank You', 'Hello', 'Sorry'];

function QuickPhrases() {
  const speakText = (text) => {
    if (!window.speechSynthesis) {
      alert('Text-to-speech not supported');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Quick Phrases</h2>
      {phrases.map((phrase) => (
        <button
          key={phrase}
          onClick={() => speakText(phrase)}
          style={{ marginRight: 10, marginBottom: 10 }}
        >
          {phrase}
        </button>
      ))}
    </div>
  );
}

export default QuickPhrases;