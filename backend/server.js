// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/visualize', (req, res) => {
  const { language, algorithm, code } = req.body;
  // For now, just send back a dummy response
  res.json({
    status: 'success',
    message: `Received ${language} code for ${algorithm}`
  });
});

// Change port to 5001 or any other available port
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});