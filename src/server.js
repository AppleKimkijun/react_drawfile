const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;
const path = require('path');

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
  })

  app.get('/', (res, req) => {
    req.sendFile(path.join(__dirname, '../build/index.html'));
  })