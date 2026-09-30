const products = [

    {
        id: 1,
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        category: "Smartphone",
        price: 18999000,
        oldPrice: 20999000,
        rating: 4.9,
        stock: 12,
        badge: "BEST SELLER",
        image: "https://images.unsplash.com/photo-1592286927505-2fd0e0f0c4b3?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 2,
        name: "iPhone 15",
        brand: "Apple",
        category: "Smartphone",
        price: 13999000,
        oldPrice: 14999000,
        rating: 4.8,
        stock: 20,
        badge: "PROMO",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 3,
        name: "iPhone 13",
        brand: "Apple",
        category: "Smartphone",
        price: 8499000,
        oldPrice: 9999000,
        rating: 4.9,
        stock: 15,
        badge: "BEST SELLER",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 4,
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        category: "Smartphone",
        price: 17999000,
        oldPrice: 19999000,
        rating: 4.9,
        stock: 8,
        badge: "PREMIUM",
        image: "https://images.unsplash.com/photo-1610945265078-7a7b0e6e6b3f?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 5,
        name: "Samsung Galaxy S23",
        brand: "Samsung",
        category: "Smartphone",
        price: 7999000,
        oldPrice: 8999000,
        rating: 4.8,
        stock: 18,
        badge: "PROMO",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 6,
        name: "Samsung Galaxy A55",
        brand: "Samsung",
        category: "Smartphone",
        price: 5799000,
        oldPrice: 6299000,
        rating: 4.7,
        stock: 24,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 7,
        name: "Xiaomi 14",
        brand: "Xiaomi",
        category: "Smartphone",
        price: 10999000,
        oldPrice: 11999000,
        rating: 4.8,
        stock: 10,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 8,
        name: "Xiaomi Redmi Note 13",
        brand: "Xiaomi",
        category: "Smartphone",
        price: 3299000,
        oldPrice: 3799000,
        rating: 4.6,
        stock: 30,
        badge: "PROMO",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 9,
        name: "OPPO Reno 11",
        brand: "OPPO",
        category: "Smartphone",
        price: 5999000,
        oldPrice: 6799000,
        rating: 4.7,
        stock: 16,
        badge: "PROMO",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 10,
        name: "OPPO Find X7",
        brand: "OPPO",
        category: "Smartphone",
        price: 11999000,
        oldPrice: 12999000,
        rating: 4.8,
        stock: 7,
        badge: "PREMIUM",
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 11,
        name: "Vivo V30",
        brand: "Vivo",
        category: "Smartphone",
        price: 5999000,
        oldPrice: 6599000,
        rating: 4.7,
        stock: 19,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 12,
        name: "Google Pixel 8 Pro",
        brand: "Google",
        category: "Smartphone",
        price: 14999000,
        oldPrice: 15999000,
        rating: 4.9,
        stock: 6,
        badge: "PREMIUM",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 13,
        name: "ASUS ROG Phone 8",
        brand: "ASUS",
        category: "Smartphone",
        price: 13999000,
        oldPrice: 14999000,
        rating: 4.9,
        stock: 9,
        badge: "GAMING",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 14,
        name: "OnePlus 12",
        brand: "OnePlus",
        category: "Smartphone",
        price: 9999000,
        oldPrice: 10999000,
        rating: 4.8,
        stock: 11,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 15,
        name: "Realme GT 6",
        brand: "Realme",
        category: "Smartphone",
        price: 6999000,
        oldPrice: 7499000,
        rating: 4.7,
        stock: 21,
        badge: "PROMO",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 16,
        name: "Samsung Galaxy Z Flip",
        brand: "Samsung",
        category: "Smartphone",
        price: 14999000,
        oldPrice: 16999000,
        rating: 4.8,
        stock: 5,
        badge: "LIMITED",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=85"
    }

];

const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const brandFilter = document.getElementById("brandFilter");
const sortFilter = document.getElementById("sortFilter");
const noResult = document.getElementById("noResult");
const productPagination = document.getElementById("productPagination");
const pageSize = 8;
let currentPage = 1;

const formatPrice = price => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
}).format(price);

const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    element.className = className;

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
};

