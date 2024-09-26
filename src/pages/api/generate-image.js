//import { Configuration, OpenAIApi } from "openai"

//const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
//const openai = new OpenAIApi(configuration)

// openai version ^4.0.0
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export default async function handler(req, res) {

    if(req.method == 'POST'){

        // Get prompt
        const { prompt } = req.body;

        try {
            
            // Send prompt to OpenAI API
            const response = await openai.createImage({
                model: "dall-e-3",
                prompt: prompt,
              });

            // Get data from response
            const image_url = response.data.data[0].url;
            const revised_prompt = response.data.data[0].revised_prompt;

            // Send data to client
            res.status(200).json({ message: "Image generated!", 
                                   img_url: image_url,
                                   prompt: prompt,
                                   revised_prompt: revised_prompt})
            
        } catch (error) {
            console.log('internal server error')
            res.status(500).json({ error: error.message })
        }
          
    }    
}
