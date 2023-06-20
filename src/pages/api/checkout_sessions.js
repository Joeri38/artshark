const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { lineItems, newCartItems } = req.body;

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata:{
          cart: JSON.stringify(newCartItems)
        },
        payment_intent_data:{
          "metadata": {
            cart: JSON.stringify(newCartItems)
          }
        },
        mode: 'payment',
        billing_address_collection: "required",
        phone_number_collection: {
          enabled: true,
        },
        payment_method_types: ["bancontact", "card", "paypal", "link"], // "eps", "giropay", "ideal",
        
        success_url: `${process.env.HOST}/success?id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.HOST}/failed`,

        /*custom_fields: [
          {
            key: 'size',
            label: {
              type: 'custom',
              custom: 'T-shirt size',
            },
            type: 'text',
          },
        ],*/
      });

      res.status(200).json({ success: true, message: "Succesfully Log In!", url:session.url, id:session.id })
     

    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}