import Product from '../../../models/Product'
import connectDb from '../../../middleware/mongoose'

const handler = async (req,res)=>{
    if (req.method == 'POST'){

        const { id, title, price, img1, img2, img3, category, slug, desc } = req.body;
        let dbProduct = await Product.findById(id);

        if(dbProduct){
            if( title === dbProduct.title && price === dbProduct.price && price === dbProduct.price 
                && img1 === dbProduct.img1 && img2 === dbProduct.img2 && img3 === dbProduct.img3 
                && category === dbProduct.category && slug === dbProduct.slug && desc === dbProduct.desc  ){
                res.status(400).json({ success: false, message: "No Changes found!" }) 
            }
            else{
                let data =  await Product.findByIdAndUpdate(id, { title:title, price:price, img1:img1, img2:img2, img3:img3, category:category, slug:slug, desc:desc })
                res.status(200).json({ success: true, message: "Update Successfully!", data }) 
            }
        }
        else{
            res.status(400).json({ success: false, message: "Internal server error!" }) 
        }




        
        // for (let i = 0; i < req.body.length; i++) {
        //     await Product.findByIdAndUpdate(req.body[i].id, req.body[i]);
        // }
        // res.status(200).json({ success: "Item updated Succesfully!" })
    }
    else{
        res.status(400).json({ error: "This method is not allowed!" })
    }
}
export default connectDb(handler);