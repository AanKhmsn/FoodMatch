document.addEventListener("DOMContentLoaded", function () {
  // Initialize page
  initializeApp();

  // Login/Register Tabs
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginTab && registerTab) {
    loginTab.addEventListener("click", function () {
      loginTab.classList.add("active");
      registerTab.classList.remove("active");
      loginForm.classList.add("active");
      registerForm.classList.remove("active");
    });

    registerTab.addEventListener("click", function () {
      registerTab.classList.add("active");
      loginTab.classList.remove("active");
      registerForm.classList.add("active");
      loginForm.classList.remove("active");
    });
  }
});

// Login Form Submission
const loginFormElement = document.getElementById("login");
if (loginFormElement) {
  loginFormElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const today = new Date().toISOString().split("T")[0];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      alert("akun tdak ditemukan, silahkan daftar terlebih dahulu!.");
      registerTab.click();
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert(`👋 Selamat datang kembali, ${user.username}!`);
    window.location.href = "dashboard.html";
  });
}

// Register Form Submission
const registerFormElement = document.getElementById("register");
if (registerFormElement) {
  registerFormElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("registerfullname").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value;
    const pass2 = document.getElementById("registerPasswordConfirm").value;

    if (password !== pass2) {
      alert("Password dan konfirmasi password tidak sesuai.");
      return;
    }

    // Ambil daftar user dari localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Cek apakah username atau email sudah digunakan
    const userExists = users.find(
      (u) => u.username === username || u.email === email
    );
    if (userExists) {
      alert("⚠️ Username atau email sudah terdaftar. Gunakan yang lain.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    // Simpan user baru
    const newUser = {
      username,
      fullname,
      email,
      password,
      isMember: false,
      searchCount: 0,
      lastSearchDate: new Date().toISOString().split("T")[0],
      favorites: [],
      recipes: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registrasi berhasil! Silakan login dengan akun Anda.");
    loginTab.click();
  });
}

// Database of recipes with their ingredients
const recipeDatabase = [
  {
    name: "Tumis Sayuran Sederhana",
    time: 20,
    difficulty: "Mudah",
    mainIngredients: [
      "sayuran",
      "wortel",
      "kacang panjang",
      "buncis",
      "bayam",
      "kangkung",
    ],
    ingredients: [
      "Sayuran yang tersedia (wortel, kacang panjang, buncis, bayam, atau kangkung)",
      "2 siung bawang putih, cincang",
      "1/2 bawang bombay, cincang",
      "Garam dan merica secukupnya",
      "Minyak untuk menumis",
    ],
    steps: [
      "Panaskan minyak dalam wajan.",
      "Tumis bawang putih dan bawang bombay hingga harum.",
      "Masukkan sayuran, aduk rata.",
      "Bumbui dengan garam dan merica secukupnya.",
      "Masak hingga sayuran matang.",
      "Angkat dan sajikan.",
    ],
  },
  {
    name: "Sup Ayam Wortel",
    time: 40,
    difficulty: "Mudah",
    mainIngredients: ["ayam", "wortel"],
    ingredients: [
      "500g ayam, potong kecil-kecil",
      "2 wortel, iris",
      "1 batang seledri, iris",
      "1 bawang bombay, cincang",
      "2 siung bawang putih, cincang",
      "1,5 liter air",
      "Garam dan merica secukupnya",
      "Minyak untuk menumis",
    ],
    steps: [
      "Panaskan minyak dalam panci, tumis bawang bombay dan bawang putih hingga harum.",
      "Masukkan ayam, masak hingga berubah warna.",
      "Tuang air, masak hingga mendidih dan ayam empuk.",
      "Masukkan wortel dan seledri, masak hingga sayuran matang.",
      "Bumbui dengan garam dan merica secukupnya.",
      "Angkat dan sajikan hangat.",
    ],
  },
  {
    name: "Telur Dadar Sederhana",
    time: 15,
    difficulty: "Mudah",
    mainIngredients: ["telur"],
    ingredients: [
      "3 butir telur",
      "1 siung bawang putih, cincang",
      "1/2 bawang bombay, cincang",
      "Garam dan merica secukupnya",
      "Minyak untuk menggoreng",
    ],
    steps: [
      "Kocok telur dalam mangkuk.",
      "Tambahkan bawang putih, bawang bombay, garam, dan merica. Aduk rata.",
      "Panaskan minyak dalam wajan.",
      "Tuang telur ke dalam wajan, masak hingga matang.",
      "Angkat dan sajikan.",
    ],
  },
  {
    name: "Nasi Goreng Sederhana",
    time: 20,
    difficulty: "Mudah",
    mainIngredients: ["nasi", "telur"],
    ingredients: [
      "2 piring nasi putih",
      "2 butir telur",
      "2 siung bawang putih, cincang",
      "3 siung bawang merah, cincang",
      "Garam, merica, dan kecap secukupnya",
      "Minyak untuk menumis",
    ],
    steps: [
      "Panaskan minyak dalam wajan.",
      "Tumis bawang merah dan bawang putih hingga harum.",
      "Masukkan telur, orak-arik hingga matang.",
      "Masukkan nasi, aduk rata.",
      "Bumbui dengan garam, merica, dan kecap secukupnya.",
      "Masak hingga semua bahan tercampur rata dan matang.",
      "Angkat dan sajikan.",
    ],
  },
  {
    name: "Mie Goreng Sayuran",
    time: 25,
    difficulty: "Sedang",
    mainIngredients: ["mie", "sayur"],
    ingredients: [
      "2 bungkus mie instan",
      "Sayuran yang tersedia (wortel, kol, daun bawang)",
      "2 siung bawang putih, cincang",
      "3 siung bawang merah, cincang",
      "Garam, merica, dan kecap secukupnya",
      "Minyak untuk menumis",
    ],
    steps: [
      "Rebus mie hingga setengah matang, tiriskan.",
      "Panaskan minyak dalam wajan.",
      "Tumis bawang merah dan bawang putih hingga harum.",
      "Masukkan sayuran, masak hingga layu.",
      "Masukkan mie, aduk rata.",
      "Bumbui dengan garam, merica, dan kecap secukupnya.",
      "Masak hingga semua bahan tercampur rata dan matang.",
      "Angkat dan sajikan.",
    ],
  },
  {
    name: "Perkedel Kentang",
    time: 30,
    difficulty: "Sedang",
    mainIngredients: ["kentang"],
    ingredients: [
      "500g kentang, kukus dan haluskan",
      "1 butir telur",
      "2 siung bawang merah, haluskan",
      "1 siung bawang putih, haluskan",
      "Seledri cincang",
      "Garam dan merica secukupnya",
      "Minyak untuk menggoreng",
    ],
    steps: [
      "Campur kentang halus dengan bawang merah, bawang putih, seledri, garam, dan merica.",
      "Bentuk adonan menjadi bulatan pipih.",
      "Kocok lepas telur dalam mangkuk.",
      "Celupkan perkedel ke dalam telur kocok.",
      "Goreng dalam minyak panas hingga kuning kecokelatan.",
      "Angkat dan tiriskan.",
      "Sajikan hangat.",
    ],
  },
  {
    name: "Sate Tahu",
    time: 25,
    difficulty: "Mudah",
    mainIngredients: ["tahu"],
    ingredients: [
      "5 buah tahu, potong kotak",
      "10 tusuk sate",
      "2 siung bawang putih, haluskan",
      "1 sdt ketumbar, haluskan",
      "Garam dan merica secukupnya",
      "Minyak untuk menggoreng",
      "Bumbu kacang (sesuai selera)",
    ],
    steps: [
      "Campur tahu dengan bawang putih, ketumbar, garam, dan merica. Diamkan 15 menit.",
      "Tusuk tahu dengan tusuk sate.",
      "Panaskan minyak dalam wajan.",
      "Goreng sate tahu hingga kuning kecokelatan.",
      "Angkat dan tiriskan.",
      "Sajikan dengan bumbu kacang.",
    ],
  },
  {
    name: "Capcay Sederhana",
    time: 25,
    difficulty: "Mudah",
    mainIngredients: ["sayuran", "wortel", "kol", "buncis"],
    ingredients: [
      "Sayuran campur (wortel, kol, buncis, jamur)",
      "2 siung bawang putih, cincang",
      "1/2 bawang bombay, cincang",
      "1 sdm saus tiram",
      "Garam, merica, dan gula secukupnya",
      "Minyak untuk menumis",
    ],
    steps: [
      "Panaskan minyak dalam wajan.",
      "Tumis bawang putih dan bawang bombay hingga harum.",
      "Masukkan sayuran yang keras terlebih dahulu (wortel, buncis).",
      "Setelah setengah matang, masukkan sayuran yang lunak (kol, jamur).",
      "Tambahkan saus tiram, garam, merica, dan gula. Aduk rata.",
      "Masak hingga sayuran matang.",
      "Angkat dan sajikan.",
    ],
  },
  {
    name: "Tempe Goreng Tepung",
    time: 20,
    difficulty: "Mudah",
    mainIngredients: ["tempe"],
    ingredients: [
      "1 papan tempe, potong tipis",
      "100g tepung terigu",
      "2 siung bawang putih, haluskan",
      "1/2 sdt ketumbar, haluskan",
      "Garam dan merica secukupnya",
      "Air secukupnya",
      "Minyak untuk menggoreng",
    ],
    steps: [
      "Campur tepung terigu dengan bawang putih, ketumbar, garam, dan merica.",
      "Tambahkan air sedikit demi sedikit hingga adonan kental.",
      "Celupkan potongan tempe ke dalam adonan tepung.",
      "Panaskan minyak dalam wajan.",
      "Goreng tempe hingga kuning kecokelatan.",
      "Angkat dan tiriskan.",
      "Sajikan hangat dengan cabai rawit.",
    ],
  },
  {
    name: "Omelet Sayuran",
    time: 15,
    difficulty: "Mudah",
    mainIngredients: ["telur", "sayuran"],
    ingredients: [
      "3 butir telur, kocok lepas",
      "Sayuran cincang (wortel, buncis, kol)",
      "2 siung bawang putih, cincang",
      "1/2 bawang bombay, cincang",
      "Garam dan merica secukupnya",
      "Minyak untuk menggoreng",
    ],
    steps: [
      "Panaskan minyak dalam wajan.",
      "Tumis bawang putih dan bawang bombay hingga harum.",
      "Masukkan sayuran cincang, masak hingga layu.",
      "Tuang telur kocok di atasnya.",
      "Masak hingga telur matang.",
      "Bumbui dengan garam dan merica.",
      "Lipat omelet dan angkat.",
      "Sajikan hangat.",
    ],
  },
];

// Recent recipes database - now dynamic from localStorage
let recentRecipes = [];

// Initialize kitchen recipes from localStorage or default
function initializeKitchenRecipes() {
  const stored = localStorage.getItem("kitchenRecipes");
  if (stored) {
    recentRecipes = JSON.parse(stored);
  } else {
    // Default recipes
    recentRecipes = [
      {
        name: "Nasi Goreng Spesial",
        time: 30,
        difficulty: "Mudah",
        ingredients: [
          "2 piring nasi putih",
          "2 butir telur",
          "100g daging ayam, potong kecil",
          "3 siung bawang merah, cincang",
          "2 siung bawang putih, cincang",
          "2 batang daun bawang, iris",
          "3 sdm kecap manis",
          "1 sdm saus tiram",
          "Garam dan merica secukupnya",
          "Minyak untuk menumis",
        ],
        steps: [
          "Panaskan minyak dalam wajan, tumis bawang merah dan bawang putih hingga harum.",
          "Masukkan daging ayam, masak hingga berubah warna.",
          "Masukkan telur, orak-arik hingga matang.",
          "Masukkan nasi, aduk rata.",
          "Tambahkan kecap manis, saus tiram, garam, dan merica. Aduk rata.",
          "Masukkan daun bawang, aduk sebentar.",
          "Masak hingga semua bahan tercampur rata dan matang.",
          "Angkat dan sajikan dengan telur mata sapi dan kerupuk.",
        ],
        image:
          "https://asset.kompas.com/crops/VcgvggZKE2VHqIAUp1pyHFXXYCs=/202x66:1000x599/1200x800/data/photo/2023/05/07/6456a450d2edd.jpg",
      },
      {
        name: "Mie Ayam Rumahan",
        time: 45,
        difficulty: "Sedang",
        ingredients: [
          "200g mie kuning, rebus hingga matang",
          "200g daging ayam, potong kecil",
          "3 siung bawang putih, cincang",
          "2 cm jahe, memarkan",
          "2 batang daun bawang, iris",
          "2 sdm kecap manis",
          "1 sdm minyak wijen",
          "Garam, merica, dan gula secukupnya",
          "Kaldu ayam secukupnya",
          "Minyak untuk menumis",
          "Bawang goreng untuk taburan",
        ],
        steps: [
          "Panaskan minyak, tumis bawang putih dan jahe hingga harum.",
          "Masukkan daging ayam, masak hingga berubah warna.",
          "Tambahkan kecap manis, minyak wijen, garam, merica, dan gula. Aduk rata.",
          "Tuang kaldu ayam, masak hingga ayam empuk.",
          "Masukkan daun bawang, aduk sebentar.",
          "Sajikan mie dalam mangkuk, tuang kuah ayam di atasnya.",
          "Taburi dengan bawang goreng.",
        ],
        image:
          "https://cnc-magazine.oramiland.com/parenting/original_images/resep_mie_ayam_rumahan_praktis_dan_enak_2.jpg",
      },
      {
        name: "Sayur Sop Bening",
        time: 25,
        difficulty: "Mudah",
        ingredients: [
          "1 wortel, iris",
          "1 kentang, potong kotak",
          "1/2 buncis, potong-potong",
          "50g kembang kol, potong kecil",
          "2 siung bawang putih, cincang",
          "1 cm jahe, memarkan",
          "1.5 liter air",
          "Garam, merica, dan gula secukupnya",
          "Seledri untuk taburan",
          "Bawang merah goreng untuk taburan",
        ],
        steps: [
          "Didihkan air dalam panci.",
          "Masukkan bawang putih dan jahe.",
          "Masukkan wortel dan kentang, masak hingga setengah matang.",
          "Masukkan buncis dan kembang kol, masak hingga semua sayuran matang.",
          "Bumbui dengan garam, merica, dan gula secukupnya.",
          "Angkat dan sajikan hangat dengan taburan seledri dan bawang merah goreng.",
        ],
        image:
          "https://asset.kompas.com/crops/H_XI84PJ3ncIRUgTavITj6tPdpA=/1x0:1280x853/1200x800/data/photo/2022/10/04/633b5a997d22d.jpg",
      },
    ];
    localStorage.setItem("kitchenRecipes", JSON.stringify(recentRecipes));
  }
}

// Save kitchen recipes to localStorage
function saveKitchenRecipes() {
  localStorage.setItem("kitchenRecipes", JSON.stringify(recentRecipes));
}

// Load recent recipes for display
function loadRecentRecipes() {
  const container = document.querySelector(
    "#recipe-kitchen-page .recipe-cards"
  );
  if (!container) return;

  if (recentRecipes.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <i class="fas fa-book"></i>
      <h3>Belum ada resep di Dapur Resep</h3>
      <p>Upload resep dari Resep Saya untuk menambahkannya ke sini.</p>
    </div>`;
  } else {
    container.innerHTML = "";
    recentRecipes.forEach((recipe) => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" />
        <div class="recipe-info">
          <h4>${recipe.name}</h4>
          <p>${recipe.time} menit • ${recipe.difficulty}</p>
        </div>
      `;
      card.addEventListener("click", () => showRecentRecipe(recipe.name));
      container.appendChild(card);
    });
  }
}

