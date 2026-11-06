<?php

declare(strict_types=1);

/**
 * Model GadgetSwap
 *
 * Mengelola informasi utama website,
 * fitur aplikasi, dan kategori gadget.
 */
class GadgetSwap
{
    // Informasi utama aplikasi
    private readonly string $name;
    private readonly string $description;
    private readonly string $year;

    // Data fitur dan kategori
    private readonly array $features;
    private readonly array $categories;

    /**
     * Constructor untuk inisialisasi data.
     */
    public function __construct(
        string $name,
        string $description,
        string $year,
        array $features
    ) {
        $this->name = trim($name);
        $this->description = trim($description);
        $this->year = $year;
        $this->features = $features;

        $this->categories = self::DEFAULT_CATEGORIES;
    }

    /**
     * Daftar kategori bawaan GadgetSwap.
     */
    private const DEFAULT_CATEGORIES = [
        [
            'name' => 'Smartphone',
            'description' => 'Ponsel untuk aktivitas sehari-hari.',
            'icon' => '▣'
        ],
        [
            'name' => 'Galaxy Premium',
            'description' => 'Jelajahi perangkat kelas premium.',
            'icon' => '✦'
        ],
        [
            'name' => 'Promo',
            'description' => 'Temukan gadget dengan harga menarik.',
            'icon' => '％'
        ],
        [
            'name' => 'Trade-in',
            'description' => 'Tukar tambah perangkat lama.',
            'icon' => '↻'
        ]
    ];

    // =====================================
    // GETTER: INFORMASI APLIKASI
    // =====================================

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getYear(): string
    {
        return $this->year;
    }

    // =====================================
    // GETTER: FITUR DAN KATEGORI
    // =====================================

    public function getFeatures(): array
    {
        return $this->features;
    }

    public function getCategories(): array
    {
        return $this->categories;
    }

    // =====================================
    // METHOD TAMBAHAN
    // =====================================

    /**
     * Menghitung total kategori produk.
     */
    public function getTotalCategories(): int
    {
        return count($this->categories);
    }

    /**
     * Mencari kategori berdasarkan nama.
     * Mengembalikan null jika tidak ditemukan.
     */
    public function findCategory(string $name): ?array
    {
        foreach ($this->categories as $category) {
            if (
                strcasecmp(
                    $category['name'],
                    trim($name)
                ) === 0
            ) {
                return $category;
            }
        }

        return null;
    }

    /**
     * Menghitung total fitur aplikasi.
     */
    public function getTotalFeatures(): int
    {
        return count($this->features);
    }
}
