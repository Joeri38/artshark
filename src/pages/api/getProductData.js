// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product";

export default async function handler(req, res) {

    if (req.method == 'POST'){

        const { path } = req.body;
        if( path === 'getProductData' ){
            const { id } = req.body;
            let data = await Product.findById(id)
            if(data){
                res.status(200).json({ success: true, data}) 
            } 
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }

        }


        
        
    }
    else{
        res.status(400).json({ success: false, message: "Some Error Occured !" }) 
    }

}
