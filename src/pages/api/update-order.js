import Order from '../../../models/Order'
import connectDb from '../../../middleware/mongoose'

const handler = async (req,res)=>{
    if (req.method == 'POST'){

        const { id, deliveryStatus } = req.body;
        let dbOrder = await Order.findById(id);

        if(dbOrder){
            let data =  await Order.findByIdAndUpdate(id, { deliveryStatus: deliveryStatus })
            res.status(200).json({ success: true, message: "Delivery status updated!", data }) 
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