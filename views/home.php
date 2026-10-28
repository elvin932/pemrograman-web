<?php
declare(strict_types=1);

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#ffffff">
    <title><?= e($siteName) ?> — Discover your next device</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header class="site-header">
    <div class="header-inner">
        <a class="brand" href="#home" aria-label="GadgetSwap beranda">
            <span class="brand-mark">G</span>
            <span>GadgetSwap</span>
        </a>

        <button class="menu-toggle" id="menuBtn" aria-label="Buka menu">☰</button>

        <nav class="main-nav" id="navMenu">
            <a href="#devices">Devices</a>
            <a href="#categories">Discover</a>
            <a href="#benefits">Why GadgetSwap</a>
        </nav>

        <div class="header-actions">
            <button class="icon-button" id="navSearchBtn" aria-label="Cari">⌕</button>
            <button class="icon-button cart-trigger" id="cartBtn" aria-label="Keranjang">
                ♧ <span id="cartCount">0</span>
            </button>
        </div>
    </div>
</header>

<main>
    <section class="hero" id="home">
        <div class="hero-copy">
            <p class="eyebrow">THE NEXT BIG THING</p>

            <h1>
                <?= e($siteName) ?>.<br>
                <span>Upgrade your everyday.</span>
            </h1>

            <p class="hero-description">
                <?= e($description) ?>
            </p>

            <div class="hero-actions">
                <a class="button button-dark" href="#devices">
                    Explore devices <span>↗</span>
                </a>
                <a class="text-link" href="#categories">Discover more</a>
            </div>

            <div class="hero-note">
                <span class="status-dot"></span>
                Pilihan perangkat, satu tempat.
            </div>
        </div>

        <div class="hero-visual" aria-label="Ilustrasi smartphone">
            <div class="orb orb-one"></div>
            <div class="orb orb-two"></div>

            <div class="phone phone-back">
                <div class="camera camera-one"></div>
                <div class="camera camera-two"></div>
                <div class="camera camera-three"></div>
            </div>

            <div class="phone phone-front">
                <div class="phone-screen">
                    <div class="screen-time">9:41</div>
                    <div class="screen-orb"></div>
                    <div class="screen-caption">Make it<br>epic.</div>
                    <div class="screen-bottom">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>

            <div class="floating-tag">
                <span class="tag-star">✦</span>
                <span>
                    <b>Find your next</b>
                    <small>favorite device</small>
                </span>
            </div>
        </div>
    </section>

    <section class="category-section section-wrap" id="categories">
        <div class="section-heading">
            <div>
                <p class="eyebrow">EXPLORE THE LINEUP</p>
                <h2>What are you looking for?</h2>
            </div>
            <a class="text-link" href="#devices">View all devices ↗</a>
        </div>

        <div class="category-grid">
            <?php foreach ($categories as $category): ?>
                <button
                    class="category-card"
                    type="button"
                    data-category="<?= e($category['name']) ?>"
                >
                    <span class="category-icon"><?= e($category['icon']) ?></span>
                    <span class="category-title"><?= e($category['name']) ?></span>
                    <span class="category-description">
                        <?= e($category['description']) ?>
                    </span>
                    <span class="category-arrow">↗</span>
                </button>
            <?php endforeach; ?>
        </div>
    </section>

    <section class="products-section section-wrap" id="devices">
        <div class="section-heading product-heading">
            <div>
                <p class="eyebrow">CURATED FOR YOU</p>
                <h2>Find your next device.</h2>
                <p class="section-subtitle">
                    Pilihan smartphone yang dimuat langsung dari API.
                </p>
            </div>
            <span class="result-count" id="resultCount">Memuat produk...</span>
        </div>

        <div class="filter-bar">
            <label class="search-field">
                <span>⌕</span>
                <input
                    id="productSearch"
                    type="search"
                    placeholder="Search devices..."
                    autocomplete="off"
                >
            </label>

            <select id="brandFilter" aria-label="Filter brand">
                <option value="all">All brands</option>
            </select>

            <select id="priceFilter" aria-label="Filter harga">
                <option value="all">All prices</option>
                <option value="under5">Under Rp5 juta</option>
                <option value="5to10">Rp5–10 juta</option>
                <option value="above10">Over Rp10 juta</option>
            </select>

            <select id="sortFilter" aria-label="Urutkan produk">
                <option value="default">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A–Z</option>
                <option value="rating">Top rated</option>
            </select>

            <button class="reset-button" id="resetFilter" type="button">
                Reset
            </button>
        </div>

        <div id="loading" class="state-box">
            <span class="spinner"></span>
            <h3>Finding your devices...</h3>
            <p>Sedang mengambil data smartphone dari server.</p>
        </div>

        <div id="errorBox" class="state-box hidden" role="alert"></div>

        <div id="emptyState" class="state-box hidden">
            <span class="empty-symbol">⌕</span>
            <h3>No devices found</h3>
            <p>Coba ubah kata kunci atau filter pencarian.</p>
        </div>

        <div id="productGrid" class="product-grid"></div>
        <div id="pagination" class="pagination"></div>
    </section>

    <section class="trade-section section-wrap">
        <div class="trade-copy">
            <p class="eyebrow">MAKE A SMART MOVE</p>
            <h2>Goodbye old.<br><span>Hello new.</span></h2>
            <p>
                Perangkat lama bisa menjadi langkah pertama menuju
                perangkat berikutnya.
            </p>
            <button class="button button-light" id="tradeBtn" type="button">
                Explore trade-in ↗
            </button>
        </div>

        <div class="trade-art">
            <div class="trade-ring"></div>
            <div class="trade-device">G</div>
            <div class="trade-spark spark-a">✦</div>
            <div class="trade-spark spark-b">✧</div>
        </div>
    </section>

    <section class="benefits-section section-wrap" id="benefits">
        <div class="section-heading">
            <div>
                <p class="eyebrow">THE GADGETSWAP DIFFERENCE</p>
                <h2>A better way to upgrade.</h2>
            </div>
        </div>

        <div class="benefit-grid">
            <?php foreach ($features as $index => $feature): ?>
                <article class="benefit-card">
                    <span class="benefit-number">
                        0<?= $index + 1 ?>
                    </span>
                    <h3><?= e($feature) ?></h3>
                    <p>
                        Dirancang agar pengalaman mencari dan memilih
                        gadget terasa lebih mudah.
                    </p>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
