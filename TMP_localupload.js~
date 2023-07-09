const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  dest: './uploads' // Destination folder for uploaded files
});

app.get('/', (req, res) => {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post('/upload', upload.single('file'), (req, res) => {
  // req.file contains the uploaded file
  // Handle the file upload logic here

  res.json({ message: 'File uploaded successfully!' });
});

app.listen(53124, () => {
  console.log('Server is running on port 3000');
});
