// zomato blinkit merger:


function zomatoRestaurant(){
    console.log("Restaurant is preparing the order");
}

function blinkitWarehouse(){
    console.log("Packing the orde for user");
}



function payment(amount, Callback){
    console.log(amount, "Payment is happenning");
    console.log("Payment is done");
    Callback();

    // GST
    // Commision payment calculate
}


payment(500,zomatoRestaurant);
payment(1000,blinkitWarehouse);
// payment(2000,temple);

