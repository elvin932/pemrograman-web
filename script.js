"use strict";

/* ==============================
   CONFIGURATION
============================== */

const API_URL =
    "https://dummyjson.com/products/category/smartphones?limit=100";

const IDR_RATE = 16000;
const PRODUCTS_PER_PAGE = 8;

/* ==============================
   STATE
============================== */

let products = [];
let filteredProducts = [];
let currentPage = 1;
let cart = [];
let wishlist = new Set();
let toastTimer;

/* ==============================
   DOM
============================== */

const $ = (selector) => document.querySelector(selector);

const productGrid = $("#productGrid");
const loading = $("#loading");
const errorBox = $("#errorBox");
const emptyState = $("#emptyState");
const pagination = $("#pagination");
const resultCount = $("#resultCount");

const productSearch = $("#productSearch");
const brandFilter = $("#brandFilter");
const priceFilter = $("#priceFilter");
const sortFilter = $("#sortFilter");
const resetFilter = $("#resetFilter");

const cartModal = $("#cartModal");
const cartItems = $("#cartItems");
const cartEmpty = $("#cartEmpty");
const cartTotal = $("#cartTotal");
const cartCount = $("#cartCount");

const toast = $("#toast");
const toastMessage = $("#toastMessage");

/* ==============================
   INITIALIZATION
============================== */

document.addEventListener("DOMContentLoaded", () => {
    setupEvents();
    updateCartUI();
    loadProducts();
});

/* ==============================
   EVENTS
============================== */