// Initialize app
function initializeApp() {
  // Initialize kitchen recipes
  initializeKitchenRecipes();
  loadRecentRecipes();

  // Check if we're on dashboard page
  if (document.getElementById("home-page")) {
    // Setup menu navigation
    setupMenuNavigation();

    // Setup ingredients form
    setupIngredientsForm();

    // Setup recipe upload form
    setupRecipeUploadForm();

    // Setup logout button
    setupLogoutButton();

    //setup member page
    setupMembershipPage();

    // Load favorites and user recipes
    loadFavorites();
    loadUserRecipes();

    //update user status
    updateUserStatusUI();
  }
}
// user data management
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}
function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const idx = users.findIndex((u) => u.username === user.username);
  if (idx !== -1) {
    users[idx] = user;
    localStorage.setItem("users", JSON.stringify(users));
    updateUserStatusUI();
  }
}
function updateUserStatusUI() {
  const user = getCurrentUser();
  const sidebarName = document.getElementById("sidebarUsername");
  const memberStatus = document.getElementById("memberStatus");

  if (sidebarName) sidebarName.textContent = user ? user.username : "User";
  if (memberStatus)
    memberStatus.textContent =
      user && user.isMember ? "status: Member" : "status: Non-Member";
}
// Setup menu navigation
function setupMenuNavigation() {
  const menuItems = document.querySelectorAll(".menu li");
  const pages = document.querySelectorAll(".page");

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const pageName = this.getAttribute("data-page");
      const user = getCurrentUser();

      // lock some page for non-members
      if (
        (pageName === "favorites" || pageName === "my-recipes") &&
        (!user || !user.isMember)
      ) {
        alert(
          "Halaman ini hanya untuk member. Silakan daftar menjadi member terlebih dahulu."
        );
        showPage("membership");
        return;
      }

      menuItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      pages.forEach((page) => {
        page.id === `${pageName}-page`
          ? page.classList.add("active")
          : page.classList.remove("active");
      });
    });
  });
}
function showPage(pageName) {
  const menuItems = document.querySelectorAll(
    `.menu li[data-page="${pageName}"]`
  );
  if (menuItems.length > 0) menuItems[0].click();
}

