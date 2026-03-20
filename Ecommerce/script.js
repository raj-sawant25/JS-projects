document.addEventListener("DOMContentLoaded", () =>{
    const products = [
        {id: 1, name:"Product 1", price: 29.99 },
        {id: 2, name:"Product 2", price: 19.99 },
        {id: 3, name:"Product 3", price: 9.99 }
    ]

    const cart = []
    
    const productlist = document.getElementById("product-list")
    const cartItem = document.getElementById("cart-items")
    const emptyCartM = document.getElementById("empty-cart")
    const cartTotalM = document.getElementById("cart-total")
    const totalPriceD = document.getElementById("total-price")
    const checkoutBtn = document.getElementById("checkout-btn")


    products.forEach((prod)=>{
        const newprod = document.createElement('div')
        newprod.classList.add('product')
        newprod.innerHTML = `
        <span>${prod.name} - $${prod.price.toFixed(2)} </span>
        <button data-id="${prod.id}">ADD to Cart</button>
        `;
        productlist.appendChild(newprod)
    })

    productlist.addEventListener('click', (e) =>{
        if(e.target.tagName === "BUTTON"){
            const prodId = parseInt(e.target.getAttribute("data-id"))
            const product = products.find(p => p.id === prodId )
            addToCart(product)
        }
    })

    function addToCart(prod){
        cart.push(prod)
        renderCart()
    }

    function renderCart() {
        cartItem.innerHTML = ""
        let totalPrice = 0;

        if(cart.length){
            emptyCartM.classList.add('hidden')
            cartTotalM.classList.remove('hidden')

            cart.forEach((item , index) => {
                totalPrice += item.price

                const citem = document.createElement('div')
                citem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                `
                cartItem.appendChild(citem)
            })
                totalPriceD.textContent = `${totalPrice.toFixed(2)}`
        }else{
            emptyCartM.classList.remove('hidden')
            cartTotalM.classList.add('hidden')
        }
    }
    checkoutBtn.addEventListener('click', () => {
        cart.length = 0
        alert(" Checked out Succesfully")
        renderCart()
    })
})