function setupEvents() {
    productSearch.addEventListener("input", handleFilters);
    brandFilter.addEventListener("change", handleFilters);
    priceFilter.addEventListener("change", handleFilters);
    sortFilter.addEventListener("change", handleFilters);
    resetFilter.addEventListener("click", resetFilters);

    $("#cartBtn").addEventListener("click", openCart);
    $("#closeCart").addEventListener("click", closeCart);
    $("#modalOverlay").addEventListener("click", closeCart);
    $("#checkoutBtn").addEventListener("click", checkout);

    $("#menuBtn").addEventListener("click", () => {
        $("#navMenu").classList.toggle("active");
    });

    $("#navSearchBtn").addEventListener("click", () => {
        $("#devices").scrollIntoView({ behavior: "smooth" });

        window.setTimeout(() => {
            productSearch.focus();
        }, 450);
    });

    $("#tradeBtn").addEventListener("click", () => {
        showToast("Fitur trade-in siap dikembangkan!");
    });

    document.querySelectorAll(".category-card").forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            productSearch.value = "";
            brandFilter.value = "all";
            sortFilter.value = "default";

            if (category === "Promo") {
                priceFilter.value = "under5";
            } else if (category === "Galaxy Premium") {
                priceFilter.value = "above10";
            } else {
                priceFilter.value = "all";
            }

            handleFilters();

            $("#devices").scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    document.querySelectorAll(".main-nav a").forEach((link) => {
        link.addEventListener("click", () => {
            $("#navMenu").classList.remove("active");
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeCart();
        }
    });

    /* Jika jaringan terputus saat aplikasi digunakan */
    window.addEventListener("offline", () => {
        showError(
            "Tidak ada jaringan internet",
            "Koneksi internet terputus. Periksa Wi-Fi atau data seluler Anda, lalu tekan Coba lagi."
        );
    });

    /* Jika koneksi kembali tersedia */
    window.addEventListener("online", () => {
        showToast("Koneksi internet kembali tersedia.");

        if (products.length === 0) {
            loadProducts();
        }
    });
}

/* ==============================
   TASK 1: CONNECT TO API
============================== */

async function loadProducts() {
    showLoading();

    /*
     * Periksa koneksi sebelum mengirim request.
     * Ini mencegah loading terus-menerus saat offline.
     */
    if (!navigator.onLine) {
        showError(
            "Tidak ada jaringan internet",
            "Periksa Wi-Fi atau data seluler Anda, lalu tekan Coba lagi."
        );

        return;
    }

    const controller = new AbortController();

    /*
     * Batas waktu request 12 detik.
     * Jika terlalu lama, request dibatalkan.
     */
    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, 12000);

    try {
        const response = await fetch(API_URL, {
            signal: controller.signal,
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(
                `Server mengembalikan status ${response.status}`
            );
        }

        /* TASK 2: Membaca JSON dari API */
        const data = await response.json();

        if (!Array.isArray(data.products)) {
            throw new Error("Format data dari API tidak sesuai.");
        }

        /* Ubah data API menjadi struktur data aplikasi */
        products = data.products.map(normalizeProduct);

        populateBrands();

        filteredProducts = [...products];
        currentPage = 1;

        renderProducts();

    } catch (error) {
        console.error("Gagal memuat produk:", error);

        if (!navigator.onLine) {
            showError(
                "Tidak ada jaringan internet",
                "Periksa Wi-Fi atau data seluler Anda, lalu tekan Coba lagi."
            );
        } else if (error.name === "AbortError") {
            showError(
                "Koneksi terlalu lama",
                "Server belum merespons setelah 12 detik. Periksa koneksi Anda, lalu coba lagi."
            );
        } else {
            showError(
                "Gagal memuat produk",
                "Data belum bisa diambil dari server. Periksa koneksi internet atau coba lagi beberapa saat."
            );
        }

    } finally {
        /*
         * Selalu bersihkan timer meskipun request berhasil
         * atau mengalami error.
         */
        window.clearTimeout(timeoutId);
    }
}

/* ==============================
   NORMALIZE API DATA
============================== */

function normalizeProduct(item) {
    const price = Math.round(
        Number(item.price || 0) * IDR_RATE
    );

    return {
        id: Number(item.id),
        title: String(item.title || "Smartphone"),
        brand: String(item.brand || "Generic"),
        price,
        oldPrice: Math.round(
            price * (
                1 + Number(item.discountPercentage || 0) / 100
            )
        ),
        rating: Number(item.rating || 0),
        stock: Number(item.stock || 0),
        thumbnail: String(item.thumbnail || ""),
        description: String(item.description || ""),
        discount: Number(item.discountPercentage || 0)
    };
}

/* ==============================
   BRAND FILTER
============================== */

function populateBrands() {
    const selected = brandFilter.value || "all";

    const brands = [
        ...new Set(products.map((product) => product.brand))
    ].sort((a, b) => a.localeCompare(b));

    brandFilter.replaceChildren(
        new Option("All brands", "all")
    );

    brands.forEach((brand) => {
        brandFilter.add(new Option(brand, brand));
    });

    brandFilter.value = brands.includes(selected)
        ? selected
        : "all";
}

/* ==============================
   SEARCH AND FILTER
============================== */

function handleFilters() {
    const keyword = productSearch.value
        .trim()
        .toLowerCase();

    const brand = brandFilter.value;
    const price = priceFilter.value;

    filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(keyword) ||
            product.brand.toLowerCase().includes(keyword);

        const matchesBrand =
            brand === "all" || product.brand === brand;

        let matchesPrice = true;

        if (price === "under5") {
            matchesPrice = product.price < 5000000;
        }

        if (price === "5to10") {
            matchesPrice =
                product.price >= 5000000 &&
                product.price <= 10000000;
        }

        if (price === "above10") {
            matchesPrice = product.price > 10000000;
        }

        return matchesSearch && matchesBrand && matchesPrice;
    });

    sortProducts(sortFilter.value);

    currentPage = 1;

    renderProducts();
}

/* ==============================
   SORTING
============================== */

function sortProducts(sort) {
    if (sort === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
        filteredProducts.sort(
            (a, b) => a.title.localeCompare(b.title)
        );
    }

    if (sort === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }
}

/* ==============================
   RESET FILTER
============================== */

