
// mohit ji
app.post("/order",async (req,res)=>{

    await OrderPlaced();

    res.json("Order placed successfully");
    // DB

    await email();

    await sms();

    await warrehouse();

    await paymentfraud();

    await recommendationSystem();

    await analytics();


    


})