window.addEventListener('load', function(event) {
    //event 
    //get id from url dung de lay id tru url
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id');
    const product = store.getById(id);
    if(product) {
        document.getElementById('image').src = product.image
        document.getElementById('name').textContent = product.name
        document.getElementById('price').textContent = product.price
        document.getElementById('description').textContent = product.description
    }
})