function resetFilters() {
    productSearch.value = "";
    brandFilter.value = "all";
    priceFilter.value = "all";
    sortFilter.value = "default";

    filteredProducts = [...products];
    currentPage = 1;

    renderProducts();
}

/* ==============================
   TASK 2: DISPLAY API DATA
============================== */

function renderProducts() {
    hideLoading();
    hideError();

    productGrid.replaceChildren();
    pagination.replaceChildren();

    resultCount.textContent =
        `${filteredProducts.length} perangkat ditemukan`;

    if (filteredProducts.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    const totalPages = Math.ceil(
        filteredProducts.length / PRODUCTS_PER_PAGE
    );

    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;

    filteredProducts
        .slice(start, start + PRODUCTS_PER_PAGE)
        .forEach((product) => {
            productGrid.appendChild(createProductCard(product));
        });

    renderPagination(totalPages);
}

/* ==============================
   CREATE PRODUCT CARD
============================== */

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("div");
    image.className = "product-image";

    const img = document.createElement("img");

    img.src = product.thumbnail ||
        "https://placehold.co/500x500?text=Gadget";

    img.alt = product.title;
    img.loading = "lazy";

    img.onerror = () => {
        img.onerror = null;
        img.src = "https://placehold.co/500x500?text=Gadget";
    };

    const badge = document.createElement("span");
    badge.className = "product-badge";

    badge.textContent = product.discount >= 10
        ? `-${Math.round(product.discount)}%`
        : "FEATURED";

    const wishButton = document.createElement("button");

    wishButton.type = "button";

    wishButton.className =
        `wishlist-btn${wishlist.has(product.id) ? " active" : ""}`;

    wishButton.setAttribute(
        "aria-label",
        wishlist.has(product.id)
            ? "Hapus dari wishlist"
            : "Tambah ke wishlist"
    );

    wishButton.textContent =
        wishlist.has(product.id) ? "♥" : "♡";

    wishButton.addEventListener("click", () => {
        toggleWishlist(product.id, wishButton);
    });

    image.append(img, badge, wishButton);

    const body = document.createElement("div");
    body.className = "product-body";

    const brand = document.createElement("div");
    brand.className = "product-brand";
    brand.textContent = product.brand;

    const title = document.createElement("h3");
    title.className = "product-name";
    title.textContent = product.title;

    const rating = document.createElement("div");
    rating.className = "product-rating";

    const stars = document.createElement("span");
    stars.className = "stars";

    stars.textContent = "★".repeat(
        Math.max(0, Math.min(5, Math.round(product.rating)))
    );

    const ratingValue = document.createElement("span");
    ratingValue.textContent = product.rating.toFixed(1);

    rating.append(stars, ratingValue);

    const price = document.createElement("div");
    price.className = "product-price";
    price.append(document.createTextNode(formatRupiah(product.price)));

    const oldPrice = document.createElement("span");
    oldPrice.className = "product-old-price";
    oldPrice.textContent = formatRupiah(product.oldPrice);

    price.appendChild(oldPrice);

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "btn btn-primary";
    addButton.textContent = "Add to bag";

    addButton.addEventListener("click", () => {
        addToCart(product);
    });

    actions.appendChild(addButton);

    body.append(brand, title, rating, price, actions);
    card.append(image, body);

    return card;
}

/* ==============================
   PAGINATION
============================== */

function renderPagination(totalPages) {
    if (totalPages <= 1) {
        return;
    }

    for (let page = 1; page <= totalPages; page += 1) {
        const button = document.createElement("button");

        button.type = "button";

        button.className =
            `page-btn${page === currentPage ? " active" : ""}`;

        button.textContent = String(page);
        button.setAttribute("aria-label", `Halaman ${page}`);

        button.addEventListener("click", () => {
            currentPage = page;
            renderProducts();

            $("#devices").scrollIntoView({
                behavior: "smooth"
            });
        });

        pagination.appendChild(button);
    }
}

