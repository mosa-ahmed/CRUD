

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");
var productList;
var updateIndex;

productModel.value = "";

productList = localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : [];
displayProducts(productList);

function addProduct(){
    if (validateProductName() && validateProductPrice() && validateProductModel() && validateProductDesc()){
    var product = {
        name: productName.value,
        price: productPrice.value,
        model: productModel.value,
        desc: productDesc.value
    }
    productList.push(product);
    displayProducts(productList);
    updateFormValues();
    localStorage.setItem("productList", JSON.stringify(productList));

    console.log(productList)
    }
    else{
        validateProductModel();
        validateProductDesc();
        validateProductPrice();
    }
}

function updateFormValues(flag){
    productName.value = flag ? flag.name : "";
    productPrice.value = flag ? flag.price : "";
    productModel.value = flag ? flag.model : "";
    productDesc.value = flag ? flag.desc : "";
}

function displayProducts(products){
    var box = ``;
    for(var i = 0; i < products.length; i++){
        box += `  <tr>
        <td>${i + 1}</td>
        <td>${products[i].newName ? products[i].newName : products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].model}</td>
        <td>${products[i].desc}</td>
        <td><button onclick= "getUpdatedProduct(${i})" class="btn btn-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
    </tr>`
    }

    document.getElementById("tBody").innerHTML = box;
    console.log(products);
}

function deleteProduct(index){
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProducts(productList);
}

function searchByName(term){
    var foundedItems = [];
    for(var i = 0; i < productList.length; i++)
    {
        if(productList[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            console.log(productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`));
            console.log(productList[i])
            foundedItems.push(productList[i]);
        }
    }
    console.log(productList)
    displayProducts(foundedItems);
}

function getUpdatedProduct(index){
    addProductBtn.classList.add("d-none");
    updateProductBtn.classList.replace("d-none", "d-block");
    
    updateFormValues(productList[index]);

    updateIndex = index;
}

function updateProduct(){
    addProductBtn.classList.replace("d-none", "d-block");
    updateProductBtn.classList.replace("d-block", "d-none");

    var product = {
        name: productName.value,
        price: productPrice.value,
        model: productModel.value,
        desc: productDesc.value
    }
    productList.splice(updateIndex, 1, product);
    localStorage.setItem("productList", JSON.stringify(productList));

    displayProducts(JSON.parse(localStorage.getItem("productList")) );
    updateFormValues();
}

function validateProductName(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productName.value)){
        productName.style.border = "none";
        document.getElementById("wrongName").classList.add("d-none");
        return true
    }else{
        productName.style.border = "solid 3px red";
        document.getElementById("wrongName").classList.remove("d-none");
        return false
    }
}

function validateProductPrice(){
    var regex = /^([1-9][0-9]{3}|10000)$/;
    if (regex.test(productPrice.value)){
        productPrice.style.border = "none";
        document.getElementById("wrongPrice").classList.add("d-none");
        return true
    }else{
        productPrice.style.border = "solid 3px red";
        document.getElementById("wrongPrice").classList.remove("d-none");
        return false
    }
}

function validateProductModel(){
    var regex = /^(Mobile|TV|Screen|Laptop)$/;
    if (regex.test(productModel.value)){
        productModel.style.border = "none";
        document.getElementById("wrongModel").classList.add("d-none");
        return true
    }else{
        productModel.style.border = "solid 3px red";
        document.getElementById("wrongModel").classList.remove("d-none");
        return false
    }
}

function validateProductDesc(){
    var regex = /^[a-zA-Z]{1}[a-zA-Z0-9. ]{24,}$/;
    if (regex.test(productDesc.value)){
        productDesc.style.border = "none";
        document.getElementById("wrongDesc").classList.add("d-none");
        return true
    }else{
        productDesc.style.border = "solid 3px red";
        document.getElementById("wrongDesc").classList.remove("d-none");
        return false
    }
}