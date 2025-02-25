let products = [];
const cart = {};
let users = [];
let user = {};
let orders = [];

const addToCart = (id) => {
  if (!cart[id]) {
    cart[id] = 1;
  } else {
    cart[id] += 1;
  }     
  showCart();
};

const increment = (id) => {
  if (!cart[id]) cart[id] = 0;
  cart[id] += 1;
  showCart();
};

const decrement = (id) => {
  if (cart[id]) {
    cart[id] -= 1;
    if (cart[id] < 1) delete cart[id];
  }
  showCart();
};

const showTotal = () => {
  let total = products.reduce((sum, value) => {
    return sum + value.price * (cart[value.id] ? cart[value.id] : 0);
  }, 0);
  document.getElementById("divTotal").innerHTML = `Order Value: $${total}`;
};

const placeOrder = () => {
//   if (!user.email) {
//     alert("Please log in to place an order.");
//     return;
//   }

//   if (Object.keys(cart).length === 0) {
//     alert("Cart is empty. Add items before placing an order.");
//     return;
//   }

  let orderItems = [];
  let total = 0;

  products.forEach((product) => {
    if (cart[product.id]) {
      orderItems.push({
        name: product.name,
        price: product.price,
        quantity: cart[product.id],
        total: product.price * cart[product.id],
      });
      total += product.price * cart[product.id];
    }
  });

  let order = {
    email: user.email,
    items: orderItems,
    orderValue: total,
    date: new Date().toLocaleString(),
  };

  orders.push(order);
  console.log("Order Placed:", order);
  alert("Order placed successfully!");

   Object.keys(cart).forEach((key) => delete cart[key]);
   showCart();
};
const showOrders=() =>{
divProducts.innerHTML=;
}
const showMain = () => {
  let str = `
  <div class="container">
      <div class="header">
        <h1>My Store - <span id="userName">${user.name || ""}</span></h1>
        <div>
        <div onclick='showOrders()'>Orders</div>
          <h4 onclick="displayCart()">Cart: <span id="items"></span></h4>
          <button onclick='showLogin()'>Logout</button>
        </div>
      </div>
      <div class="productBlock">
        <div id="divProducts"></div>
      </div>
      <div id="divCartBlock" class="cartBlock">
        <h3>My Cart</h3>
        <div id="divCart"></div> 
        <div id="divTotal"></div>
        <button onclick="hideCart()">Close</button>
      </div>
      <hr>
      <h4>&copy; 2025. All rights reserved.</h4>
  </div>`;
  document.getElementById("root").innerHTML = str;
  showProducts();
};

const showCart = () => {
  let str = "";
  products.forEach((value) => {
    if (cart[value.id]) {
      str += `
        <li>${value.name} - $${value.price} 
        <button onclick='decrement(${value.id})'>-</button>
        ${cart[value.id]}
        <button onclick='increment(${value.id})'>+</button>
        - $${value.price * cart[value.id]}</li>`;
    }
  });

  document.getElementById("divCart").innerHTML = str;
  let count = Object.keys(cart).length;
  document.getElementById("items").innerHTML = count;
  showTotal();
  if (count > 0) {
    document.getElementById("divCart").innerHTML += `<button onclick="placeOrder()">Place Order</button>`;
  }
};

const displayCart = () => {
  document.getElementById("divCartBlock").style.left = "80%";
};

const hideCart = () => {
  document.getElementById("divCartBlock").style.left = "100%";
};

function showLogin() {
  let str = `
  <div class='login'>
      <h2>Login Form</h2>
      <div id='msg'></div>
      <p><input id="email" type="text" placeholder="Email"></p>
      <p><input id="password" type="password" placeholder="Password"></p>
      <button onclick='chkUser()'>Log In</button>
      <p><button onclick='showForm()'>Create Account</button></p>
  </div>`;
  document.getElementById("root").innerHTML = str;
}

function showForm() {
  let str = `<div class="registration">
  <h2>Registration Form</h2>
  <p><input type="text" id="name" placeholder="Name"></p>
  <p><input type="text" id="email" placeholder="Email"></p>
  <p><input type="password" id="password" placeholder="Password"></p>
  <p><input type="date" id="dob"></p>
  <p><button onclick='addUser()'>Submit</button></p>
  <p>Already a member? <button onclick='showLogin()'>Login Here</button></p>
  </div>`;
  document.getElementById("root").innerHTML = str;
}

function chkUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let msgDiv = document.getElementById("msg");

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      user = users[i];
      showMain();
      return;
    }
  }
  msgDiv.innerHTML = "Access Denied";
}

function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let newUser = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    balance: 0,
  };
  users.push(newUser);
  showLogin();
}

const showProducts = () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      let str = "<div class='row'>";
      products.forEach((value) => {
        str += `
          <div class='box'>
          <h3>${value.name}</h3>
          <p>${value.desc}</p>
          <h4>$${value.price}</h4>
          <button onclick="addToCart(${value.id})">Add to Cart</button>
          </div>`;
      });
      document.getElementById("divProducts").innerHTML = str + "</div>";
    });
};
