// loading api data
const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR12fGJbHmYg51TxCWHdyaGwIke4JZqwcLPPqU4gM5RTrRoMDqc_jPHrxY0`;

  fetch(url)

    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  /* array mapping method */
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add('product');
    div.innerHTML = `
    <div class="single-product card  rounded">
      <div class= "p-3">
        <img class="product-image" src="${product.image}"></img>
      </div>
      <div class="card-body">
        <h5 class="fw-bold text-success">${product.title}</h5>
        <p class="fw-bold text-secondary">Category: ${product.category}</p>
        <p>
        <span class= "fw-bold text-secondary">${product.rating.count} People rated this product</span>
        </p>
        <p class="fw-bold text-secondary">Avg rating:
          <span>${product.rating.rate}</span> 
        </p>
        <h5 class="fw-bold text-danger">Price: $ ${product.price}</h5>
        
        <div class="card-btn mt-3">
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn"  class="buy-now btn btn-outline-success"><i class="fas fa-shopping-cart px-1"></i>add to cart</button>
          <button onclick="loadSingleProduct(${product.id})" id="details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-outline-danger">Details</button>
        </div>

      </div>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Product Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div id= "modal-body" class="modal-body">
 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>


      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.abs(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.abs(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

/* loading singile product api */
const loadSingleProduct = (productId) => {
  fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res=>res.json())
  .then(data=>displaySingleProduct(data))
  
}
/* Display single product function  */
const displaySingleProduct = (product) => {
  // console.log(product)
  const modalBody = document.getElementById('modal-body')
  modalBody.innerHTML = `
  <div class= "p-3">
  <img class="product-image" src="${product.image}"></img>
</div>
<div class="card-body">
  <h5 class="fw-bold fw-bold text-success">${product.title}</h5>
  <p class="fw-bold text-secondary">Category: ${product.category}</p>
  <p>
  <span class= "fw-bold text-secondary">${product.rating.count} People rated this product</span>
  </p>
  <p class="fw-bold text-secondary">Avg rating:
    <span>${product.rating.rate}</span> 
  </p>
  <h5 class="fw-bold text-danger">Price: $ ${product.price}</h5>
  
  `;
};

