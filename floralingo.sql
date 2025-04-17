-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2025 at 01:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `floralingo`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `address_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `region` enum('Region I','Region II','Region III','Region IV-A','Region IV-B','Region V','Region VI','Region VII','Region VIII','Region IX','Region X','Region XI','Region XII','CAR','BARMM','NCR','CARAGA') NOT NULL,
  `municipality_city` varchar(255) NOT NULL,
  `barangay` varchar(255) NOT NULL,
  `house_no` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`address_id`, `user_id`, `region`, `municipality_city`, `barangay`, `house_no`, `postal_code`, `created_at`, `updated_at`) VALUES
(8, 1, 'Region V', 'Camalig Albay', 'Ilawod', '179', '4502', '2025-04-15 18:56:01', '2025-04-15 19:46:03'),
(9, 1, 'Region V', 'Malabog Daraga', 'Purok 3', '179', '4502', '2025-04-15 21:08:04', '2025-04-15 21:08:04'),
(12, 1, 'NCR', 'asd', 'sda', 'asd', 'asd', '2025-04-16 10:44:37', '2025-04-16 10:44:37'),
(16, 3, 'Region V', 'Camalig, Albay', 'Sua', '1235', '1234', '2025-04-17 01:18:34', '2025-04-17 01:18:34'),
(17, 17, 'CARAGA', 'Camalig Albay', 'Tagaytay', '1234', '1234', '2025-04-17 01:28:09', '2025-04-17 01:28:09');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_jela@gmail.com|127.0.0.1', 'i:2;', 1743945379),
('laravel_cache_jela@gmail.com|127.0.0.1:timer', 'i:1743945379;', 1743945379);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gen_user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `favorite_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `flower_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`favorite_id`, `user_id`, `flower_id`, `created_at`, `updated_at`) VALUES
(5, 1, 13, '2025-04-14 08:52:44', '2025-04-14 08:52:44'),
(17, 1, 10, '2025-04-14 10:01:51', '2025-04-14 10:01:51'),
(30, 3, 14, '2025-04-17 01:15:58', '2025-04-17 01:15:58'),
(31, 17, 11, '2025-04-17 01:28:29', '2025-04-17 01:28:29'),
(32, 1, 14, '2025-04-17 03:32:26', '2025-04-17 03:32:26'),
(33, 1, 9, '2025-04-17 03:33:01', '2025-04-17 03:33:01'),
(34, 1, 15, '2025-04-17 03:33:07', '2025-04-17 03:33:07');

-- --------------------------------------------------------

--
-- Table structure for table `flowers`
--

CREATE TABLE `flowers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `flower_id` varchar(255) NOT NULL,
  `flower_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `scientific_name` varchar(255) NOT NULL,
  `pronunciation` varchar(255) NOT NULL,
  `added_at` date NOT NULL,
  `Thumbnail_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `flowers`
--

