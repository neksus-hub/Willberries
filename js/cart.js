const cart = () => {
    const cartBtn = document.querySelector('.button-cart')
    const modalCart = document.getElementById('modal-cart')
    const modalCloseBtn = document.querySelector('.modal-close')
    const goodsContainer = document.querySelector('.long-goods-list')
    const cartTable = document.querySelector('.cart-table__goods')
    const form = document.querySelector('.modal-form')
    const modal = document.querySelector('.modal')

    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods'))
        const clickedGood = goods.find(good => good.id === id)
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

        if (cart.some(good => good.id === clickedGood.id)) {
            cart.map(good => {
                if (good.id === clickedGood.id) {
                    good.count++
                }
                return good
            })
        } else {
            clickedGood.count = 1
            cart.push(clickedGood)
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if (good.id === id) {
                good.count++
            }
            return good
        })


        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
        totalPrice(JSON.parse(localStorage.getItem('cart')))
    }

    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if (good.id === id) {
                if (good.count > 0) {
                    good.count--
                }
            }
            return good
        })


        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
        totalPrice(JSON.parse(localStorage.getItem('cart')))
    }

    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.filter((good) => {
            return good.id !== id
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
        totalPrice(JSON.parse(localStorage.getItem('cart')))
    }



    const renderCartGoods = (goods) => {
        cartTable.innerHTML = ``
        goods.forEach((good) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
            <td>${good.name}</td>
            <td>${good.price}$</td>
            <td><button class="cart-btn-minus"">-</button></td>
            <td>${good.count}</td>
            <td><button class=" cart-btn-plus"">+</button></td>
            <td>${+good.price * +good.count}</td>
            <td><button class="cart-btn-delete"">x</button></td>
            `

            cartTable.append(tr)

            tr.addEventListener('click', (e) => {
                if (e.target.classList.contains('cart-btn-minus')) {
                    minusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-plus')) {
                    plusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-delete')) {
                    deleteCartItem(good.id)
                }
            })
        });
    }

    const sendForm = () => {
        const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const modalInputs = form.querySelectorAll('.modal-input')
        let userName
        let userPhone

        modalInputs.forEach(modalInput => {
            if (modalInput.name === 'nameCustomer') {
                userName = modalInput.value
            } else if (modalInput.name === 'phoneCustomer') {
                userPhone = modalInput.value
            }
        })

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                cart: cartArray,
                name: userName,
                phone: userPhone
            })
        }).then(() => {
            clearForm()
            modalCart.style.display = ""
        })
    }

    const clearForm = () => {
        const modalInputs = form.querySelectorAll('.modal-input')
        modalInputs.forEach(modalInput => {
            modalInput.value = ''
        })
    }

    const totalPrice = (goods) => {
        const total = document.querySelector('.card-table__total')
        let totalSum = 0
        total.textContent = ''


        goods.forEach((good) => {
            totalSum += +good.price * +good.count
        })

        total.textContent = totalSum
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        sendForm()
    })

    cartBtn.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        renderCartGoods(cartArray)
        totalPrice(cartArray)
        modalCart.style.display = 'flex'
    })

    modalCloseBtn.addEventListener('click', () => {
        modalCart.style.display = 'none'
    })

    if (goodsContainer) {
        goodsContainer.addEventListener('click', (e) => {
            e.preventDefault()
            if (e.target.closest('.add-to-cart')) {
                const buttonToCart = e.target.closest('.add-to-cart')
                const goodId = buttonToCart.dataset.id
                addToCart(goodId)
            }
        })
    }
}

cart()
