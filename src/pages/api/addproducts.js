import Product from '../../../models/Product'
import connectDb from '../../../middleware/mongoose'

const handler = async (req,res)=>{
    if (req.method == 'POST'){
        
        let addProduct = new Product({
            title: req.body.title,
            desc: req.body.desc,
            slug: req.body.slug ,
            img1: req.body.img1,
            img2: req.body.img2,
            img3: req.body.img3,
            category: req.body.category,
            price: req.body.price,
        })
        await addProduct.save();
        res.status(200).json({ success: true,  message: "Item added succesfully!" })
    }
    else{
        res.status(400).json({ error: "Item not added!" })
    }
}

export default connectDb(handler);