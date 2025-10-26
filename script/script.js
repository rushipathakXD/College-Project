let products = {
    data: [
      {
        productName: "pottasium nitrate",
        category: "Food&PharmaProducts",
        price: "50",
      },
      {
        productName: "Benzoic acid",
        category: "Food&PharmaProducts",
        price: "49",
      },
      {
        productName: "Baking soda",
        category: "Backrey",
        price: "30",
      },
      {
        productName: "Dry ice ",
        category: "Backrey",
        price: "30",
      },
      {
        productName: "sodium benzoate ",
        category: "Food&PharmaProducts",
        price: "129",
      },
      {
        productName: "formaldehyde",
        category: "CosmaticProduct",
        price: "89",
      },
      {
        productName: "pottasium sorbate",
        category: "Backrey",
        price: "50",
      },
      {
        productName: "petrolatum",
        category: "CosmaticProduct",
        price: "49",
      },
      {
        productName: "chlorine Dioxide",
        category: "Biocides",
        price: "54",
      },
      {
        productName: "hydrogen peroxide",
        category: "Biocides",
        price: "45",
      },
      {
        productName: "Gum arabic. GG",
        category: "Encapsulations&DCGrade",
        price: "65",
      },
      {
        productName: "EMC Ethyl methylcellulose. GA.",
        category: "Encapsulations&DCGrade",
        price: "45",
      },
      {
        productName: "ferrous fumarate",
        category: "IronSupplements",
        price: "56",
      },
      {
        productName: "ferrous gluconate",
        category: "IronSupplements",
        price: "78",
      },
      {
        productName: "ferrous succinate",
        category: "IronSupplements",
        price: "89",
      },
      {
        productName: "Erythorbic Acid.",
        category: "FeedProducts",
        price: "34",
      },
      {
        productName: "Benzoic acid",
        category: "FeedProducts",
        price: "23",
      },
      {
        productName: "Sodium Benzoate.",
        category: "FeedProducts",
        price: "67",
      },
      {
        productName: "Zinc iodide",
        category: "IodineDerivatives",
        price: "78",
      },
      {
        productName: "Pottasium iodate",
        category: "IodineDerivatives",
        price: "54",
      },
      {
        productName: "Nutraceuticals",
        category: "SpecialityChemicals",
        price: "34",
      },
      {
        productName: "Resins",
        category: "SpecialityChemicals",
        price: "44",
      },
      {
        productName: "Oil field chemicals",
        category: "SpecialityChemicals",
        price: "42",
      },


    ],
  };
  
  for (let [idx, i] of products.data.entries()) {
    //Create Card
    let card = document.createElement("div");
    card.classList.add("card", i.category, "hide");
    card.dataset.id = idx + 1; // unique id
    card.dataset.name = i.productName;
    card.dataset.price = i.price;
    //container
    let container = document.createElement("div");
    container.classList.add("container");
    //product name
    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);
    //price
    let price = document.createElement("h6");
    price.innerText = "₹" + i.price;
    container.appendChild(price);

    // Add to Cart button
    let addBtn = document.createElement("button");
    addBtn.innerText = "Add to Cart";
    addBtn.className = "add-to-cart-btn";
    addBtn.onclick = function() {
      if (addBtn.classList.contains('added')) return;
      addBtn.innerHTML = '<span class="spinner"></span>Adding...';
      addBtn.disabled = true;
      setTimeout(() => {
        addToCart({
          id: idx + 1,
          name: i.productName,
          price: Number(i.price),
          qty: 1
        });
        addBtn.classList.add('added');
        addBtn.innerHTML = '✔ Added!';
        setTimeout(() => {
          addBtn.classList.remove('added');
          addBtn.innerText = 'Add to Cart';
          addBtn.disabled = false;
        }, 1200);
      }, 700);
    };
    container.appendChild(addBtn);

    card.appendChild(container);
    document.getElementById("products").appendChild(card);
  }
  
  //parameter passed from button (Parameter same as category)
  function filterProduct(value) {
    //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
      //check if value equals innerText
      if (value.toUpperCase() == button.innerText.toUpperCase()) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  
    //select all cards
    let elements = document.querySelectorAll(".card");
    //loop through all cards
    elements.forEach((element) => {
      //display all cards on 'all' button click
      if (value == "all") {
        element.classList.remove("hide");
      } else {
        //Check if element contains category class
        if (element.classList.contains(value)) {
          //display element based on category
          element.classList.remove("hide");
        } else {
          //hide other elements
          element.classList.add("hide");
        }
      }
    });
  }
  
  //Search button click
  document.getElementById("search").addEventListener("click", () => {
    //initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
  
    //loop through all elements
    elements.forEach((element, index) => {
      //check if text includes the search value
      if (element.innerText.includes(searchInput.toUpperCase())) {
        //display matching card
        cards[index].classList.remove("hide");
      } else {
        //hide others
        cards[index].classList.add("hide");
      }
    });
  });




  document.getElementById("search-input").addEventListener("keyup", () => {
    //initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
  
    //loop through all elements
    elements.forEach((element, index) => {
      //check if text includes the search value
      if (element.innerText.includes(searchInput.toUpperCase())) {
        //display matching card
        cards[index].classList.remove("hide");
      } else {
        //hide others
        cards[index].classList.add("hide");
      }
    });
  });


  
  //Initially display all products
  window.onload = () => {
    filterProduct("all");
  };

