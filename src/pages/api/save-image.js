import formidable from 'formidable'; 
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {

      if (err) {
        res.status(500).json({ error: 'Image parsing error' });
        return;
      }

      const uploadedFile = files.image;
      const newFilePath = `/public/images/user-created/${uploadedFile.originalFilename}`; 

      fs.rename(uploadedFile.filepath, newFilePath, (err) => {
        if (err) {
          res.status(500).json({ error: 'Error saving image' });
        } else {
          res.status(200).json({ 
            message: `/uploads/${uploadedFile.originalFilename}` // New image URL
          });
        }
      });
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}