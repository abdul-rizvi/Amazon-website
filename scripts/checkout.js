import { cart, saveItemsToCart, getCartQuantity } from "../data/cart.js"
import { products } from "../data/products.js"
import {deliveryOptions} from "../data/deliveryOptions.js"
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

function delete_element (index){
  cart.splice(index,1);
  saveItemsToCart();
}



function display(){
  let html=""
  cart.forEach((cartItem,index)=>{
      products.forEach((productItem)=>{
          if(cartItem.id===productItem.id) {
            
              html += `<div class="cart-item-container">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${productItem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${productItem.name}
                  </div>
                  <div class="product-price">
                    $${(productItem.priceCents/100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-button js-${index}" data-index="${index}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(index)}
                </div>
              </div>
            </div>`
          }
          
      })
      
  })
  document.querySelector(".js-order-summery").innerHTML=html;
  document.querySelector(".js-cart-count").innerHTML=`${getCartQuantity()} items`
  document.querySelectorAll(".js-delete-button").forEach((button)=>{
    button.addEventListener("click",()=>{
      delete_element(button.dataset.index);
      display();
    })
  })
}

function deliveryOptionsHTML(index){
  let html="";

  deliveryOptions.forEach((option)=>{
    const today= dayjs();
    const deliverDate=today.add(
      option.deliveryDays,
      "days"
    );
    const dateString=deliverDate.format(
      "dddd, MMMM D"
    );

    const priceString=option.priceCents 
    === 0
      ? "free"
      : `$${(option.priceCents/100).toFixed(2)} -`

    html+=`
    <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${index}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
    `
  })
  return html;
}

document.addEventListener("DOMContentLoaded",()=>{
  display();
  
})