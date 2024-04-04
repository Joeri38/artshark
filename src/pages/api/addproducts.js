import Product from '../../../models/Product'
import connectDb from '../../../middleware/mongoose'

const handler = async (req,res)=>{
    if (req.method == 'POST'){
        
        let addProduct = new Product({
            desc: req.body.desc,
            img: req.body.img,
            collection: req.body.collection,
        })
        await addProduct.save();
        res.status(200).json({ success: true,  message: "Item added succesfully!", 
                               productID: addProduct._id})
    }
    else{
        res.status(400).json({ error: "Item not added!" })
    }
}

export default connectDb(handler);