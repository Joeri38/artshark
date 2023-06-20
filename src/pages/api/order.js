import Order from '../../../models/Order'
import connectDb from '../../../middleware/mongoose'


const handler = async (req,res)=>{


    if (req.method == 'POST'){
        const {firstname, lastname, phoneno, products, amount, email, cardHolder, cardNumber,cardExpiry, cardCvc, streetAddress, state, zip} = req.body;
        try {
            let newOrder = new Order( { products, firstname, lastname } );
            let order = await newOrder.save();
            res.status(200).json({ success: true, message: "New Order Added !",  id: order.id}) 
        } catch (error) {
            res.status(400).json({ success: false, message: "Internal Server Error!" })
        }
    }

    }


export default connectDb(handler);