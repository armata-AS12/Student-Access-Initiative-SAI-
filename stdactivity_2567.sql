-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2024 at 03:50 AM
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
-- Database: `stdactivity_2567`
--

-- --------------------------------------------------------

--
-- Table structure for table `method`
--

CREATE TABLE `method` (
  `method_id` int(11) NOT NULL,
  `method_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `method`
--

INSERT INTO `method` (`method_id`, `method_name`) VALUES
(1, 'สแกนใบหน้า'),
(2, 'สแกนลายนิ้วมือ'),
(3, 'QR Code'),
(4, 'RFID'),
(5, 'รหัสนักศึกษา');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `status_name`) VALUES
(1, 'มา'),
(2, 'มาสาย'),
(3, 'ขาด'),
(4, 'ลาป่วย'),
(5, 'ลากิจ'),
(6, 'อื่นๆ');

-- --------------------------------------------------------

--
-- Table structure for table `sttendance`
--

CREATE TABLE `sttendance` (
  `attendance_id` int(11) NOT NULL,
  `student_id` varchar(11) DEFAULT NULL,
  `attendance_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status_id` int(11) DEFAULT NULL,
  `checkin_time` time DEFAULT NULL,
  `method_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sttendance`
--

INSERT INTO `sttendance` (`attendance_id`, `student_id`, `attendance_date`, `status_id`, `checkin_time`, `method_id`) VALUES
(139, '66309010025', '2024-12-04 10:53:05', 3, NULL, NULL),
(140, '66309010011', '2024-12-04 10:53:05', 1, NULL, NULL),
(141, '66309010022', '2024-12-04 10:53:05', 1, NULL, NULL),
(142, '66309010001', '2024-12-04 10:53:05', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `student_id` varchar(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(10) NOT NULL,
  `face_image` blob DEFAULT NULL,
  `fingerprint_data` blob DEFAULT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `rfid_data` varchar(255) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `picture` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `student_id`, `fullname`, `username`, `password`, `face_image`, `fingerprint_data`, `qr_code`, `rfid_data`, `status`, `picture`) VALUES
(23, '66309010025', 'ภานุเดช เคนชมภู', 'new@gmail.com', '1234', NULL, NULL, NULL, NULL, '', '1732678260147-image_2024-11-27_103059004.png.png'),
(98, '66309010011', 'วิทยา เพ็งแจ่ม', 'cap@gmail.com', '1234', NULL, NULL, NULL, NULL, '', '1732683337816-2.jpg.jpg'),
(99, '66309010022', 'เมธี โยธะศรี', 'matee@gmail.com', '1234', NULL, NULL, NULL, NULL, '', '1732675000608-image_2024-11-27_093639289.png.png'),
(101, '66309010001', 'ชวัลวิชญ์ คงสัมพันธ์', 'mark@gmail.com', '1234', NULL, NULL, NULL, NULL, '', '1732677256192-image_2024-11-27_101302459.png.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `method`
--
ALTER TABLE `method`
  ADD PRIMARY KEY (`method_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `sttendance`
--
ALTER TABLE `sttendance`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `method`
--
ALTER TABLE `method`
  MODIFY `method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sttendance`
--
ALTER TABLE `sttendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
