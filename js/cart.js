const cart = () => {
    const cartBtn = document.querySelector('.button-cart')
    const modalCart = document.getElementById('modal-cart')
    const modalCloseBtn = document.querySelector('.modal-close')

    cartBtn.addEventListener('click', () => {
        modalCart.style.display = 'flex'
    })

    modalCloseBtn.addEventListener('click', () => {
        modalCart.style.display = 'none'
    })
}

cart()
