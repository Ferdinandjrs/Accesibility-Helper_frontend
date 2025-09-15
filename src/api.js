const API_BASE = 'http://localhost:8080/api';

export async function uploadRecording(blob, transcript) {
  const formData = new FormData();
  formData.append('file', blob, 'recording.webm');
  //formData.append('text', text);
  formData.append('transcript', transcript);

  const response = await fetch(`${API_BASE}/recordings`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload recording');
  }
  return response.json();
}

export async function fetchRecordings() {
  const response = await fetch(`${API_BASE}/recordings`);
  if (!response.ok) {
    throw new Error('Failed to fetch recordings');
  }
  return response.json();
}

export async function deleteRecording(id) {
  const response = await fetch(`${API_BASE}/recordings/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorText = await response.transcript();
    throw new Error('Failed to delete recording: ' + errorText);
  }
  return response.json();
}

//audioUrl: "/api/recordings/" + r.getId() + "/audio"