INSERT INTO `flowers` (`id`, `flower_id`, `flower_name`, `description`, `scientific_name`, `pronunciation`, `added_at`, `Thumbnail_url`) VALUES
(9, '80142', 'Rose', 'A symbol of love, passion, and deep emotions. The rose reflects the beauty and complexity of relationshipsu2014its petals soft and inviting, yet its thorns a reminder of loveu2019s challenges. Just like in life, love requires care, patience, and understanding.', 'Rosa', 'ROH-zuh', '2025-04-01', 'http://localhost:8000/imgAssets/1743418630_rose.jpg'),
(10, '71378', 'Sunflower', 'A representation of unwavering faith, loyalty, and positivity. Sunflowers turn towards the sun, teaching us to seek light even in darkness. In life, they remind us to stay hopeful and resilient, always following what nourishes our soul..', 'Helianthus annuus', 'HE-lee-AN-thus AN-yoo-us', '2025-04-16', 'http://localhost:8000/imgAssets/1743418663_sunflower.jpg'),
(11, '62272', 'Carnations', 'A flower of admiration, remembrance, and deep affection. Carnations symbolize the bonds we share with those we loveu2014each petal carrying a story, much like our own experiences. They remind us that even in moments of sorrow, love and memories bloom eternal.', 'Dianthus caryophyllus', 'dye-AN-thus ka-ree-oh-FIL-us', '2025-04-06', 'http://localhost:8000/imgAssets/1743418699_carnations.jpg'),
(13, '7874', 'Tulip', 'Tulips represent perfect love and elegance. Each bloom stands tall and proud, reflecting inner strength and the quiet beauty of simplicity. They remind us that even the simplest things can hold deep meaning.', 'Tulipa', 'TOO-lip', '2025-04-09', 'imgAssets/1744189937_tulip.jpg'),
(14, '35139', 'Peony', 'Peonies symbolize prosperity, good fortune, and honor. Their lush, full blooms represent romance and a fulfilling life. Often associated with healing and love, they remind us to embrace our own blooming journeys.', 'Paeonia', 'PEE-oh-nee-uh', '2025-04-09', 'imgAssets/1744189969_peony.jpg'),
(15, '10925', 'Anemone', 'A symbol of anticipation and protection. Anemones remind us of the fragility of life and the importance of appreciating each moment. Their soft, open form symbolizes emotional vulnerability and trust.', 'Anemone coronaria', 'uh-NEM-uh-nee koh-ro-NAH-ree-uh', '2025-04-09', 'imgAssets/1744190001_anemone.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `gen_users`
--

CREATE TABLE `gen_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gen_users`
--

INSERT INTO `gen_users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Janine Ishe Moral', 'janine@gmail.com', NULL, '$2y$12$l7Uqixo4.BhSNbzpMhcirewTUmBylpw041g4HrDCdMf2IxhOGTXbq', NULL, '2025-04-06 05:00:21', '2025-04-16 10:00:15'),
(2, 'gab', 'gab@gmail.com', NULL, '$2y$12$ygbUXJ2GsJjE8N4BTylAKuQEPZiLm2jOeYyKPJj8BKBTKYbEZVC9O', NULL, '2025-04-06 05:02:15', '2025-04-06 05:02:15'),
(3, 'jela', 'jela@gmail.com', NULL, '$2y$12$8rMNuzyOOpP984O8IRMa8e61aebsH37yYQ4JInWY/8XP9MEtgnJ..', NULL, '2025-04-06 05:04:02', '2025-04-06 05:04:02'),
(17, 'San Miguel', 'migs@gmail.com', NULL, '$2y$12$0owaza2ikWZUeibxwnhSuOMUa4LWZf7KDXmwHGiCvwjz1KaBeB7/K', NULL, '2025-04-17 01:26:27', '2025-04-17 01:27:17');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(7, '2025_03_28_141906_create_products_table', 2),
(8, '2025_03_29_024806_create_products_table', 3),
(24, '2025_03_30_111403_0001_01_01_000000_create_users_table', 6),
(43, '0001_01_01_000000_create_users_table', 7),
(44, '0001_01_01_000001_create_cache_table', 7),
(45, '0001_01_01_000002_create_jobs_table', 7),
(46, '2025_03_29_051352_create_product_categories_table', 7),
(47, '2025_03_30_044308_create_payment_methods_table', 7),
(48, '2025_03_31_023817_create_flowers_table', 7),
(49, '2025_03_31_052125_create_products_table', 7),
(50, '2025_04_06_061955_create_gen_users_table', 7),
(51, '2025_04_14_154736_create_favorites_table', 8),
(52, '2025_04_15_113903_create_carts_table', 9),
(53, '2025_04_15_160511_create_addresses_table', 10),
(57, '2025_04_16_133029_create_orders_table', 11);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gen_user_id` bigint(20) UNSIGNED NOT NULL,
  `OrderID` varchar(255) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `TotalPrice` decimal(10,2) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `orderedProducts` text NOT NULL,
  `deliveryDate` date NOT NULL,
  `deliveryTime` time NOT NULL,
  `shippingAdd` text NOT NULL,
  `numItems` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `gen_user_id`, `OrderID`, `paymentMethod`, `status`, `TotalPrice`, `Name`, `orderedProducts`, `deliveryDate`, `deliveryTime`, `shippingAdd`, `numItems`, `created_at`, `updated_at`) VALUES