// Setup ingredients form
function setupIngredientsForm() {
  const ingredientsForm = document.getElementById("ingredientsForm");
  if (ingredientsForm) {
    ingredientsForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        alert("⚠️ Anda harus login terlebih dahulu!");
        window.location.href = "index.html";
        return;
      }

      // Cek batas pencarian harian
      const today = new Date().toISOString().split("T")[0];
      if (currentUser.lastSearchDate !== today) {
        currentUser.lastSearchDate = today;
        currentUser.searchCount = 0;
      }

      if (!currentUser.isMember && currentUser.searchCount >= 3) {
        alert(
          "🚫 Anda sudah mencapai batas pencarian (3 kali per hari). Silakan beli membership untuk akses tanpa batas."
        );
        window.location.href = "dashboard.html#membership-page";
        return;
      }

      // Tambahkan jumlah pencarian
      currentUser.searchCount += 1;

      // Simpan ke localStorage
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // Update juga data di daftar user
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(
        (u) => u.username === currentUser.username
      );
      if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
      const ingredientsInput = document.getElementById("ingredientsInput");
      const ingredients = ingredientsInput.value.toLowerCase();

      // Show loading state
      const recipeSection = document.getElementById("recipeSection");
      recipeSection.style.display = "block";
      recipeSection.innerHTML = `
                <div class="card">
                    <div class="loading">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Sedang mencari resep yang cocok...</p>
                    </div>
                </div>
            `;

      // Scroll to recipe section
      recipeSection.scrollIntoView({ behavior: "smooth" });

      // Simulate loading delay
      setTimeout(() => {
        // Generate recipe based on ingredients
        generateRecipe(ingredients);
      }, 1500);
    });
  }
}

