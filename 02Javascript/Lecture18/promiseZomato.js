// Callback hell 
// First Principle: DRY, Code Readable

// zomato application
// placeOrder
// prepareOrder
// pickUpOrder
// DeliverOrder

//  Callback = ()=>{

//     prepareOrder();
// }

// Callback() = prepareOrder()

const orderDetail = {
    orderId: 12314,
    food: ["chicken Biryani","diet coke"],
    price: 900,
    payment_status: false,
    token_assign: false,
    restaurant_location: "New Delhi",
    customer_location: "Dwarka",
    pickingOrder: false,
    delivered_order: false
};

function placeOrder(orderDetail){
    console.log(`Payment of ${orderDetail.price}rs is in Progress`);
    
    return  new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log("Payment is completed");
        orderDetail.payment_status = true;
        resolve(orderDetail);
        },1000)
      })

    
   
}

function prepareOrder(orderDetail){
    console.log(`Restaurant received the order and preparing ${orderDetail.food}`);
    
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log("Your Order is prepared now");
        orderDetail.token_assign = 123;
        resolve(orderDetail);
        },1000)
    })

    //  setTimeout(()=>{
    //     console.log("Your Order is prepared now");
    //     orderDetail.token_assign = 123;
    //     },1000)
    
}


function pickUpOrder(orderDetail){
    console.log(`Delivery boy is on the way to pick order from ${orderDetail.restaurant_location} restaurant`);
    
   return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log("Delivery boy reached the restaurant");
        orderDetail.pickingOrder = true;
        resolve(orderDetail);
       },1000)
    })

}

function deliverOrder(orderDetail){
    console.log(`Delivery boy pick the order from restaurant and delivering it to ${orderDetail.customer_location}`);
    
   return new Promise((resolve,reject)=>{
         setTimeout(()=>{
        console.log("Delivery boy delivered the order to customer");
        orderDetail.delivered_order = true;
        resolve(orderDetail);
    },1000)
    })

}


placeOrder(orderDetail)
.then((orderDetail)=>prepareOrder(orderDetail))
.then((orderDetail)=>pickUpOrder(orderDetail))
.then((orderDetail)=>deliverOrder(orderDetail))
.then((orderDetail)=>console.log(orderDetail))
// when latest changes on orderDetail comes
// prepareOrder(orderDetail);
// // when latest changes on orderDetail comes
// pickUpOrder(orderDetail);
// // when latest changes on orderDetail comes
// deliverOrder(orderDetail);


// placeOrder(prepareOrder(pickUpOrder));

// placeOrder(prepareOrder);


// placeOrder(orderDetail)
// .then((orderDetail)=>{
//     return prepareOrder(orderDetail);
// })
// .then((orderDetail)=>{
//     return pickUpOrder(orderDetail);
// })
// .then((orderDetail)=>{
//     return deliverOrder(orderDetail);
// })
// .then((orderDetail)=>{
//     console.log(orderDetail);
// })





// placeOrder(orderDetail ,(orderDetail)=>{
//     prepareOrder(orderDetail,(orderDetail)=>{
//         pickUpOrder(orderDetail,(orderDetail)=>{
//             deliverOrder(orderDetail);
//         });
//     });
// });


