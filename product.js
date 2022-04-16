

// them san pham

function renderTable(products) {
    let content = ''
    for(let i = 0; i < products.length; i++) {
        const item = products[i];
        content += `
        <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.price}</td>
                    <td><img src="${item.image}"width=90px height=130px /></td>
                    <td>
                    <button type="button" class="btn btn-primary" onClick="onEdit(${item.id})">Sửa</button>
                    <button type="button" class="btn btn-danger" onClick="onRemove(${item.id})">Xóa</button>
                
                    <a href="./product-detail.html?id=${item.id}"/>Xem chi tiết</a>
                    </td>
                </tr>
        `
    }
    if(document.getElementById('tableBody')){
        document.getElementById('tableBody').innerHTML = content
    }
}

function renderTable1(products){
    let content=''
    let gt=-1
    for(let i = 0; i < products.length; i++) {
        gt++
        const item = products[i];
        if(gt%5==0){
            content += `

                    <tr>
                    
                    <br>
                    <td>
                    <img src="${item.image}" height=250px 
                    style="PADDING: 20PX;"
                    />
                    <br>
                    
                    sản phẩm tốt ${item.name}
                    <br>
                    Mức giá: ${item.price} RP
                   <br>

                    <a href="./product-detail.html?id=${item.id}"/>Xem thêm</a>
                    </td>
                   
        `
        }else{                                                                              
        content += `
                    <br>
                    <td><img src="${item.image}" height=250px 
                    style="PADDING: 20PX;"
                    />
                    <br>
                    sản phẩm tốt${item.name}
                    <br>
                    Mức giá: ${item.price} RP
                   <br>

                    <a href="./product-detail.html?id=${item.id}"/>Xem thêm</a>
                    </td>

        `}
    }
    
    if(document.getElementById('tableBody1')){
        document.getElementById('tableBody1').innerHTML = content
    }
}

renderTable(store.getProduct())
renderTable1(store.getProduct())


document.getElementById('frmProductCreate')&&document.getElementById('frmProductCreate').addEventListener('submit', function(event){
    event.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const price = document.getElementById('price').value;

    const error = validate({id,name,price,description,image})
    if(error.length>0){
        document.getElementById('error').innerHTML=error.join('<br>')
        return
    }

    if(name === '' || description === '' || price === '' || image === '' || id === '') {
        alert('điền đầy đủ thông tin')
    return
    }
    const product = new Product(id, name, price, description, image);
    const isCreate = store.add(product);
    if(isCreate) {
        alert('Thêm thành công')
        store.save();
        renderTable(store.getProduct())
    } else {
        alert('Thêm thất bại')
    }

})

document.getElementById('frmProductEdit')&&document.getElementById('frmProductEdit').addEventListener('submit', function(event){
event.preventDefault();
const id = document.getElementById('prodId').value;
const name = document.getElementById('prodName').value;
const description = document.getElementById('prodDescription').value;
const image = document.getElementById('prodImage').value;
const price = document.getElementById('prodPrice').value;

if(name === '' || description === '' || price === '' || image === '' || id === '') {
    alert('điền đầy đủ thông tin')
    return
}
const product = new Product(id, name, price, description, image);
const isCreate = store.update(product);
if(isCreate) {
    alert('Cập nhật thành công')
    store.save();
    renderTable(store.getProduct())
} else {
    alert('Cập nhật thất bại')
}

})


function onRemove(id) {
const confirmAction = confirm("bạn có muốn xoá product id: "+id);
if (confirmAction) {
    const isRemove = store.remove(`${id}`);
    if(isRemove) {
        alert('Xoá thành công')
        store.save();
        renderTable(store.getProduct())
    } else {
        alert('Xoá thất bại')
    }
}
}

function onEdit(id) {

    var myModal = new bootstrap.Modal(document.getElementById('modalProductEdit'), {
        keyboard: false
    })
    const product = store.getById(`${id}`);
    if(product) {
        document.getElementById('prodId').value = product.id;
        document.getElementById('prodName').value = product.name;
        document.getElementById('prodDescription').value = product.description;
        document.getElementById('prodImage').value = product.image;
        document.getElementById('prodPrice').value = product.price;
    }
    myModal.show();
}

function isValidURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

function validate({id,name,price,description,image}){
    let error = [];
    if(id==''|| isNaN(id)){
        error.push('id is invalid')
    }
    if(name==''){
        error.push('name is not empty')
    }
    if(price==''|| isNaN(price)){
        error.push('price is invalid')
    }
    if(description==''){
        error.push('desciption is invalid')
    }
    if(image==''||!isValidURL(image)){
        const extent = image.split('.').pop()
        const allowImage = ['.jpj','.jpeg','.png','.gif','.bmp']
        if(!allowImage.includes(extent)){
        error.push('image is not image link')
        }
    }
    return error
}
document.getElementById('btn-tang').addEventListener('click', function(e) {
    store.sxgia(true);
    store.save();
    renderTable(store.getProduct());
})

document.getElementById('btn-giam').addEventListener('click', function(e) {
    store.sxgia(false);
    store.save();
    renderTable(store.getProduct());
})