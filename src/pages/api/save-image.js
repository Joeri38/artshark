//import formidable from 'formidable'; 
const fs = require('fs');

export default async function handler(req, res) {
  if (req.method === 'POST') {

    // Retrieve image 
    const response = await fetch(req.body.imgPath);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set file name
    let fileName = req.body.imgPrompt.toLowerCase().replaceAll(' ', '_') + '.png';

    console.log(fileName);

    // Check if file name already exists, otherwise add #2, #3, etc.
    let i = 2;
    while (fs.existsSync('public/images/user-created/' + fileName)) {
      if (i === 2){
        fileName = fileName.slice(0, -4) + `#2.png`;
      } else {
        fileName = fileName.slice(0, -6) + `#${i}.png`;
      }
      i++;
    }

    // Save image
    fs.writeFile('public/images/user-created/' + fileName, buffer, function (err) {
      if (err) throw err;
      console.log('File written: ' + fileName);
    });

    // Return status code
    res.status(200).json({ message: 'Image saved', fileName: fileName });

  } 
  
  else {
    res.status(405).end(); // Method Not Allowed
  }
}