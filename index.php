<?php
declare(strict_types=1);

require_once __DIR__ . '/GadgetSwap.php';
require_once __DIR__ . '/controllers/GadgetController.php';

$model = new GadgetSwap(
    'GadgetSwap',
    'Temukan perangkat Galaxy favoritmu dengan pengalaman belanja yang simpel.',
    '2026',
    [
        'Pencarian dan filter smartphone',
        'Wishlist produk favorit',
        'Keranjang belanja',
        'Trade-in gadget'
    ]
);

$controller = new GadgetController($model);
$controller->index();