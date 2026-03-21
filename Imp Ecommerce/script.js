document.addEventListener("DOMContentLoaded", () =>{
    const products = [
        {id: 1, name:"Product 1", price: 30.00 },
        {id: 2, name:"Product 2", price: 20.00 },
        {id: 3, name:"Product 3", price: 5.00}
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
        <div>
            <button class="decrement" data-id="${prod.id}">-</button>
            <span id="qty-${prod.id}">0</span>
            <button class="increment" data-id="${prod.id}">+</button>
        </div>
        `;
        productlist.appendChild(newprod)
    })

    productlist.addEventListener('click', (e) =>{
        const prodId = parseInt(e.target.getAttribute("data-id"))

        if(e.target.classList.contains("increment")){
        updateCart(prodId, 1)
        }

        if(e.target.classList.contains("decrement")){
        updateCart(prodId, -1)
        }
    })

    function updateCart(prodId, change){
        const existing = cart.find(item => item.id === prodId)

        if(existing){
            existing.qty += change

        if(existing.qty <= 0){
            const index = cart.findIndex(item => item.id === prodId)
            cart.splice(index, 1)
            }
        } else if(change === 1){
        const product = products.find(p => p.id === prodId)
        cart.push({...product, qty: 1})
    }

    renderCart()
    updateProductQtyDisplay()
    }

    function updateProductQtyDisplay(){
        products.forEach(prod => {
            const item = cart.find(p => p.id === prod.id)
            const qty = item ? item.qty : 0

            const span = document.getElementById(`qty-${prod.id}`)
            if(span){
                span.textContent = qty
            }
        })
    }

    function renderCart() {
        cartItem.innerHTML = ""
        let totalPrice = 0;

        if(cart.length){
            emptyCartM.classList.add('hidden')
            cartTotalM.classList.remove('hidden')

            cart.forEach((item) => {
                const itemTotal = item.price * item.qty
                totalPrice += itemTotal 

                const citem = document.createElement('div')
                citem.innerHTML = `
                ${item.name} 
                (${item.qty}) × $${item.price.toFixed(2)} 
                = $${itemTotal.toFixed(2)}
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