// Setup recipe upload form
function setupRecipeUploadForm() {
  const uploadRecipeForm = document.getElementById("uploadRecipeForm");
  if (uploadRecipeForm) {
    uploadRecipeForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const recipeName = document.getElementById("recipeNameInput").value;
      const recipeTime = document.getElementById("recipeTimeInput").value;
      const recipeDifficulty = document.getElementById(
        "recipeDifficultyInput"
      ).value;
      const recipeIngredients = document.getElementById(
        "recipeIngredientsInput"
      ).value;
      const recipeSteps = document.getElementById("recipeStepsInput").value;
      const recipeImage = document.getElementById("recipeImageInput").files[0];

      // Create recipe object
      const recipe = {
        id: Date.now(),
        name: recipeName,
        time: recipeTime,
        difficulty: recipeDifficulty,
        ingredients: recipeIngredients.split(",").map((i) => i.trim()),
        steps: recipeSteps.split(",").map((s) => s.trim()),
        image: recipeImage
          ? URL.createObjectURL(recipeImage)
          : `https://picsum.photos/seed/recipe${Date.now()}/300/200.jpg`,
        isFavorite: false,
        isUserRecipe: true,
      };

      // Save to localStorage
      saveUserRecipe(recipe);

      // Add to UI
      addUserRecipeToUI(recipe);

      // Reset form
      uploadRecipeForm.reset();

      // Show success message
      alert("Resep berhasil diupload!");

      // Switch to my recipes page
      document.querySelector('[data-page="my-recipes"]').click();
    });
  }
}

