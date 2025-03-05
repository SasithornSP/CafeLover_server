const prisma = require('../configs/prisma');

const stripe = require('stripe')('sk_test_51QzCc807JCuZBtxv0GZGm9E6YV4N1MYH6zvutZTpcAvmO5N0po0Y1mYooP3qKkBtn9AZi4octHqcepQMzySKbDIk00BeEjNVBa')

exports.checkOut = async (req , res , next)=> {
try {
    console.log(req.body);
    const { id } = req.body;
    // ดึงข้อมูล order จาก database
    const order = await prisma.order.findUnique({
      where: { id: +id }
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // แปลงราคาให้เป็นหน่วยสตางค์ (Stripe ใช้หน่วยเล็กสุดของสกุลเงิน)
    const totalPrice = Math.round(order.totalPrice * 100);

    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            quantity: 1,
            price_data: {
              currency: "thb",
              product_data: {          
                name : "Order Payment"
               },
              unit_amount:totalPrice
                }
              },
        ],
        mode: 'payment',
        return_url: `http://localhost:5173/user/complete/{CHECKOUT_SESSION_ID}`,
      });
    
      res.send({clientSecret: session.client_secret});
} catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server error' });
}
} 

  

exports.checkOutStatus = async (req , res , next)=> {
  //
}