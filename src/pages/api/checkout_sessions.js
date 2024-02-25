const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method === 'POST') {

    // Unpack data from request body
    const { lineItems } = req.body;

    try {

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        billing_address_collection: "required",
        /*automatic_tax: {
          enable: true,
        },*/
        phone_number_collection: {
          enabled: true,
        },   
        payment_method_types: ["bancontact", "card", "paypal", "link"], // "eps", "giropay", "ideal",
        success_url: `${process.env.HOST}/success?id={CHECKOUT_SESSION_ID}`,//
        cancel_url: `${process.env.HOST}/failed`, 

      });

      res.status(200).json({ success: true, message: 'Payment started', url:session.url, id:session.id })

      /*const paymentLink = await stripe.paymentLinks.create({
        line_items: lineItems,
        after_completion: {
          type: 'redirect',
          redirect: {
            url: `${process.env.HOST}/success?id={CHECKOUT_SESSION_ID}`,
          },
        },
        billing_address_collection: "required",
        automatic_tax: {
          enable: true,
        },
        invoice_creation: {
          enabled: true,
        },
        phone_number_collection: {
          enabled: true,
        },   
        payment_method_types: ["bancontact", "card", "paypal", "link"], // "eps", "giropay", "ideal",
      });

      res.status(200).json({ success: true, message: 'Payment started', url:paymentLink.url, id:paymentLink.id })*/
     
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } 
  
  else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}