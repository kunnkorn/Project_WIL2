-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2021 at 11:46 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supply`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` tinyint(4) NOT NULL,
  `category_name` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'วัสดุสำนักงาน'),
(2, 'วัสดุไฟฟ้าวิทยุ'),
(3, 'วัสดุคอมพิวเตอร์'),
(4, 'วัสดุโฆษณา'),
(5, 'วัสดุงานบ้าน'),
(6, 'วัสดุเครื่องแต่งกาย'),
(7, 'วัสดุของที่ระลึก');

-- --------------------------------------------------------

--
-- Table structure for table `manage_stock`
--

CREATE TABLE `manage_stock` (
  `manage_id` mediumint(9) NOT NULL,
  `date_manage` date NOT NULL,
  `time_manage` time NOT NULL,
  `number_material` smallint(6) DEFAULT NULL,
  `status_manage_stock` tinyint(4) NOT NULL,
  `annotation_Managestock` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `material_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` char(12) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `material_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `material_name` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `material_number` smallint(6) DEFAULT NULL,
  `unit` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material_requisiotion`
--

CREATE TABLE `material_requisiotion` (
  `requisition_id` mediumint(9) NOT NULL,
  `material_id` char(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount_of_requisition` smallint(6) NOT NULL,
  `amount_if_divide` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requisition`
--

CREATE TABLE `requisition` (
  `requisition_id` mediumint(9) NOT NULL,
  `objective` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `annotation` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_requisition` date NOT NULL,
  `time_requisition` time NOT NULL,
  `date_pickup` date DEFAULT NULL,
  `time_pickup` time DEFAULT NULL,
  `status_requisition` tinyint(4) NOT NULL,
  `read_requisition` tinyint(4) NOT NULL,
  `annotation_of_disproval` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin_id_approval` char(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin_id_success` char(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` char(12) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rank` varchar(85) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(175) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_user` tinyint(4) NOT NULL,
  `user_role` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `manage_stock`
--
ALTER TABLE `manage_stock`
  ADD PRIMARY KEY (`manage_id`),
  ADD KEY `material_id` (`material_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `material_requisiotion`
--
ALTER TABLE `material_requisiotion`
  ADD PRIMARY KEY (`requisition_id`,`material_id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `requisition`
--
ALTER TABLE `requisition`
  ADD PRIMARY KEY (`requisition_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `manage_stock`
--
ALTER TABLE `manage_stock`
  MODIFY `manage_id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2203;

--
-- AUTO_INCREMENT for table `requisition`
--
ALTER TABLE `requisition`
  MODIFY `requisition_id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `manage_stock`
--
ALTER TABLE `manage_stock`
  ADD CONSTRAINT `manage_stock_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`),
  ADD CONSTRAINT `manage_stock_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `material_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `material_requisiotion`
--
ALTER TABLE `material_requisiotion`
  ADD CONSTRAINT `material_requisiotion_ibfk_1` FOREIGN KEY (`requisition_id`) REFERENCES `requisition` (`requisition_id`),
  ADD CONSTRAINT `material_requisiotion_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`);

--
-- Constraints for table `requisition`
--
ALTER TABLE `requisition`
  ADD CONSTRAINT `requisition_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
