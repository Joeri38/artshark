import Order from '../../../models/Order'
import connectDb from '../../../middleware/mongoose'


const handler = async (req,res)=>{


    if (req.method == 'POST'){
        const {firstname, lastname, phoneno, products, amount, email, cardHolder, cardNumber,cardExpiry, cardCvc, streetAddress, state, zip} = req.body;
        let newOrder = new Order( {products, amount, email, firstname,lastname, phoneno, cardHolder, cardNumber,cardExpiry, cardCvc, streetAddress, state, zip} );
        let order = await newOrder.save();
        res.status(200).json({ success: true, message: "New Order Added !",  id: order.id}) 
        }

    }


export default connectDb(handler);