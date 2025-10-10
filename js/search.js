const search = () => {
    const searchBlock = document.querySelector('.search-block')
    const searchInput = document.querySelector('.search-block > input')
    const searchBtn = document.querySelector('.search-block > button')

    searchBtn.addEventListener('click', (event) => {
        console.log(searchInput.value)
    })
}

search()