// Function to show recent recipe
function showRecentRecipe(recipeName) {
  const recipe = recentRecipes.find((r) => r.name === recipeName);
  if (!recipe) return;

  // Create modal
  const modal = document.createElement("div");
  modal.className = "recipe-modal";
  modal.style.position = "fixed";
  modal.style.zIndex = "1000";
  modal.style.left = "0";
  modal.style.top = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.overflow = "auto";
  modal.style.backgroundColor = "rgba(0,0,0,0.4)";

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.style.backgroundColor = "#fefefe";
  modalContent.style.margin = "5% auto";
  modalContent.style.padding = "20px";
  modalContent.style.border = "1px solid #888";
  modalContent.style.width = "90%";
  modalContent.style.maxWidth = "600px";
  modalContent.style.borderRadius = "8px";
  modalContent.style.position = "relative";

  // Create close button
  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.style.color = "#aaa";
  closeBtn.style.float = "right";
  closeBtn.style.fontSize = "28px";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.cursor = "pointer";
  closeBtn.textContent = "×";

  // Create card
  const card = document.createElement("div");
  card.className = "card";

  // Create recipe header
  const recipeHeader = document.createElement("div");
  recipeHeader.className = "recipe-header";

  const recipeTitle = document.createElement("h3");
  recipeTitle.textContent = recipe.name;

  const recipeMeta = document.createElement("div");
  recipeMeta.className = "recipe-meta";

  const timeSpan = document.createElement("span");
  timeSpan.innerHTML = `<i class="fas fa-clock"></i> ${recipe.time} menit`;

  const difficultySpan = document.createElement("span");
  difficultySpan.innerHTML = `<i class="fas fa-signal"></i> ${recipe.difficulty}`;

  recipeMeta.appendChild(timeSpan);
  recipeMeta.appendChild(difficultySpan);

  recipeHeader.appendChild(recipeTitle);
  recipeHeader.appendChild(recipeMeta);

  // Create recipe content
  const recipeContent = document.createElement("div");
  recipeContent.className = "recipe-content";

  // Ingredients list
  const ingredientsList = document.createElement("div");
  ingredientsList.className = "ingredients-list";

  const ingredientsTitle = document.createElement("h4");
  ingredientsTitle.textContent = "Bahan-bahan";

  const ingredientsUl = document.createElement("ul");
  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientsUl.appendChild(li);
  });

  ingredientsList.appendChild(ingredientsTitle);
  ingredientsList.appendChild(ingredientsUl);

  // Steps list
  const stepsList = document.createElement("div");
  stepsList.className = "steps-list";

  const stepsTitle = document.createElement("h4");
  stepsTitle.textContent = "Langkah-langkah";

  const stepsOl = document.createElement("ol");
  recipe.steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsOl.appendChild(li);
  });

  stepsList.appendChild(stepsTitle);
  stepsList.appendChild(stepsOl);

  recipeContent.appendChild(ingredientsList);
  recipeContent.appendChild(stepsList);

  // Create recipe actions
  const recipeActions = document.createElement("div");
  recipeActions.className = "recipe-actions";

  // Favorite button
  const favoriteBtn = document.createElement("button");
  favoriteBtn.className = "btn secondary favorite-btn";
  favoriteBtn.setAttribute("data-recipe", JSON.stringify(recipe));
  favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Simpan';

  // Share button
  const shareBtn = document.createElement("button");
  shareBtn.className = "btn share-btn";
  shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Bagikan';

  recipeActions.appendChild(favoriteBtn);
  recipeActions.appendChild(shareBtn);

  // Assemble card
  card.appendChild(recipeHeader);
  card.appendChild(recipeContent);
  card.appendChild(recipeActions);

  // Assemble modal content
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(card);

  // Assemble modal
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  // Setup close
  closeBtn.onclick = () => modal.remove();

  // Close modal when clicking outside
  modal.onclick = (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  };

  // Setup favorite button
  favoriteBtn.addEventListener("click", function () {
    const recipeData = JSON.parse(this.getAttribute("data-recipe"));
    toggleFavorite(recipeData, this);
  });

  // Setup share button
  shareBtn.addEventListener("click", function () {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `Coba resep ${recipe.name} dari ResepKu!`,
        url: window.location.href,
      });
    } else {
      alert("Fitur share tidak didukung di browser ini");
    }
  });
}

// Function to generate recipe based on ingredients
function generateRecipe(ingredients) {
  // Split ingredients into an array
  const ingredientsArray = ingredients
    .split(",")
    .map((item) => item.trim().toLowerCase());

  // Find the best matching recipe
  let bestMatch = null;
  let maxMatchCount = 0;

  for (const recipe of recipeDatabase) {
    let matchCount = 0;

    // Check how many main ingredients match
    for (const ingredient of ingredientsArray) {
      if (recipe.mainIngredients.includes(ingredient)) {
        matchCount++;
      }
    }

    // If this recipe has more matches than the current best, update best match
    if (matchCount > maxMatchCount) {
      maxMatchCount = matchCount;
      bestMatch = recipe;
    }
  }

  // If no recipe matches well, use a default recipe
  if (!bestMatch || maxMatchCount === 0) {
    // Try to find any recipe that has at least one matching ingredient
    for (const recipe of recipeDatabase) {
      for (const ingredient of ingredientsArray) {
        if (recipe.mainIngredients.includes(ingredient)) {
          bestMatch = recipe;
          maxMatchCount = 1;
          break;
        }
      }
      if (bestMatch) break;
    }

    // If still no match, use the first recipe as default
    if (!bestMatch) {
      bestMatch = recipeDatabase[0];
    }
  }

  // Display recipe
  displayRecipe(bestMatch, ingredients);
}

