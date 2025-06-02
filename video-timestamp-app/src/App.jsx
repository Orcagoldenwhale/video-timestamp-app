import React, { useState } from 'react';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function App() {
  const [video, setVideo] = useState(null);
  const [timestamps, setTimestamps] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', video);

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setTimestamps(data.timestamps);
  };

  return (
    <div>
      <h1>Video Timestamp Generator</h1>
      <input type="file" onChange={e => setVideo(e.target.files[0])} />
      <button onClick={handleUpload}>Generate Timestamps</button>

      <video id="video" width="600" controls style={{ marginTop: '20px' }}>
        {video && <source src={URL.createObjectURL(video)} type="video/mp4" />}
      </video>

      <ul>
        {timestamps.map((item, index) => (
          <li key={index}>
            <a href="#" onClick={() => {
              const vid = document.getElementById('video');
              vid.currentTime = item.time;
              vid.play();
            }}>
              {formatTime(item.time)} - {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
