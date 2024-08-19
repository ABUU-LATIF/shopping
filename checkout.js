import { cart,updatecart,savetostorage } from "./cart/carts.js";
import { products } from "./product.js";
import { delivery } from "./delivery.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function m(){
  let getproductfrommatchingid;
  let html='';
  cart.forEach((cartitem)=>{
  products.forEach((product)=>{
      if(cartitem.productId===product.id){
      getproductfrommatchingid=product;
      }  
  })    
const m=cartitem.deliveryid;
  let deliverydate;
  delivery.forEach((deliveryoption)=>{
      if(m===deliveryoption.deliveryid){
          deliverydate=deliveryoption;
      };
  });

  let today=dayjs();
    deliverydate=today.add(deliverydate.deliveryday,'days');
  let datestring=deliverydate.format("dddd, MMMM D");


  html +=`
  <div class="grid">
  <div>
  <div>DELIVERY DATE:${datestring}</div>
      <div><img src="${getproductfrommatchingid.image}" class="image"></div>
  </div>
  
  <div>
      <div>${getproductfrommatchingid.name}</div>
      <p>quantity: ${cartitem.quantity}</p>
      <p>PRICE: ${(Math.round(getproductfrommatchingid.price)/100).toFixed(3)}</p>
      <p><button class="js-date" data-delete-id=${getproductfrommatchingid.id}>delete</button></p>
  </div>

  <div>
  ${deliverydate5(getproductfrommatchingid,cartitem)}
  </div>
  </div>

`;
})

function deliverydate5(getproductfrommatchingid,cartitem){
  let HTML='';
  delivery.forEach((delivery)=>{
    
let today=dayjs();
const deliveryday1=today.add(delivery.deliveryday,'day');
const datestring=deliveryday1.format("dddd, MMMM D");

let ischecked=delivery.deliveryid===cartitem.deliveryid;
  HTML+=  `
  <div class="js-dateupdate"
  data-product-id=${getproductfrommatchingid.id}
  data-delivery-id=${delivery.deliveryid}
  >
   <p><input type="radio"  name="js-${getproductfrommatchingid.id}"
   ${ischecked ? 'checked': ''}>
   ${datestring}
   </p>
   <p>PRICE: $${Math.round(delivery.price)/100} - SHIPPING</p>
   </div>
   `
  })  
  return HTML;

}
let productprice;
let totalcartcost=0;

cart.forEach((cartitem)=>{
  products.forEach((product)=>{
    if(cartitem.productId===product.id)
    productprice=product;
  })
   totalcartcost +=(cartitem.quantity * productprice.price/100);
});
let matchingid;
let SHIPPINGTAX=0;
cart.forEach((cartitem)=>{
delivery.forEach((delivery)=>{
    if(delivery.deliveryid===cartitem.deliveryid){
       matchingid=delivery;
    }
   })
SHIPPINGTAX +=(matchingid.price/100);
})

let tax=(0.1 * totalcartcost);
let totalcost=SHIPPINGTAX + tax + totalcartcost;

let p='';
    p +=`<div class="payment">
    <p>TOTAL CART COST: $${totalcartcost.toFixed(2)}</p>
       <div>SHIPPING TAX: $ ${SHIPPINGTAX.toFixed(2)}</div>
       <p>CART TAX: $ ${tax.toFixed(4)}</p>
       <div>TOTAL COST: $ ${totalcost.toFixed(3)}</div>
  
    </div>
    `
    document.querySelector('.js-payment').innerHTML=p; 

  document.querySelector('.js-cart').innerHTML=html;
  document.querySelectorAll('.js-date')
  .forEach((date1)=>{
  date1.addEventListener('click',()=>{
  let {deleteId}=date1.dataset;
  updatecart(deleteId);
  m();
  });
  });

  document.querySelectorAll('.js-dateupdate')
    .forEach((date)=>{
    date.addEventListener('click',()=>{
      let productId=date.dataset.productId;
      let deliveryId=date.dataset.deliveryId;
     cart.forEach((cartitem)=>{
        if(cartitem.productId===productId){
          cartitem.deliveryid=deliveryId
       m();
        }
     })
     savetostorage();
  console.log(cart);
    })
    })


 
}
m();