//favorite locked for non-members
function getFavorites() {
  const f = localStorage.getItem("favorites");
  return f ? JSON.parse(f) : [];
}
function toggleFavorite(recipe) {
  const user = getCurrentUser();
  if (!user || !user.isMember) {
    alert(
      "Fitur favorit hanya untuk member. Silakan daftar menjadi member terlebih dahulu."
    );
    showPage("membership");
    return;
  }
  const favs = getFavorites();
  const exists = favs.find((r) => r.name === recipe.name);
  if (exists) {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favs.filter((r) => r.name !== recipe.name))
    );
    alert("Resep dihapus dari favorit");
  } else {
    favs.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert("Resep ditambahkan ke favorit");
  }
  loadFavorites();
}

function loadFavorites() {
  const c = document.getElementById("favoritesContainer");
  if (!c) return;
  const user = getCurrentUser();
  if (!user || !user.isMember) {
    c.innerHTML = `<div class="empty-state">
                <i class="fas fa-heart"></i>
                <h3>fitur terkunci</h3>
                <p>Fitur favorit hanya untuk member. Silakan daftar menjadi member terlebih dahulu.</p>
            </div>`;
    return;
  }
  const favs = getFavorites();
  if (favs.length === 0) {
    c.innerHTML = `<div class="empty-state">
                <i class="fas fa-heart"></i>
                <h3>Belum ada resep favorit</h3>
                <p>Tambahkan resep favorit dengan menekan tombol hati pada resep</p>
            </div>`;
  } else {
    c.innerHTML = `
            <div class="recipe-cards">${favs
              .map(
                (r) => `<div class="recipe-card" ><h4>${r.name}</h4>
                        <p>${r.time} menit </p></div>`
              )
              .join("")}
            </div>
        `;
  }
}

// ==================================================
// MEMBERSHIP PAGE
// ==================================================
function setupMembershipPage() {
  const btn = document.getElementById("buyMembershipBtn");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    if (user.isMember) {
      alert("Anda sudah menjadi member.");
      return;
    }

    // aktifkan membership
    user.isMember = true;
    saveCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));

    // update user data in users list
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.username === user.username);
    if (index !== -1) {
      users[index].isMember = true;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // update UI
    setTimeout(() => {
      updateUserStatusUI();
      updateAdsVisibility();
      showToast(
        "🎉 Membership berhasil diaktifkan! Nikmati fitur tanpa batas."
      );
    }, 150);

    // opsional: switch to home page
    const homeMenu = document.querySelector('[data-page="home"]');
    if (homeMenu) homeMenu.click();
  });
}

// Display recipe
function displayRecipe(recipe, ingredients) {
  const recipeSection = document.getElementById("recipeSection");

  recipeSection.innerHTML = `
        <div class="card">
            <div class="recipe-header">
                <h3 id="recipeName">${recipe.name}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> <span id="cookTime">${
                      recipe.time
                    }</span> menit</span>
                    <span><i class="fas fa-signal"></i> <span id="difficulty">${
                      recipe.difficulty
                    }</span></span>
                </div>
            </div>
            
            <div class="recipe-content">
                <div class="ingredients-list">
                    <h4>Bahan-bahan</h4>
                    <ul id="ingredientsList">
                        ${recipe.ingredients
                          .map((ingredient) => `<li>${ingredient}</li>`)
                          .join("")}
                    </ul>
                </div>
                
                <div class="steps-list">
                    <h4>Langkah-langkah</h4>
                    <ol id="stepsList">
                        ${recipe.steps
                          .map((step) => `<li>${step}</li>`)
                          .join("")}
                    </ol>
                </div>
            </div>
            
            <div class="recipe-actions">
                <button class="btn secondary favorite-btn" data-recipe='${JSON.stringify(
                  recipe
                )}'><i class="fas fa-heart"></i> Simpan</button>
                <button class="btn share-btn"><i class="fas fa-share-alt"></i> Bagikan</button>
            </div>
        </div>
    `;

  // Add a note about matching ingredients
  const note = document.createElement("div");
  note.className = "recipe-note";
  note.innerHTML = `<i class="fas fa-info-circle"></i> Resep ini cocok dengan bahan yang Anda miliki: ${ingredients}`;

  // Insert the note after the recipe name
  const recipeHeader = document.querySelector(".recipe-header");
  recipeHeader.after(note);

  // Setup favorite button
  const favoriteBtn = document.querySelector(".favorite-btn");
  if (favoriteBtn) {
    favoriteBtn.addEventListener("click", function () {
      const recipeData = JSON.parse(this.getAttribute("data-recipe"));
      toggleFavorite(recipeData, this);
    });
  }

  // Setup share button
  const shareBtn = document.querySelector(".share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      if (navigator.share) {
        navigator.share({
          title: recipe.name,
          text: `Coba resep ${recipe.name} dari ResepKu!`,
          url: window.location.href,
        });
      } else {
        alert("Fitur share tidak didukung di browser ini");
      }
    });
  }
}

// Toggle favorite
function toggleFavorite(recipe, button) {
  const favorites = getFavorites();
  const isFavorite = favorites.some((fav) => fav.name === recipe.name);

  if (isFavorite) {
    // Remove from favorites
    const updatedFavorites = favorites.filter(
      (fav) => fav.name !== recipe.name
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Update button
    button.innerHTML = '<i class="fas fa-heart"></i> Simpan';
    button.classList.remove("active");

    // Update favorites UI
    loadFavorites();
  } else {
    // Add to favorites
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Update button
    button.innerHTML = '<i class="fas fa-heart"></i> Hapus dari Favorit';
    button.classList.add("active");

    // Update favorites UI
    loadFavorites();
  }
}

// Get favorites from localStorage
function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
}

