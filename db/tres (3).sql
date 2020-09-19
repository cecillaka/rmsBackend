-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2020 at 11:49 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tres`
--

-- --------------------------------------------------------

--
-- Table structure for table `landlord`
--

CREATE TABLE `landlord` (
  `company_name` varchar(500) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `house_number` int(100) NOT NULL,
  `street_name` varchar(500) NOT NULL,
  `suburb` varchar(500) NOT NULL,
  `zip_code` int(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `registration_no` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `landlord`
--

INSERT INTO `landlord` (`company_name`, `telephone`, `house_number`, `street_name`, `suburb`, `zip_code`, `password`, `email_address`, `registration_no`, `city`, `province`, `country`) VALUES
('', '0', 0, '', '', 0, '1234', '', '', '', '', ''),
('icep', '31256987', 2021, 'church str', 'dale', 2332, '1234', 'big@tut96', 'RGRE56876', 'boston', 'north west', 'South Africa'),
('Power house', '0312563222', 2021, 'west str', 'dale', 2332, '1234', 'dale@icep.co.za', 'RGQ356461', 'boston', 'north cost', 'South Africa'),
('', '0', 0, '', '', 0, '1234', 'ben@icep.co.za', '', '', '', ''),
('View Palace', '08651351', 6352, 'bioj str', 'Soshang', 2332, '1111', 'boss@gmail.com', 'RGQ3564861', 'boston', 'north cost', 'South Africa');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `landlord_email` varchar(255) NOT NULL,
  `numFemale_beds` int(11) NOT NULL,
  `numMale_beds` int(11) NOT NULL,
  `num_rooms` int(11) NOT NULL,
  `num_floors` int(11) NOT NULL,
  `bedsPerRoom` int(11) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `blocks` int(11) NOT NULL DEFAULT 1,
  `date_apply` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(15) NOT NULL,
  `occupied_rooms` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`landlord_email`, `numFemale_beds`, `numMale_beds`, `num_rooms`, `num_floors`, `bedsPerRoom`, `campus`, `blocks`, `date_apply`, `status`, `occupied_rooms`) VALUES
('dale@icep.co.za', 30, 30, 30, 3, 2, 'pretoria', 1, '0000-00-00', '', 0),
('big@tut96', 200, 200, 200, 4, 2, 'soshanguve', 1, '0000-00-00', '', 0),
('boss@gmail.com', 100, 100, 100, 2, 2, 'Arcadia', 1, '2020-05-19', '', 43);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_no` int(255) NOT NULL,
  `Full_names` text NOT NULL,
  `Last_name` text NOT NULL,
  `Id_no` int(11) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `disability` tinyint(1) DEFAULT NULL,
  `contact_student` int(20) NOT NULL,
  `contact_guardian` int(20) NOT NULL,
  `campus_study` varchar(500) NOT NULL,
  `faculty` varchar(500) NOT NULL,
  `course` varchar(500) NOT NULL,
  `year_of_admission` year(4) NOT NULL,
  `sponsor` varchar(500) NOT NULL,
  `password` varchar(255) NOT NULL,
  `confirm_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `student_no` varchar(255) NOT NULL,
  `landlord_email` varchar(255) NOT NULL,
  `floor` int(11) DEFAULT 0,
  `room_no` int(11) DEFAULT 0,
  `bed_no` int(11) DEFAULT 0,
  `date_located` date NOT NULL DEFAULT current_timestamp(),
  `apply_date` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tenant`
--

INSERT INTO `tenant` (`student_no`, `landlord_email`, `floor`, `room_no`, `bed_no`, `date_located`, `apply_date`, `status`) VALUES
('216168631', 'boss@gmail.com', 2, 43, NULL, '2020-05-14', '2020-05-14', 'PENDING');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_no`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
