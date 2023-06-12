// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from 'models/Product';

export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { path } = req.body;

        if (path === 'deleteProducts'){
            const { id } = req.body;
            try {
                await Product.findByIdAndDelete(id)
                res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
            } catch (error) {
                res.status(400).json({ success: false, message: "Internal Server Error!" }) 
            }

        }
    }
    else{
        res.status(400).json({ success: false, message: "Internal Server Error!" }) 
    }
}