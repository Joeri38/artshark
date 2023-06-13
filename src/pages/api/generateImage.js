// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
let openai = new OpenAIApi(configuration);



export default async function handler(req, res) {

    if(req.method == 'POST'){
        const {message} = req.body;

        if(!configuration.apiKey){
            return res.status(500).json({
                error: {
                    message: 'api key missing!'
                }
            })
        }

        try {
            const response = await openai.createImage({
                prompt: `${message}`,
                n: 4,
                size: "1024x1024",
              });
            const responseData = response.data;
            console.log("image created successfully!");
            res.status(200).json({ data: responseData })
            
        } catch (error) {
            console.log('internal server error')
        }
          
    }    
}