// Load favorites
function loadFavorites() {
  const favoritesContainer = document.getElementById("favoritesContainer");
  if (!favoritesContainer) return;

  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <h3>Belum ada resep favorit</h3>
                <p>Tambahkan resep favorit dengan menekan tombol hati pada resep</p>
            </div>
        `;
  } else {
    favoritesContainer.innerHTML = `
            <div class="recipe-cards">
                ${favorites
                  .map(
                    (recipe) => `
                    <div class="recipe-card" onclick="showFavoriteRecipe('${recipe.name}')">
                        <img src="...img/logo food match.jpg" alt="${recipe.name}">
                        <div class="recipe-info">
                            <h4>${recipe.name}</h4>
                            <p>${recipe.time} menit • ${recipe.difficulty}</p>
                        </div>
                        <div class="recipe-card-actions">
                            <button class="btn secondary" onclick="event.stopPropagation(); removeFavorite('${recipe.name}')"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }
}

// Show favorite recipe
function showFavoriteRecipe(recipeName) {
  const favorites = getFavorites();
  const recipe = favorites.find((fav) => fav.name === recipeName);

  if (!recipe) return;

  // Switch to home page if not already there
  if (!document.getElementById("home-page").classList.contains("active")) {
    document.querySelector('[data-page="home"]').click();
  }

  // Show recipe section
  const recipeSection = document.getElementById("recipeSection");
  recipeSection.style.display = "block";

  // Scroll to recipe section
  recipeSection.scrollIntoView({ behavior: "smooth" });

  // Display recipe with buy button
  recipeSection.innerHTML = `
        <div class="card">
            <div class="recipe-header">
                <h3 id="recipeName">${recipe.name}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> <span id="cookTime">${
                      recipe.time
                    }</span> menit</span>
                    <span><i class="fas fa-signal"></i> <span id="difficulty">${
                      recipe.difficulty
                    }</span></span>
                </div>
            </div>
            
            <div class="recipe-content">
                <div class="ingredients-list">
                    <h4>Bahan-bahan</h4>
                    <ul id="ingredientsList">
                        ${recipe.ingredients
                          .map((ingredient) => `<li>${ingredient}</li>`)
                          .join("")}
                    </ul>
                </div>
                
                <div class="steps-list">
                    <h4>Langkah-langkah</h4>
                    <ol id="stepsList">
                        ${recipe.steps
                          .map((step) => `<li>${step}</li>`)
                          .join("")}
                    </ol>
                </div>
            </div>
            
            <div class="recipe-actions">
                <button class="btn secondary favorite-btn active" data-recipe='${JSON.stringify(
                  recipe
                )}'><i class="fas fa-heart"></i> Hapus dari Favorit</button>
                <button class="btn share-btn"><i class="fas fa-share-alt"></i> Bagikan</button>
            </div>
        </div>
    `;

  // Setup favorite button
  const favoriteBtn = document.querySelector(".favorite-btn");
  if (favoriteBtn) {
    favoriteBtn.addEventListener("click", function () {
      const recipeData = JSON.parse(this.getAttribute("data-recipe"));
      toggleFavorite(recipeData, this);
    });
  }

  // Setup share button
  const shareBtn = document.querySelector(".share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      if (navigator.share) {
        navigator.share({
          title: recipe.name,
          text: `Coba resep ${recipe.name} dari ResepKu!`,
          url: window.location.href,
        });
      } else {
        alert("Fitur share tidak didukung di browser ini");
      }
    });
  }
}

// Remove favorite
function removeFavorite(recipeName) {
  if (confirm("Apakah Anda yakin ingin menghapus resep ini dari favorit?")) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((fav) => fav.name !== recipeName);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    loadFavorites();
  }
}

// Save user recipe
function saveUserRecipe(recipe) {
  const userRecipes = getUserRecipes();
  userRecipes.push(recipe);
  localStorage.setItem("userRecipes", JSON.stringify(userRecipes));
}

// Get user recipes from localStorage
function getUserRecipes() {
  const userRecipes = localStorage.getItem("userRecipes");
  return userRecipes ? JSON.parse(userRecipes) : [];
}

// Load user recipes
function loadUserRecipes() {
  const myRecipesList = document.getElementById("myRecipesList");
  if (!myRecipesList) return;

  const userRecipes = getUserRecipes();

  if (userRecipes.length === 0) {
    myRecipesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <h3>Belum ada resep</h3>
                <p>Upload resep pertama Anda!</p>
            </div>
        `;
  } else {
    myRecipesList.innerHTML = userRecipes
      .map(
        (recipe) => `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.name}">
                <div class="recipe-info">
                    <h4>${recipe.name}</h4>
                    <p>${recipe.time} menit • ${recipe.difficulty}</p>
                </div>
                <div class="recipe-card-actions">
                    <button class="btn secondary" onclick="shareRecipe('${recipe.name}')"><i class="fas fa-share-alt"></i></button>
                    <button class="btn secondary" onclick="deleteUserRecipe(${recipe.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// Add user recipe to UI
function addUserRecipeToUI(recipe) {
  const myRecipesList = document.getElementById("myRecipesList");
  if (!myRecipesList) return;

  // Remove empty state if exists
  const emptyState = myRecipesList.querySelector(".empty-state");
  if (emptyState) {
    emptyState.remove();
  }

  // Add new recipe card
  const recipeCard = document.createElement("div");
  recipeCard.className = "recipe-card";
  recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <div class="recipe-info">
            <h4>${recipe.name}</h4>
            <p>${recipe.time} menit • ${recipe.difficulty}</p>
        </div>
        <div class="recipe-card-actions">
            <button class="btn secondary" onclick="shareRecipe('${recipe.name}')"><i class="fas fa-share-alt"></i></button>
            <button class="btn secondary" onclick="deleteUserRecipe(${recipe.id})"><i class="fas fa-trash"></i></button>
        </div>
    `;

  myRecipesList.appendChild(recipeCard);
}

// Share recipe
function shareRecipe(recipeName) {
  if (navigator.share) {
    navigator.share({
      title: recipeName,
      text: `Coba resep ${recipeName} dari ResepKu!`,
      url: window.location.href,
    });
  } else {
    alert("Fitur share tidak didukung di browser ini");
  }
}

// Delete user recipe
function deleteUserRecipe(recipeId) {
  if (confirm("Apakah Anda yakin ingin menghapus resep ini?")) {
    const userRecipes = getUserRecipes();
    const updatedRecipes = userRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));
    loadUserRecipes();
  }
}
// LOGOUT
// ==================================================
function setupLogoutButton() {
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutLink = document.getElementById("logoutLink");

  function doLogout() {
    if (confirm("Yakin ingin keluar?")) {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    }
  }

  if (logoutBtn) logoutBtn.addEventListener("click", doLogout);
  if (logoutLink) logoutLink.addEventListener("click", doLogout);
}
//update user status
function updatesidebarstatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    const status = currentUser.isMember ? "Member" : "Non-Member";
    const el = document.getElementById("memberStatus");
    if (el) el.textContent = `status: ${status}`;
  }
}
document.addEventListener("DOMContentLoaded", updatesidebarstatus);