// --- User Auth & Per-User Cart/Orders logic using localStorage ---
function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function setCurrentUser(email) {
  localStorage.setItem('currentUser', email);
}

function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}

function getUserCartKey() {
  const user = getCurrentUser();
  return user ? `cart_${user}` : null;
}

function getUserOrdersKey() {
  const user = getCurrentUser();
  return user ? `orders_${user}` : null;
}

function getCart() {
  const key = getUserCartKey();
  if (!key) return [];
  let cart = localStorage.getItem(key);
  return cart ? JSON.parse(cart) : [];
}

function setCart(cart) {
  const key = getUserCartKey();
  if (key) localStorage.setItem(key, JSON.stringify(cart));
}

function addToCart(product) {
  if (!getCurrentUser()) {
    showLoginPopup('Please login to add items to cart.');
    return;
  }
  let cart = getCart();
  let found = cart.find(item => item.id === product.id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push(product);
  }
  setCart(cart);
}

function getOrders() {
  const key = getUserOrdersKey();
  if (!key) return [];
  let orders = localStorage.getItem(key);
  return orders ? JSON.parse(orders) : [];
}

function setOrders(orders) {
  const key = getUserOrdersKey();
  if (key) localStorage.setItem(key, JSON.stringify(orders));
}

// Popup for login required
function showLoginPopup(msg) {
  if (document.getElementById('login-popup')) return;
  let popup = document.createElement('div');
  popup.id = 'login-popup';
  popup.style.position = 'fixed';
  popup.style.top = '0';
  popup.style.left = '0';
  popup.style.width = '100vw';
  popup.style.height = '100vh';
  popup.style.background = 'rgba(0,0,0,0.4)';
  popup.style.display = 'flex';
  popup.style.justifyContent = 'center';
  popup.style.alignItems = 'center';
  popup.style.zIndex = '9999';
  popup.innerHTML = `<div style="background:#fff;padding:32px 40px;border-radius:18px;box-shadow:0 4px 24px #0002;text-align:center;max-width:90vw;">
    <h3 style='color:#6759ff;margin-bottom:12px;'>Login Required</h3>
    <p style='color:#333;margin-bottom:18px;'>${msg||'Please login to continue.'}</p>
    <a href="../pages/account.html" style="padding:10px 28px;background:#ffc034;color:#fff;border-radius:50px;text-decoration:none;font-weight:600;">Go to Login</a>
    <br><br><button onclick="document.getElementById('login-popup').remove()" style="margin-top:8px;padding:6px 18px;border-radius:8px;border:none;background:#eee;cursor:pointer;">Close</button>
  </div>`;
  document.body.appendChild(popup);
}
  //add new code
let cart = [];

// Block cart/orders page if not logged in
function blockIfNotLoggedInCartOrders() {
  if (!getCurrentUser()) {
    showLoginPopup('You must login to view your cart or orders.');
    return true;
  }
  return false;
}

// --- Example: block on cart/orders page load ---
if (window.location.pathname.includes('cart.html') || window.location.pathname.includes('orders.html')) {
  blockIfNotLoggedInCartOrders();
}

// --- Cart page logic (if present) ---
// (You may need to move this to cart.js if you split files)
// ...existing code...

// --- Login/Signup logic: set currentUser ---
// (You may need to adapt this if your login/signup is in another file)
window.setCurrentUser = setCurrentUser;
window.clearCurrentUser = clearCurrentUser;

// On login success: setCurrentUser(email)
// On logout: clearCurrentUser()

// --- Orders logic: use getOrders/setOrders for per-user orders ---
// ...existing code...
