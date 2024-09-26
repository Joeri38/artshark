import Order from '../../../models/Order'
import connectDb from '../../../middleware/mongoose'
import JsonWebToken  from 'jsonwebtoken'

const handler = async (req,res)=>{
    const token = req.body.token;
    const data = JsonWebToken.verify(token , process.env.JWT_SECRET);
    //let orders = await Order.find().sort({ createdAt: -1 })
    let orders = await Order.aggregate([
      {
        $addFields: {
          deliveryStatusOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$deliveryStatus", "problem"] }, then: 1 },
                { case: { $eq: ["$deliveryStatus", "order received"] }, then: 2 },
                { case: { $eq: ["$deliveryStatus", "shipping"] }, then: 3 },
                { case: { $eq: ["$deliveryStatus", "delivered"] }, then: 4 },
              ],
            }
          }
        }
      },
      {
        $sort: { deliveryStatusOrder: 1, createdAt: -1 }
      },
      {
        $project: { deliveryStatusOrder: 0 } // Optionally remove the temporary field from the final result
      }
    ]);
    
    res.status(200).json({ orders })
  }

export default connectDb(handler);  