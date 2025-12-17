export const cart=JSON.parse(localStorage.getItem("cart"))

export function saveItemsToCart (){
    localStorage.setItem("cart",JSON.stringify(cart))
}