/* ==============================
   WISHLIST
============================== */

function toggleWishlist(id, button) {
    if (wishlist.has(id)) {
        wishlist.delete(id);

        button.classList.remove("active");
        button.textContent = "♡";
        button.setAttribute("aria-label", "Tambah ke wishlist");

        showToast("Dihapus dari wishlist");
    } else {
        wishlist.add(id);

        button.classList.add("active");
        button.textContent = "♥";
        button.setAttribute("aria-label", "Hapus dari wishlist");

        showToast("Ditambahkan ke wishlist ♥");
    }
}

/* ==============================
   CART
============================== */

function addToCart(product) {
    const existing = cart.find(
        (item) => item.id === product.id
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();

    showToast(`${product.title} ditambahkan ke keranjang`);
}

function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCartUI();
    renderCart();

    showToast("Produk dihapus dari keranjang");
}

function updateCartUI() {
    cartCount.textContent = String(
        cart.reduce((sum, item) => sum + item.quantity, 0)
    );

    cartTotal.textContent = formatRupiah(
        cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )
    );
}

/* ==============================
   CART MODAL
============================== */

function openCart() {
    cartModal.classList.remove("hidden");
    document.body.classList.add("modal-open");

    renderCart();
}

function closeCart() {
    cartModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
}

function renderCart() {
    cartItems.replaceChildren();

    const isEmpty = cart.length === 0;

    cartItems.classList.toggle("hidden", isEmpty);
    cartEmpty.classList.toggle("hidden", !isEmpty);

    cart.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-item";

        const imageWrap = document.createElement("div");
        imageWrap.className = "cart-item-image";

        const image = document.createElement("img");

        image.src = item.thumbnail ||
            "https://placehold.co/100x100?text=Gadget";

        image.alt = item.title;

        image.onerror = () => {
            image.onerror = null;
            image.src = "https://placehold.co/100x100?text=Gadget";
        };

        imageWrap.appendChild(image);

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const title = document.createElement("h4");
        title.textContent = item.title;

        const detail = document.createElement("p");
        detail.textContent =
            `${formatRupiah(item.price)} × ${item.quantity}`;

        info.append(title, detail);

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "cart-item-remove";
        remove.textContent = "Hapus";

        remove.addEventListener("click", () => {
            removeFromCart(item.id);
        });

        row.append(imageWrap, info, remove);
        cartItems.appendChild(row);
    });
}

/* ==============================
   CHECKOUT DEMO
============================== */

function checkout() {
    if (cart.length === 0) {
        showToast("Keranjang masih kosong");
        return;
    }

    showToast("Checkout demo berhasil diproses!");
}

/* ==============================
   TASK 3: LOADING AND ERROR STATE
============================== */

function showLoading() {
    loading.classList.remove("hidden");
    errorBox.classList.add("hidden");
    emptyState.classList.add("hidden");

    productGrid.replaceChildren();
    pagination.replaceChildren();

    resultCount.textContent = "Mengambil data produk...";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(title, description) {
    hideLoading();

    errorBox.classList.remove("hidden");
    emptyState.classList.add("hidden");

    productGrid.replaceChildren();
    pagination.replaceChildren();

    resultCount.textContent = "Data tidak tersedia";
    errorBox.replaceChildren();

    const icon = document.createElement("div");
    icon.className = "error-icon";
    icon.textContent = "⚠️";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const message = document.createElement("p");
    message.textContent = description;

    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "btn btn-primary";
    retry.textContent = "Coba lagi";

    retry.addEventListener("click", loadProducts);

    errorBox.append(icon, heading, message, retry);
}

function hideError() {
    errorBox.classList.add("hidden");
}

/* ==============================
   CURRENCY FORMAT
============================== */

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(value);
}

/* ==============================
   TOAST NOTIFICATION
============================== */

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(toastTimer);

    toastTimer = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}