function createProductCard(product) {
    const card = createElement(
        "article",
        "group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    );
    const imageContainer = createElement(
        "div",
        "relative overflow-hidden bg-gray-100"
    );
    const image = createElement(
        "img",
        "h-52 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-60"
    );
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    const badge = createElement(
        "span",
        "absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-bold text-white",
        product.badge
    );
    const wishlistButton = createElement(
        "button",
        "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl shadow transition hover:text-red-500",
        "♡"
    );
    wishlistButton.type = "button";
    wishlistButton.setAttribute("aria-label", `Tambahkan ${product.name} ke wishlist`);
    wishlistButton.setAttribute("aria-pressed", "false");
    wishlistButton.addEventListener("click", () => {
        const isWishlisted = wishlistButton.getAttribute("aria-pressed") === "true";
        wishlistButton.setAttribute("aria-pressed", String(!isWishlisted));
        wishlistButton.textContent = isWishlisted ? "♡" : "♥";
        wishlistButton.classList.toggle("text-red-500", !isWishlisted);
    });

    imageContainer.append(image, badge, wishlistButton);

    const content = createElement("div", "p-4 sm:p-5");
    const category = createElement(
        "p",
        "text-xs font-bold uppercase tracking-wider text-gray-500",
        `${product.brand} · ${product.category}`
    );
    const name = createElement(
        "h3",
        "mt-2 min-h-12 font-bold text-gray-900",
        product.name
    );
    const rating = createElement(
        "p",
        "mt-2 text-sm text-gray-600",
        `★ ${product.rating.toFixed(1)} · Stok ${product.stock}`
    );
    const priceRow = createElement(
        "div",
        "mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1"
    );
    priceRow.append(
        createElement("strong", "text-lg font-black text-gray-950", formatPrice(product.price)),
        createElement("del", "text-sm text-gray-400", formatPrice(product.oldPrice))
    );

    const addButton = createElement(
        "button",
        "mt-4 w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800",
        "Tambah ke Keranjang"
    );
    addButton.type = "button";
    addButton.addEventListener("click", () => {
        addButton.textContent = "Ditambahkan ✓";
        addButton.classList.replace("bg-black", "bg-green-700");
        addButton.classList.replace("hover:bg-gray-800", "hover:bg-green-800");

        window.setTimeout(() => {
            addButton.textContent = "Tambah ke Keranjang";
            addButton.classList.replace("bg-green-700", "bg-black");
            addButton.classList.replace("hover:bg-green-800", "hover:bg-gray-800");
        }, 1500);
    });

    content.append(category, name, rating, priceRow, addButton);
    card.append(imageContainer, content);
    return card;
}

function getFilteredProducts() {
    const keyword = productSearch.value.trim().toLocaleLowerCase("id-ID");
    const selectedBrand = brandFilter.value;
    const filteredProducts = products.filter(product => {
        const matchesSearch = `${product.name} ${product.brand} ${product.category}`
            .toLocaleLowerCase("id-ID")
            .includes(keyword);
        const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;

        return matchesSearch && matchesBrand;
    });

    switch (sortFilter.value) {
        case "low":
            filteredProducts.sort((first, second) => first.price - second.price);
            break;
        case "high":
            filteredProducts.sort((first, second) => second.price - first.price);
            break;
        case "rating":
            filteredProducts.sort((first, second) => second.rating - first.rating);
            break;
    }

    return filteredProducts;
}

function renderPagination(pageCount) {
    productPagination.replaceChildren();
    productPagination.classList.toggle("hidden", pageCount <= 1);

    if (pageCount <= 1) {
        return;
    }

    const addPageButton = (label, page, isCurrent = false) => {
        const button = createElement(
            "button",
            isCurrent
                ? "h-10 min-w-10 rounded-xl bg-black px-3 text-white"
                : "h-10 min-w-10 rounded-xl border border-gray-200 px-3 hover:bg-gray-100",
            label
        );
        button.type = "button";
        button.setAttribute("aria-label", `Halaman ${page}`);

        if (isCurrent) {
            button.setAttribute("aria-current", "page");
        }

        button.addEventListener("click", () => {
            currentPage = page;
            renderProducts();
        });
        productPagination.append(button);
    };

    if (currentPage > 1) {
        addPageButton("←", currentPage - 1);
    }

    for (let page = 1; page <= pageCount; page++) {
        addPageButton(String(page), page, page === currentPage);
    }

    if (currentPage < pageCount) {
        addPageButton("→", currentPage + 1);
    }
}

function renderProducts() {
    const filteredProducts = getFilteredProducts();
    const pageCount = Math.ceil(filteredProducts.length / pageSize);
    currentPage = Math.min(currentPage, Math.max(pageCount, 1));
    const startIndex = (currentPage - 1) * pageSize;
    const visibleProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

    productGrid.replaceChildren(...visibleProducts.map(createProductCard));
    noResult.classList.toggle("hidden", filteredProducts.length > 0);
    renderPagination(pageCount);
}

productSearch.addEventListener("input", () => {
    currentPage = 1;
    renderProducts();
});

brandFilter.addEventListener("change", () => {
    currentPage = 1;
    renderProducts();
});

sortFilter.addEventListener("change", () => {
    currentPage = 1;
    renderProducts();
});

renderProducts();