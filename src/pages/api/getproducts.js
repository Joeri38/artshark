import Product from '../../../models/Product'
import connectDb from '../../../middleware/mongoose'

const handler = async (req,res)=>{
    let product = await Product.find()

    let tshirts= {}
    for (let item of product){
        if (item.title in tshirts) {
            if (!tshirts[item.title].color.includes(item.color) && item.avilableQty > 0) {
                tshirts[item.title].color.push(item.color)
            }
            if (!tshirts[item.title].size.includes(item.size) && item.avilableQty > 0) {
                tshirts[item.title].size.push(item.size)
            }
        }
        else {
            // tshirts[item.title] is key and its value is whole object(item)
            tshirts[item.title] = JSON.parse(JSON.stringify(item))
            if(item.avilableQty > 0) {
                tshirts[item.title].color = [item.color]
                tshirts[item.title].size = [item.size]
            }

        }
    };

    res.status(200).json( { tshirts } )
}
export default connectDb(handler);