(6, 1, 'KVNQ', 'Gcash', 'Cancelled', 2774.00, 'Janine Ishe Moral', 'Rose Bouquet, Orchid', '2025-04-18', '16:20:00', '179, Purok 3, Malabog Daraga, Region V, 4502', 2, '2025-04-17 00:18:25', '2025-04-17 03:06:46'),
(7, 1, 'ZLUX', 'Banco de Oro', 'Packed', 2481.00, 'Janine Ishe Moral', 'Daffodil Sunrise', '2025-04-17', '10:58:00', 'asd, sda, asd, NCR, asd', 2, '2025-04-17 00:18:58', '2025-04-17 01:00:44'),
(8, 1, 'NP2Y', 'Cash on Delivery', 'Delivered', 774.00, 'Janine Ishe Moral', 'Rose Bouquet', '2025-04-24', '19:19:00', '179, Ilawod, Camalig Albay, Region V, 4502', 1, '2025-04-17 00:19:20', '2025-04-17 01:01:59'),
(9, 1, 'VVVD', 'Banco de Oro', 'Pending', 753.00, 'Janine Ishe Moral', 'White Lily Tribute', '2025-04-29', '18:19:00', '179, Purok 3, Malabog Daraga, Region V, 4502', 1, '2025-04-17 00:19:40', '2025-04-17 00:19:40'),
(10, 3, '823X', 'Banco de Oro', 'Delivered', 226057.00, 'jela', 'Orchid, Sunflower Arrangement, Rose & Lily, White Lily Tribute, aasaas', '2025-04-18', '17:20:00', '1235, Sua, Camalig, Albay, Region V, 1234', 5, '2025-04-17 01:18:52', '2025-04-17 03:13:39'),
(11, 17, 'LDO6', 'Banco de Oro', 'Cancelled', 965.00, 'San Miguel', 'Sunflower Arrangement', '2025-04-17', '17:33:00', '1234, Tagaytay, Camalig Albay, CARAGA, 1234', 1, '2025-04-17 01:28:48', '2025-04-17 01:40:12'),
(13, 17, 'A7AN', 'Banco de Oro', 'Pending', 861.00, 'San Miguel', 'Carnation Mix', '2025-04-17', '13:39:00', '1234, Tagaytay, Camalig Albay, CARAGA, 1234', 1, '2025-04-17 01:39:30', '2025-04-17 01:39:30'),
(14, 1, '7VIQ', 'Banco de Oro', 'Pending', 4801.00, 'Janine Ishe Moral', 'White Lily Tribute, Carnation Mix, Rose & Lily', '2025-04-17', '19:16:00', '179, Purok 3, Malabog Daraga, Region V, 4502', 6, '2025-04-17 03:15:57', '2025-04-17 03:15:57'),
(16, 1, 'OAOT', 'Banco de Oro', 'Pending', 2172.00, 'Janine Ishe Moral', 'Rose Bouquet', '2025-04-24', '19:20:00', '179, Ilawod, Camalig Albay, Region V, 4502', 3, '2025-04-17 03:19:05', '2025-04-17 03:19:05');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `PaymentID` varchar(255) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`id`, `PaymentID`, `paymentMethod`, `status`, `created_at`, `updated_at`) VALUES
(1, '1233', 'Gcash', 'Active', NULL, '2025-04-15 10:09:57'),
(2, '63296', 'Banco de Oro', 'Active', NULL, NULL),
(3, '25028', 'PayPal', 'Disabled', NULL, '2025-04-09 06:01:39'),
(4, '15168', 'Cash on Delivery', 'Active', '2025-04-09 06:01:24', '2025-04-15 10:09:48');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ProductID` varchar(255) NOT NULL,
  `Price` decimal(8,2) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `Added_at` date NOT NULL,
  `Description` text NOT NULL,
  `Thumbnail_url` varchar(255) DEFAULT NULL,
  `Availability` varchar(255) NOT NULL,
  `Category` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `ProductID`, `Price`, `ProductName`, `Added_at`, `Description`, `Thumbnail_url`, `Availability`, `Category`, `created_at`, `updated_at`) VALUES
(4, '4796', 699.00, 'Rose Bouquet', '2025-04-01', 'A classic bouquet of fresh red roses, symbolizing love and passion. Perfect for special occasions or heartfelt gestures.', 'http://localhost:8000/imgAssets/1743439456_roseboq.jpg', 'Available', 'Best Sellers', NULL, NULL),
(5, '89427', 890.00, 'Sunflower Arrangement', '2025-04-05', 'A bright and cheerful sunflower arrangement that brings warmth and positivity to any space. Ideal for gifts and home decor.', 'http://localhost:8000/imgAssets/1743439500_sunflowerboq.jpg', 'Available', 'Floral Tributes', NULL, '2025-04-16 23:31:42'),
(6, '45325', 786.00, 'Carnation Mix', '2025-01-04', 'A delicate mix of pink and white carnations, representing admiration and pure love. Suitable for anniversaries, birthdays, and remembrance.', 'http://localhost:8000/imgAssets/1743439552_carnationboq.jpg', 'Available', 'Best Sellers', NULL, '2025-04-09 02:04:59'),
(7, '58799', 899.00, 'Rose & Lily', '2025-04-01', 'A stunning combination of roses and lilies, ideal for expressing deep emotions.', 'http://localhost:8000/imgAssets/1743439678_roselily.jpg', 'Available', 'Best Sellers', NULL, NULL),
(8, '24277', 678.00, 'White Lily Tribute', '2025-04-01', 'A floral tribute featuring elegant white lilies, symbolizing peace and remembrance.', 'http://localhost:8000/imgAssets/1743439725_whitelilyy.jpg', 'Available', 'Floral Tributes', NULL, NULL),
(10, '37118', 222222.00, 'aasaas', '2025-04-16', 'luphet pahreh13', 'http://localhost:8000/imgAssets/1743849821_lupet.jpg', 'Available', 'Floral Tributes', NULL, '2025-04-15 10:09:13'),
(11, '16876', 1300.00, 'Lavender Bliss', '2025-04-05', 'A calming lavender bouquet, known for its soothing fragrance and stress-relieving properties. Ideal for relaxation and a peaceful atmosphere.', 'http://localhost:8000/imgAssets/1743864415_lavander.jpg', 'Available', 'New Arrival', NULL, NULL),
(12, '65284', 1293.00, 'Orchid', '2025-04-17', 'A luxurious orchid arrangement, symbolizing rare beauty and strength. Perfect for sophisticated settings or as a gift for someone special.', 'http://localhost:8000/imgAssets/1743864483_orchid.jpg', 'Available', 'Best Sellers', NULL, '2025-04-17 00:21:53'),
(13, '63384', 1203.00, 'Daffodil Sunrise', '2025-04-05', 'A vibrant daffodil bouquet, symbolizing new beginnings and hope. A perfect choice for springtime or to celebrate new chapters in life.', 'http://localhost:8000/imgAssets/1743864541_Daffodil Delight.jpg', 'Available', 'Floral Tributes', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ProductCatID` bigint(20) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `addedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('zAoTfk3u9DvC9zI6rD6Gxmd8CHb0nqfOHoVqGCdv', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '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', 1744890855);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Guaanine', 'janine@gmail.com', NULL, '$2y$12$XGQ/r0TPniEvDW12.JnmAu0uURB86HzgKi69DY2r5WwneA2PZFcvi', 'user', NULL, '2025-04-06 05:27:00', '2025-04-06 05:27:00'),
(3, 'FloraLingo', 'admin@gmail.com', NULL, '$2y$12$E04m6h8/rNQnriDvZTiLMOilIwLwM50jPpR8Xt1..D02MC/rYAW26', 'user', NULL, '2025-04-09 06:01:09', '2025-04-09 06:01:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `addresses_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_gen_user_id_foreign` (`gen_user_id`),
  ADD KEY `carts_product_id_foreign` (`product_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`favorite_id`),
  ADD KEY `favorites_user_id_foreign` (`user_id`),
  ADD KEY `favorites_flower_id_foreign` (`flower_id`);

--
-- Indexes for table `flowers`
--
ALTER TABLE `flowers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flowers_flower_id_unique` (`flower_id`);

--
-- Indexes for table `gen_users`
--
ALTER TABLE `gen_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gen_users_email_unique` (`email`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_orderid_unique` (`OrderID`),
  ADD KEY `orders_gen_user_id_foreign` (`gen_user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payment_method_paymentid_unique` (`PaymentID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_productid_unique` (`ProductID`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_categories_productcatid_unique` (`ProductCatID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `address_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `favorite_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `flowers`
--
ALTER TABLE `flowers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `gen_users`
--
ALTER TABLE `gen_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `gen_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_gen_user_id_foreign` FOREIGN KEY (`gen_user_id`) REFERENCES `gen_users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_flower_id_foreign` FOREIGN KEY (`flower_id`) REFERENCES `flowers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `gen_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_gen_user_id_foreign` FOREIGN KEY (`gen_user_id`) REFERENCES `gen_users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
