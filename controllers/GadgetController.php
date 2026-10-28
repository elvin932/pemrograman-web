<?php
declare(strict_types=1);

require_once __DIR__ . '/../GadgetSwap.php';

class GadgetController
{
    private GadgetSwap $model;

    public function __construct(GadgetSwap $model)
    {
        $this->model = $model;
    }

    public function index(): void
    {
        $siteName = $this->model->getName();
        $description = $this->model->getDescription();
        $year = $this->model->getYear();
        $features = $this->model->getFeatures();
        $categories = $this->model->getCategories();

        require __DIR__ . '/../views/home.php';
    }
}