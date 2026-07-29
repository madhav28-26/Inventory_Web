let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;


const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");

addBtn.addEventListener("click", addProduct);
displayProducts();

function addProduct()
{
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let category = document.getElementById("category").value;

    if(id=="" || name=="" || price=="" || quantity=="" || category=="")
    {
        alert("Please fill all fields");
        return;
    }

    // Agar Edit Mode me hai
    if(editIndex != -1)
    {
        products[editIndex].id = id;
        products[editIndex].name = name;
        products[editIndex].price = price;
        products[editIndex].quantity = quantity;
        products[editIndex].category = category;

        editIndex = -1;

        addBtn.innerHTML = "Add Product";

        displayProducts();
        clearFields();

        return;
    }

    // Duplicate ID Check
    let exists = products.find(product => product.id == id);

    if(exists)
    {
        alert("Product ID already exists");
        return;
    }

    let product = {
        id,
        name,
        price,
        quantity,
        category
    };

    products.push(product);

    displayProducts();

    clearFields();
}

function displayProducts()
{
    tableBody.innerHTML = "";

    products.forEach(product => {

        tableBody.innerHTML += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.category}</td>
            <td>
            <button onclick="editProduct(${product.id})">✏ Edit</button>
            <button onclick="deleteProduct(${product.id})">🗑 Delete</button>
            </td>
        </tr>
        `;

    });

    // Dashboard Update
let totalStock = 0;
let lowStock = 0;
let inventoryValue = 0;

products.forEach(product => {

    totalStock += Number(product.quantity);

    inventoryValue += Number(product.price) * Number(product.quantity);

    if(Number(product.quantity) < 5)
    {
        lowStock++;
    }
});

document.getElementById("totalProducts").innerHTML = products.length;
document.getElementById("totalStock").innerHTML = totalStock;
document.getElementById("lowStock").innerHTML = lowStock;
document.getElementById("inventoryValue").innerHTML = "₹" + inventoryValue;

localStorage.setItem("products", JSON.stringify(products));
}

function clearFields()
{
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("category").value = "";
}

function deleteProduct(id)
{
    products = products.filter(product => product.id != id);

    displayProducts();
}

function editProduct(id)
{
    editIndex = products.findIndex(product => product.id == id);

    document.getElementById("id").value = products[editIndex].id;
    document.getElementById("name").value = products[editIndex].name;
    document.getElementById("price").value = products[editIndex].price;
    document.getElementById("quantity").value = products[editIndex].quantity;
    document.getElementById("category").value = products[editIndex].category;

    addBtn.innerHTML = "Update Product";
}