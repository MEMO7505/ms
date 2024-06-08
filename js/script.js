var productNameInput = document.getElementById("productNameInput")
var productPriceInput = document.getElementById("productPriceInput")
var productCategoryInput = document.getElementById("productCategoryInput")
var productDescInput = document.getElementById("productDescInput")
var addUpdateBtn = document.getElementById("addUpdateBtn")
var cancelBtnContainer = document.getElementById("cancelBtnContainer")
var productsArr = JSON.parse(localStorage.getItem("products")) ?? [];
var searchInput = document.getElementById("searchInput")


displayProducts()

var updateMode = false
var mainIndex;

function addUpdateProduct() {


    if (!updateMode) {
        addProduct(getProduct())
    } else {
        updateProduct(getProduct())
        cancelBtnContainer.innerHTML = ""

    }

    onDataChange()
    clearForm()

}

function getProduct() {
    var Product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    return Product;
}

function addProduct(Product) {
    productsArr.push(Product);
}

function updateProduct(Product) {
    // productsArr.splice(mainIndex,1,Product)
    productsArr[mainIndex] = Product;
    addUpdateBtn.innerHTML = "Add Product"
    updateMode = false;
}

function displayProducts() {
    var cartoona = ""
    for (var i = 0; i < productsArr.length; i++) {
        cartoona += `
        <tr>
            <td>${i}</td>
            <td>${productsArr[i].name}</td>
            <td>${productsArr[i].price}</td>
            <td>${productsArr[i].category}</td>
            <td>${productsArr[i].desc}</td>
            <td><button onclick="patchValues(${i} )" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>
        
        `

    }
    document.getElementById("tableBody").innerHTML = cartoona

}


function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function onDataChange() {
    localStorage.setItem("products", JSON.stringify(productsArr))
    displayProducts()
}

function clearData() {
    localStorage.clear()
    window.location.reload();
    // onDataChange()
}

function deleteProduct(index) {
    productsArr.splice(index, 1)
    onDataChange()
    console.log(productsArr);
}

function patchValues(index) {
    mainIndex = index;
    updateMode = true
    productNameInput.value = productsArr[index].name;
    productPriceInput.value = productsArr[index].price;
    productCategoryInput.value = productsArr[index].category;
    productDescInput.value = productsArr[index].desc;

    addUpdateBtn.innerHTML = "Update Product"

    cancelBtnContainer.innerHTML = `<button type="button" onclick="cancel()" id="cancelBtn" class="btn btn-outline-danger my-5">Cancel</button>`
}

function cancel() {
    clearForm()
    addUpdateBtn.innerHTML = "Add Product"
    cancelBtnContainer.innerHTML = ""
    updateMode = false
}
