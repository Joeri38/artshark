import formidable from 'formidable'; 
const fs = require('fs');

export default async function handler(req, res) {
  if (req.method === 'POST') {

    // Retrieve image 
    const response = await fetch(req.body.imgPath);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set file name
    const fileName = req.body.imgPrompt.toLowerCase().replaceAll(' ', '_') + '.png';

    // Save image
    fs.writeFile('public/images/user-created/' + fileName, buffer, function (err) {
      if (err) throw err;
      console.log('File written: ' + fileName);
    });

    // Return status code
    res.status(200).json({ message: 'Image saved' })

  } 
  
  else {
    res.status(405).end(); // Method Not Allowed
  }
}