// ===============================
// FITUR PENGATURAN AKUN
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  // Tampilkan data user aktif
  const nameInput = document.getElementById("profileName");
  const emailInput = document.getElementById("profileEmail");
  const usernameInput = document.getElementById("profileUsername");
  const statusInput = document.getElementById("profileStatus");
  const profileImage = document.getElementById("profileImage");

  if (nameInput) {
    nameInput.value = currentUser.fullname || "Nama Tidak Diketahui";
    nameInput.addEventListener("input", function () {
      currentUser.fullname = this.value;
      saveCurrentUser(currentUser);
      showToast("✅ Nama lengkap berhasil diperbarui!");
    });
  }
  if (emailInput) emailInput.value = currentUser.email || "-";
  if (usernameInput) usernameInput.value = currentUser.username || "-";
  if (statusInput)
    statusInput.value = currentUser.isMember ? "Member" : "Non-Member";

  updateUserStatusUI();
  updateAdsVisibility();
  updateProfilePhotoUI(currentUser.profilePhoto || "");

  // Tombol Ganti Foto
  const changePhotoBtn = document.getElementById("changePhotoBtn");
  const changePhotoInput = document.getElementById("changePhotoInput");

  if (changePhotoBtn && changePhotoInput) {
    changePhotoBtn.addEventListener("click", () => changePhotoInput.click());

    changePhotoInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (!file) return;

      // Resize gambar sebelum simpan
      resizeImage(file, 100, 100, function (resizedDataURL) {
        // Simpan foto di localStorage (ke currentUser dan users[])
        currentUser.profilePhoto = resizedDataURL;
        saveCurrentUser(currentUser);
        updateProfilePhotoUI(resizedDataURL);
        showToast("✅ Foto profil berhasil diperbarui!");
      });
    });
  }
});

// Fungsi untuk resize gambar
function resizeImage(file, maxWidth, maxHeight, callback) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = function () {
    // Hitung ukuran baru
    let { width, height } = img;
    if (width > height) {
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    // Konversi ke data URL
    const resizedDataURL = canvas.toDataURL("image/jpeg", 0.8);
    callback(resizedDataURL);
  };

  img.src = URL.createObjectURL(file);
}

//  Sinkronkan foto profil di semua tempat
function updateProfilePhotoUI(photoURL) {
  const photos = document.querySelectorAll(".profile-photo");
  photos.forEach((img) => {
    if (photoURL && img) img.src = photoURL;
  });
}

//  Tampilkan / sembunyikan iklan
function updateAdsVisibility() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const adsSections = document.querySelectorAll(".ads-section");
  adsSections.forEach((ad) => {
    if (currentUser && currentUser.isMember) {
      ad.style.display = "none";
      console.log("Iklan disembunyikan untuk member");
    } else {
      ad.style.display = "block";
      console.log("Iklan ditampilkan untuk non-member");
    }
  });
}

// Fungsi untuk menampilkan toast notification
function showToast(message) {
  // Buat elemen toast
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  // Tambahkan styling inline
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "20px";
  toast.style.backgroundColor = "#4CAF50";
  toast.style.color = "white";
  toast.style.padding = "12px 16px";
  toast.style.borderRadius = "4px";
  toast.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  toast.style.zIndex = "1000";
  toast.style.fontSize = "14px";
  toast.style.maxWidth = "300px";

  // Tambahkan ke body
  document.body.appendChild(toast);

  // Auto remove setelah 3 detik
  setTimeout(() => {
    toast.remove();
  }, 3000);
}





