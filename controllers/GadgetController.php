<?php

declare(strict_types=1);

require_once __DIR__ . '/../GadgetSwap.php';

/**
 * GadgetController
 *
 * Mengatur alur aplikasi GadgetSwap dengan
 * pendekatan Model-View-Controller (MVC).
 *
 * Tanggung jawab:
 * - Mengambil data dari Model.
 * - Menyiapkan data untuk View.
 * - Menampilkan halaman website.
 */
final class GadgetController
{
    /**
     * Lokasi direktori View.
     */
    private const VIEW_PATH = __DIR__ . '/../views/';

    /**
     * Dependency Injection:
     * Model diberikan melalui constructor.
     */
    public function __construct(
        private readonly GadgetSwap $model
    ) {
    }

    /**
     * Menampilkan halaman utama GadgetSwap.
     */
    public function index(): void
    {
        $data = $this->getHomePageData();

        $this->render('home', $data);
    }

    /**
     * Mengambil seluruh informasi dari Model.
     *
     * @return array<string, mixed>
     */
    private function getHomePageData(): array
    {
        return [
            'siteName'    => $this->model->getName(),
            'description' => $this->model->getDescription(),
            'year'        => $this->model->getYear(),
            'features'    => $this->model->getFeatures(),
            'categories'  => $this->model->getCategories(),
        ];
    }

    /**
     * Menampilkan file View berdasarkan nama.
     *
     * @param string $view Nama file View
     * @param array<string, mixed> $data
     */
    private function render(
        string $view,
        array $data = []
    ): void {
        $viewFile = self::VIEW_PATH . $view . '.php';

        // Periksa apakah file View tersedia.
        if (!is_file($viewFile)) {
            throw new RuntimeException(
                "File View tidak ditemukan: {$view}"
            );
        }

        // Mengubah data array menjadi variabel
        // yang bisa digunakan oleh View.
        extract($data, EXTR_SKIP);

        // Menampilkan halaman website.
        require $viewFile;
    }
}
