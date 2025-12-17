
export const cart=JSON.parse(localStorage.getItem("cart"))

export function saveItemsToCart (){
    localStorage.setItem("cart",JSON.stringify(cart))
}

export function getCartQuantity() {
  let cart_quantity = 0;

  cart.forEach((element) => {
    
    if (Number(element.quantity) === 0) {
        cart_quantity++;
    } else {
        cart_quantity += Number(element.quantity);
    }
  });

  return cart_quantity;
}
