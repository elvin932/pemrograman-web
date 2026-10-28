<?php
declare(strict_types=1);

class GadgetSwap
{
    private string $name;
    private string $description;
    private string $year;
    private array $features;
    private array $categories;

    public function __construct(
        string $name,
        string $description,
        string $year,
        array $features
    ) {
        $this->name = $name;
        $this->description = $description;
        $this->year = $year;
        $this->features = $features;

        $this->categories = [
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
    }

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

    public function getFeatures(): array
    {
        return $this->features;
    }

    public function getCategories(): array
    {
        return $this->categories;
    }
}