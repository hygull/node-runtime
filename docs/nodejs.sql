-- MySQL dump 10.13  Distrib 5.7.19, for macos10.12 (x86_64)
--
-- Host: localhost    Database: nodejs
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `address` text,
  `password` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ryan Dahl','ryan.dahl@gmail.com','7973134514','Kondagaon, INDIA','ryan@321','2017-09-30 09:58:01','2017-09-30 11:47:15',1,0),(2,'Misko Hevery','misko.hevery@gmail.com','7832017454','Kanpur, INDIA','misko@321','2017-09-30 09:58:01','2017-09-30 11:46:48',1,0),(3,'Robert Griesemer','robert.griesemer@gmail.com','7877093454','Gurgaon, INDIA','robert@321','2017-09-30 09:58:01','2017-09-30 11:46:52',1,0),(4,'Ken Thompson','ken.thompson@gmail.com','7977093114','Hyderabad, INDIA','ken@321','2017-09-30 09:58:01','2017-09-30 11:47:11',1,0),(5,'Dennis Ritchie','dennis.ritchie@gmail.com','7832092454','Faridabad, INDIA','dennis@321','2017-09-30 09:58:01','2017-09-30 11:46:44',1,0),(6,'Arindita Saha','arindita.saha@gmail.com','7454545445','West Bengal, INDIA','arindita@321','2017-09-30 11:46:08','2017-09-30 12:12:40',0,0),(7,'Kislaya Pant','kislaya.pant@gmail.com','7454545434','Rajasthan, India','kislaya@321','2017-09-30 11:48:34','2017-09-30 11:48:34',1,0),(8,'Rishikesh Agrawani','rishikesh0011115067@gmail.com','7353787704','Kondagaon, Chhattisgarh, INDIA','rishikesh@321','2017-09-30 11:51:12','2017-09-30 11:51:12',1,0),(10,'Darshan Sidar','darshan.sidar@gmail.com','7454544545','Raigarh, Chhattisgarh, INDIA','darshan@321','2017-09-30 12:05:12','2017-09-30 12:05:12',1,0),(11,'Hemkesh Agrawani','hemkesh.agrawani@gmail.com','7454545656','Kondagaon, Chhattisgarh, INDIA','hemkesh@321','2017-09-30 12:07:44','2017-09-30 12:08:28',1,0),(12,'Malinikesh Agrawani','malinikesh.agrawani@gmail.com','8461933133','Kondagaon, Chhattisgarh, INDIA','malinikesh@321','2017-09-30 12:10:00','2017-09-30 12:12:33',0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-30 17:50:18
