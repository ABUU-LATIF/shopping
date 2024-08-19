import { products } from "./product.js";
import { cart,addtocart } from "./cart/carts.js";
let allproduct='';
products.forEach((product)=>{
    allproduct +=`
    <div class="allproducts">
       <div><img src="${product.image}" class="image"></div>
       <div>${product.name}</div>
       <div>price:${(Math.round(product.price)/100).toFixed(3)}</div>
       <button class="cartbutton js-products" data-product-id="${product.id}">ADD TO CART</button>
    </div>
    `
})
document.querySelector('.js-allproduct').innerHTML
=allproduct;

document.querySelectorAll('.js-products')
.forEach((button)=>{
button.addEventListener('click',()=>{
    const {productId}=button.dataset;
    addtocart(productId);

let total=0;
    cart.forEach((cartitem)=>{
         total +=cartitem.quantity;
    })
document.querySelector('.js-quantity').innerHTML=total;
})
})