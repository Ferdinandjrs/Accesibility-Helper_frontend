// import React from 'react';

// function RecordingsList({ recordings, onDelete }) {
//   if (!recordings.length) {
//     return <div>No recordings saved yet.</div>;
//   }

//   return (
//     <div>
//       <h2>Saved Recordings</h2>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {recordings.map(({ id, text, audioUrl }) => (
//           <li key={id} style={{ marginBottom: 15, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
//             <div><strong>Text:</strong> {text}</div>
//             <audio controls src={audioUrl} />
//              <br />
//             <button onClick={() => onDelete(id)} style={{ marginTop: 5, color: 'red' }}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default RecordingsList;


import React from 'react';

function RecordingsList({ recordings, onDelete }) {
  if (!recordings || recordings.length === 0) {
    return <p><i>No saved recordings.</i></p>;
  }

  return (
    <div>
      {recordings.map(({ id, transcript }) => (
        <div key={id} style={styles.recordingItem}>
          <div style={styles.recordingText}>
            <strong>Text:</strong> {transcript || <i>(empty)</i>}
          </div>
          <button style={styles.deleteButton} onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  recordingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    borderBottom: '1px solid #eee',
    marginBottom: 6,
    borderRadius: 4,
    backgroundColor: '#fafafa',
  },
  recordingText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    border: 'none',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default RecordingsList;