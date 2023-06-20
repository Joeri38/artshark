import Product from '../../../models/Product'
import connectDb from '../../../middleware/mongoose'

const handler = async (req,res)=>{
    if (req.method == 'POST'){

        const { id, title, price, img1, stripePriceId, desc } = req.body;
        let dbProduct = await Product.findById(id);

        if(dbProduct){
            if( title === dbProduct.title && price === dbProduct.price && img1 === dbProduct.img1 
                && stripePriceId === dbProduct.stripePriceId && desc === dbProduct.desc  ){
                res.status(400).json({ success: false, message: "No Changes found!" }) 
            }
            else{
                let data =  await Product.findByIdAndUpdate(id, { title:title, price:price, img1:img1, stripePriceId:stripePriceId, desc:desc })
                res.status(200).json({ success: true, message: "Update Successfully!", data }) 
            }
        }
        else{
            res.status(400).json({ success: false, message: "Internal server error!" }) 
        }

    }
    else{
        res.status(400).json({ error: "This method is not allowed!" })
    }
}
export default connectDb(handler);