</main>

<footer class="site-footer">
    <a class="brand footer-brand" href="#home">
        <span class="brand-mark">G</span>
        <span>GadgetSwap</span>
    </a>
    <p>Discover your next device. © <?= e($year) ?> GadgetSwap.</p>
</footer>

<div class="modal hidden" id="cartModal" role="dialog"
     aria-modal="true" aria-labelledby="cartTitle">
    <div class="modal-overlay" id="modalOverlay"></div>

    <section class="cart-panel">
        <div class="cart-header">
            <div>
                <p class="eyebrow">YOUR SELECTION</p>
                <h2 id="cartTitle">Shopping bag</h2>
            </div>
            <button class="icon-button" id="closeCart" aria-label="Tutup keranjang">
                ×
            </button>
        </div>

        <div id="cartItems" class="cart-items"></div>

        <div id="cartEmpty" class="cart-empty">
            <span>♧</span>
            <h3>Your bag is empty</h3>
            <p>Tambahkan perangkat yang kamu suka.</p>
        </div>

        <div class="cart-footer">
            <div class="cart-total-row">
                <span>Subtotal</span>
                <strong id="cartTotal">Rp0</strong>
            </div>

            <button class="button button-dark full-width"
                    id="checkoutBtn" type="button">
                Continue to checkout ↗
            </button>

            <p class="demo-note">Checkout ini merupakan simulasi tugas.</p>
        </div>
    </section>
</div>

<div class="toast" id="toast" role="status">
    <span>✓</span>
    <p id="toastMessage"></p>
</div>

<script src="script.js"></script>
</body>
</html>