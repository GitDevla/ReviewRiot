-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2023 at 04:08 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reviewriot`
--
CREATE DATABASE IF NOT EXISTS `reviewriot` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `reviewriot`;

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(256) NOT NULL,
  `password_hash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `user_id`, `email`, `password_hash`) VALUES
(1, 1, 'admin', '$2a$10$OhSuIuqzLh5TCE/mX49hgOqpwfIHRsPTCHmhVZrGKnxxDh2xg.dvi'),
(2, 2, 'guest@gmail.com', '$2a$10$NIb.DGpeaLXhNg9JwEsfAuE9uNidbKbuaeWbcB8q1mWrqSgfxGWp6');

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `who_id` int(10) UNSIGNED NOT NULL,
  `whom_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `name`) VALUES
(1, 'Akció'),
(12, 'Animáció'),
(14, 'Családi'),
(34, 'Disztópia'),
(13, 'Dokumentum'),
(3, 'Dráma'),
(23, 'Életrajzi'),
(7, 'Fantasy'),
(29, 'Fekete komédia'),
(35, 'Film noir'),
(37, 'Futurisztikus'),
(28, 'Gasztro'),
(38, 'Gengszter'),
(18, 'Háborús'),
(4, 'Horror'),
(26, 'Iskolai'),
(6, 'Kaland'),
(24, 'Katasztrófafilm'),
(22, 'Képregényfilm'),
(39, 'Középkori'),
(10, 'Krimi'),
(19, 'Misztikus'),
(32, 'Mockumentary'),
(15, 'Musical'),
(5, 'Romantikus'),
(11, 'Sci-fi'),
(16, 'Sport'),
(20, 'Szatirikus'),
(27, 'Szépirodalmi adaptáció'),
(31, 'Színházi adaptáció'),
(25, 'Szuperhős'),
(33, 'Táncfilm'),
(36, 'Természetfilm'),
(9, 'Thriller'),
(8, 'Történelmi'),
(2, 'Vígjáték'),
(17, 'Western'),
(30, 'Zenei'),
(21, 'Zombis');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(256) NOT NULL,
  `release_date` year(4) NOT NULL,
  `image_path` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `name`, `release_date`, `image_path`) VALUES
(1, 'The Shawshank Redemption', 1994, '7a11cd7b-8e63-4987-8434-940ef5fc2147.jpg'),
(2, 'The Godfather', 1972, '8e08b139-089c-4a6e-9ac3-d92943a7ea6d.jpg'),
(3, 'The Dark Knight', 2008, '04edf68d-c3a5-4e0d-9a9c-b972106f1661.jpg'),
(4, 'The Godfather Part II', 1974, 'c44857a3-0407-44d0-aa2f-92e5e6b635cd.jpg'),
(5, '12 Angry Men', 1957, '78e437e3-1050-4542-ab72-00a5e897e446.jpg'),
(6, 'Schindler\'s List', 1993, 'c1949eb6-0ef3-45fe-8158-f7f9ac256f22.jpg'),
(7, 'The Lord of the Rings: The Return of the King', 2003, 'bffc0711-d7b0-407b-9505-4fb4cebd7760.jpg'),
(8, 'Pulp Fiction', 1994, '01222f92-6b41-432a-8c9d-9ebb671186d6.jpg'),
(9, 'The Lord of the Rings: The Fellowship of the Ring', 2001, '3a4d3956-5d3e-456a-9540-04c87467d7b8.jpg'),
(10, 'The Good, the Bad and the Ugly', 1966, 'a8bcbd94-307e-44e3-b1b4-dfe7e8699907.jpg'),
(11, 'Forrest Gump', 1994, 'e91b3f18-cd65-4357-96ce-f7fff1816d53.jpg'),
(12, 'Fight Club', 1999, '673b78bb-89f7-4c01-9be1-da82aae82fd0.jpg'),
(13, 'The Lord of the Rings: The Two Towers', 2002, '454d409d-a7f0-40d5-8dbb-c9004675d1b5.jpg'),
(14, 'Inception', 2010, '764f9f96-886c-4207-8a2b-0e82795aac76.jpg'),
(15, 'Star Wars: Episode V - The Empire Strikes Back', 1980, '808db4f0-99e9-4a71-b3f8-edac99cd0544.jpg'),
(16, 'The Matrix', 1999, 'b0ab55f9-0bc6-4b90-aed2-e1ecc9c90f97.jpg'),
(17, 'Goodfellas', 1990, '74df304d-13f7-4522-b312-884ffe0567b2.jpg'),
(18, 'One Flew Over the Cuckoo\'s Nest', 1975, '34e50c69-bbdb-458c-a0b2-524b311e2f7d.jpg'),
(19, 'Se7en', 1995, '8ffdbe7c-7e18-431e-a0c3-1e380b6acda7.jpg'),
(20, 'Seven Samurai', 1954, '0bcb9dd4-0198-4815-aa18-399508f6824d.jpg'),
(21, 'It\'s a Wonderful Life', 1946, 'e6d2eaf0-3044-4535-a707-b7a2b3f8100b.jpg'),
(22, 'The Silence of the Lambs', 1991, 'd6fe4697-9e2a-4b4f-aade-084ed574dad7.jpg'),
(23, 'Saving Private Ryan', 1998, 'e64e2fae-0285-4595-9b28-db08e644fdc9.jpg'),
(24, 'City of God', 2002, '021435d7-44a9-4bb2-b1f7-0147f9f11d46.jpg'),
(25, 'Interstellar', 2014, 'eddfe548-a3b1-4ff6-ae89-224506c885cf.jpg'),
(26, 'Life Is Beautiful', 1997, '73692a41-c36c-4909-936a-2828f2e13629.jpg'),
(27, 'The Green Mile', 1999, '14068ec0-c41b-4670-8f68-d3c8fbaa33a3.jpg'),
(28, 'Star Wars: Episode IV - A New Hope', 1977, '5997d80e-632f-4419-9142-372df7c6b02d.jpg'),
(29, 'Terminator 2: Judgment Day', 1991, 'b688e58a-71be-4e1c-8221-150d32faa0fd.jpg'),
(30, 'Back to the Future', 1985, '17e7ce01-d872-475a-baea-fc5b5ad5e9ef.jpg'),
(31, 'Spirited Away', 2001, '548b9830-c05a-4a46-81e2-8dc0d893ab25.jpg'),
(32, 'The Pianist', 2002, '7f2b3f01-baa4-4bf0-a9b4-cf2f9705cf9b.jpg'),
(33, 'Psycho', 1960, 'cbcdafce-a528-4f75-89ce-3ca9a07cfc27.jpg'),
(34, 'Parasite', 2019, '107f11b0-3987-44b6-9d80-7308980de290.jpg'),
(35, 'Léon: The Professional', 1994, '0865651b-b33b-4ef7-a80d-7efdd350d470.jpg'),
(36, 'The Lion King', 1994, '2607834b-422b-4d64-a2f4-e9fc23b4b027.jpg'),
(37, 'Gladiator', 2000, '47faefbe-459f-4d98-9311-fcd78874cb85.jpg'),
(38, 'American History X', 1998, '7f3ea20a-a334-4ed2-a9d4-d9543d656e97.jpg'),
(39, 'The Departed', 2006, 'ccd81ead-71c3-46ed-a78e-537e6718d8ff.jpg'),
(40, 'The Usual Suspects', 1995, '05ec61a1-2f98-4652-a4d9-215edc099bcd.jpg'),
(41, 'The Prestige', 2006, 'c20328bb-7eec-466f-b870-e3efd0d9fac9.jpg'),
(42, 'Whiplash', 2014, 'b81f64ce-3574-43b8-87d4-ba4b93999f9e.jpg'),
(43, 'Casablanca', 1942, 'e30af0f3-a5ee-4def-af1b-6f5722436a77.jpg'),
(44, 'Harakiri', 1962, 'eb158681-a6f2-4b95-bf72-a19506e65319.jpg'),
(45, 'Grave of the Fireflies', 1988, '52232af5-5453-47b9-af07-3589be511b60.jpg'),
(46, 'The Intouchables', 2011, '11b611b5-cf62-4dcb-b899-9d02fcafcdc3.jpg'),
(47, 'Modern Times', 1936, 'e40ec51b-9de6-451d-9b13-08fa895bb1e3.jpg'),
(48, 'Once Upon a Time in the West', 1968, '34a87895-a66e-4ba9-b1e4-7aa1148891ee.jpg'),
(49, 'Rear Window', 1954, '55a90e47-fd93-4467-8371-f65948942840.jpg'),
(50, 'Cinema Paradiso', 1988, 'aa6ec53e-a2f7-40a5-8a7a-02effc76f485.jpg'),
(51, 'Alien', 1979, 'fe6995ae-3883-470e-947c-500be0fa546a.jpg'),
(52, 'City Lights', 1931, 'a56d9489-9a3d-4686-8016-391cf7e134e9.jpg'),
(53, 'Apocalypse Now', 1979, 'a4847699-d9f9-4ccb-84aa-7bd2fe50681b.jpg'),
(54, 'Memento', 2000, '201cd9ec-b9ab-4faa-9496-a40ffb8c52bc.jpg'),
(55, 'Django Unchained', 2012, '98d9e59c-7212-45ba-8ac4-abde3e4a260d.jpg'),
(56, 'Indiana Jones and the Raiders of the Lost Ark', 1981, 'c2e3a8d8-4081-48e2-b502-311c3a72b7b9.jpg'),
(57, 'WALL·E', 2008, 'ce5f4723-dc8f-4045-9313-ce616d1caa23.jpg'),
(58, 'The Lives of Others', 2006, '9e29d43c-d824-4778-b9cf-f84c4ab1dc60.jpg'),
(59, 'Sunset Blvd.', 1950, 'cac391f6-c050-4363-a316-32c3b771751f.jpg'),
(60, 'Paths of Glory', 1957, 'd43d5ac9-5377-4cbb-9c84-1206db9ed74c.jpg'),
(61, 'The Shining', 1980, 'dfc3e5c5-294b-4468-b456-320ec0c89bf8.jpg'),
(62, 'The Great Dictator', 1940, '36af35cd-9f97-4ad4-acf2-140bad7e7a5b.jpg'),
(63, 'Avengers: Infinity War', 2018, 'd442cb8e-5de6-420c-b9ba-3f19c41039f4.jpg'),
(64, 'Witness for the Prosecution', 1957, '68fe3d5b-2f62-4ac9-a54f-dd7839bc50fb.jpg'),
(65, 'Aliens', 1986, '535fc333-ba63-4c22-8bed-b392931332da.jpg'),
(66, 'Spider-Man: Into the Spider-Verse', 2018, 'a47a221b-9e76-4b54-9463-c704a2079252.jpg'),
(67, 'American Beauty', 1999, '1ce5b573-e164-424c-acb4-8c927266da8b.jpg'),
(68, 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', 1964, 'ececedd5-8965-483a-b3f8-7290966a5e5a.jpg'),
(69, 'The Dark Knight Rises', 2012, 'a72a5531-5de8-45e4-95c9-205151d2ce40.jpg'),
(70, 'Oldboy', 2003, '5ee54ed3-de04-4507-b8d4-40fc6af3ea4b.jpg'),
(71, 'Inglourious Basterds', 2009, 'af4b8f98-bb56-4d29-8f55-001c3efa873a.jpg'),
(72, 'Amadeus', 1984, '7b443351-1cf3-40a5-aed7-d94a05a2eb8d.jpg'),
(73, 'Coco', 2017, '8d7c6670-f2ff-46d1-9166-600dd3c0aca1.jpg'),
(74, 'Toy Story', 1995, '2af0848d-718d-42b8-b270-ad6c3b2aaed3.jpg'),
(75, 'Joker', 2019, '624a20c5-b7fe-4c0a-90eb-c6b54156ef09.jpg'),
(76, 'Braveheart', 1995, '137155ca-e5f4-4a11-875c-44c7caf362c0.jpg'),
(77, 'The Boat', 1981, '582ef6af-77dd-402f-9d68-859ef745c7b9.jpg'),
(78, 'Avengers: Endgame', 2019, '05030d9f-3c5b-412c-84f7-64feb3609726.jpg'),
(79, 'Princess Mononoke', 1997, '1e8eff57-afa0-443b-a4b0-b220b5fe1f08.jpg'),
(80, 'Once Upon a Time in America', 1984, 'ce6620c8-3b20-4d2b-88a5-17f6c4256c39.jpg'),
(81, 'Good Will Hunting', 1997, 'b3790c68-1980-4be2-9229-5dd227cf407a.jpg'),
(82, 'Your Name.', 2016, '012b2a66-a3b6-416c-bd05-9a176e4c4f78.jpg'),
(83, 'Singin\' in the Rain', 1952, 'fed843cc-8cfb-4b53-99e9-5c6217c184c6.jpg'),
(84, '3 Idiots', 2009, '418af7f3-d26d-4f6e-8c9c-8e7ae69ee220.jpg'),
(85, 'Requiem for a Dream', 2000, '3a78441f-8a6f-425d-82d5-886f6f8192ed.jpg'),
(86, 'High and Low', 1963, 'd57179ae-4175-471c-9661-806b5c104050.jpg'),
(87, 'Toy Story 3', 2010, '897195de-96c1-45f9-9f1e-e2ec47e5d1d2.jpg'),
(88, 'Capernaum', 2018, 'a195c836-35a9-4f17-9e11-b1b1b5f03478.jpg'),
(89, 'Star Wars: Episode VI - Return of the Jedi', 1983, '9314a915-bd66-4904-bbdd-ac1a46107af4.jpg'),
(90, '2001: A Space Odyssey', 1968, '3cc8936a-f484-49db-92e3-5196d02a4c3c.jpg'),
(91, 'Eternal Sunshine of the Spotless Mind', 2004, '4265b5d2-753b-4d40-948d-22d0378bd22a.jpg'),
(92, 'Reservoir Dogs', 1992, '2cde8d10-506c-4455-b80f-22fbf4556ae4.jpg'),
(93, 'Come and See', 1985, '2f6eab99-1429-408d-ad29-8d5ba0817b89.jpg'),
(94, 'The Hunt', 2012, '46852386-28ab-4078-912c-270438a662f9.jpg'),
(95, 'Citizen Kane', 1941, '80e80336-5aea-4291-ba05-58addaa30714.jpg'),
(96, 'M', 1931, 'f4e7d692-6d4e-4fd9-bcbf-94a3c67ebda2.jpg'),
(97, 'Lawrence of Arabia', 1962, 'a28e0a53-d542-407a-867f-c2d9738c2ad9.jpg'),
(98, 'North by Northwest', 1959, '4d574885-85c2-4548-8752-858da1c52ec1.jpg'),
(99, 'Ikiru', 1952, '28b8d73f-0c37-47bd-bd2d-ba17fca37b8d.jpg'),
(100, 'Vertigo', 1958, '9d10c95a-6918-4ae4-8fb3-910be9edea22.jpg'),
(101, 'The Apartment', 1960, '19eb6c28-03eb-4ae6-8494-c641d8cb5123.jpg'),
(102, 'Amélie', 2001, '1e64a155-b9c1-4a38-835a-98fb01a5dcc9.jpg'),
(103, 'A Clockwork Orange', 1971, 'ca50ca20-ba43-48f4-9c8e-a0f6f842363a.jpg'),
(104, 'Double Indemnity', 1944, '09df3a5c-6d89-4d30-a17b-7a6884f5b58d.jpg'),
(105, 'Full Metal Jacket', 1987, '05b9817c-6f14-45a7-b044-c502cb89ef67.jpg'),
(106, 'Scarface', 1983, '6913bced-0ee4-4099-8e5d-74280fc14a2c.jpg'),
(107, 'Hamilton', 2020, 'b70e05fb-7ceb-4c5a-b231-cf81e9228ba5.jpg'),
(108, 'Incendies', 2010, 'acddb342-2fd5-414a-a5e2-e7207d9722e9.jpg'),
(109, 'Top Gun: Maverick', 2022, '30c80bca-f58f-431f-9424-8e53e4a7515a.jpg'),
(110, 'To Kill a Mockingbird', 1962, '7d3de159-ea9a-4dba-8962-5bc71e9dbe74.jpg'),
(111, 'Heat', 1995, 'a8f32756-e04a-45c7-8345-4f068a19dec8.jpg'),
(112, 'The Sting', 1973, 'fab45c77-4683-4051-a2e9-6a8d74ea53bd.jpg'),
(113, 'Up', 2009, '543bb6f1-84d0-48a7-b618-5ef89ae7e156.jpg'),
(114, 'A Separation', 2011, '4cdef31e-bbca-4537-9bd4-53b5c3fb8e73.jpg'),
(115, 'Metropolis', 1927, '9ddb0824-c602-4045-8ccf-a9d56131310b.jpg'),
(116, 'Taxi Driver', 1976, '1ff251be-9d3b-4ed6-a36f-858d74047f45.jpg'),
(117, 'L.A. Confidential', 1997, '8696b8d2-2f0a-4d7c-8c1d-4db5110c49dd.jpg'),
(118, 'Die Hard', 1988, '9ddd171b-cc63-4b6e-84f3-c4577210de5a.jpg'),
(119, 'Snatch', 2000, 'd26cfb04-634d-48bd-81ed-c309fe63340d.jpg'),
(120, 'Indiana Jones and the Last Crusade', 1989, 'e2846bc9-0b3d-4f8d-9971-7fb509f64895.jpg'),
(121, 'Bicycle Thieves', 1948, '20db6198-fa97-4c26-b1fc-72acfdde73d9.jpg'),
(122, 'Like Stars on Earth', 2007, 'de5b1861-09b4-4131-9e61-21aff5b310a5.jpg'),
(123, '1917', 2019, 'aa021c24-8220-4135-a559-40cf9db80834.jpg'),
(124, 'Downfall', 2004, '5fca4d54-b6fa-4fa1-beda-9a994c161dee.jpg'),
(125, 'Dangal', 2016, '76a6d869-b773-4c52-aa1e-35be49bf3210.jpg'),
(126, 'For a Few Dollars More', 1965, 'f7fafea2-d3d9-4b01-82d7-145a8ada9b12.jpg'),
(127, 'Batman Begins', 2005, '61e8f723-158f-4e2f-9094-f03ebd14d648.jpg'),
(128, 'The Kid', 1921, '0ffcea34-38b8-41b2-933f-9c59527e7987.jpg'),
(129, 'Some Like It Hot', 1959, '341cd39e-6e26-449c-bae4-89168e7973e0.jpg'),
(130, 'The Father', 2020, '115f19b0-3308-423b-be78-c54fdd11de2f.jpg'),
(131, 'All About Eve', 1950, 'ce4d81dc-afbd-4a46-abd5-a5be6ed5a12a.jpg'),
(132, 'The Wolf of Wall Street', 2013, 'e7510b29-20f7-4944-be8d-47c5cd1d0735.jpg'),
(133, 'Green Book', 2018, '9c4b932f-58e8-4b1a-aeed-d069d4cb0b52.jpg'),
(134, 'Judgment at Nuremberg', 1961, '5b997a5c-f588-4940-ab2d-4275fd8462f4.jpg'),
(135, 'Ran', 1985, '2184041c-1b8e-42fd-910d-0eb20c9c61c3.jpg'),
(136, 'Casino', 1995, 'bcc8e9b7-3c3f-4485-acd1-3f2c405e38a7.jpg'),
(137, 'The Truman Show', 1998, 'a6e35684-bae2-4836-8d54-2475c32022f1.jpg'),
(138, 'Pan\'s Labyrinth', 2006, '6e2ce0af-2d5d-4b1f-b6b8-be14ae7a4440.jpg'),
(139, 'There Will Be Blood', 2007, '49dbf483-f11e-44a2-a3f6-313dd140aa66.jpg'),
(140, 'Unforgiven', 1992, '02b18dc4-9b6d-49f1-9b67-7ef9d391ea38.jpg'),
(141, 'The Sixth Sense', 1999, '010a86dd-1845-4b16-852a-03dc4893ccd1.jpg'),
(142, 'Shutter Island', 2010, '01869d07-9096-45c3-9fa9-d61d88730dfb.jpg'),
(143, 'A Beautiful Mind', 2001, '6fcd3130-7705-42a4-857d-fb70a482a17e.jpg'),
(144, 'Jurassic Park', 1993, 'b6cc2ec6-ac5f-4a31-8c85-3934a7bdc83c.jpg'),
(145, 'Yojimbo', 1961, 'bb892b89-938f-4c80-a112-1bcf15f24862.jpg'),
(146, 'The Treasure of the Sierra Madre', 1948, '24937325-8efd-4a52-8a5c-546ed55eb963.jpg'),
(147, 'Monty Python and the Holy Grail', 1975, 'd4c1849f-3caf-4113-b538-345150b0ff95.jpg'),
(148, 'The Great Escape', 1963, '2f98ac74-7883-404b-a9db-388ffcc51711.jpg'),
(149, 'No Country for Old Men', 2007, 'de491734-d6e8-4165-8b05-8e668911113a.jpg'),
(150, 'Kill Bill: Vol. 1', 2003, '8b1c5ff1-987b-4aa5-8918-8761d2cbd8a4.jpg'),
(151, 'Rashomon', 1950, '274b19ce-77b4-4ee7-b4bf-0f8090cc0ee7.jpg'),
(152, 'Spider-Man: No Way Home', 2021, 'd224c8ea-29fe-468a-8e84-0ff6a1240910.jpg'),
(153, 'The Thing', 1982, '682cc695-6741-4a26-8319-a85becabdcff.jpg'),
(154, 'Finding Nemo', 2003, 'e0b55f51-4744-4e9b-8e55-e8c52f362eb6.jpg'),
(155, 'The Elephant Man', 1980, 'bc139dc2-bfe8-4e8b-8eda-b7a4242dee48.jpg'),
(156, 'Chinatown', 1974, '15a578fc-b53a-4dfa-8f41-2d9bb977cec8.jpg'),
(157, 'Raging Bull', 1980, '07808553-d6d7-4c6a-a7bf-ed5c96c4a0e4.jpg'),
(158, 'V for Vendetta', 2005, '25d628e7-7c3e-4c6b-bba7-06d06ef7aeea.jpg'),
(159, 'Gone with the Wind', 1939, '87f800f9-2cbb-435b-aaa5-f7951bfeb552.jpg'),
(160, 'Lock, Stock and Two Smoking Barrels', 1998, '9e5d1c35-08af-45cf-9642-8f3b359553ff.jpg'),
(161, 'Inside Out', 2015, '0f56ef33-b280-4c74-92cb-57dc8cde34a5.jpg'),
(162, 'Dial M for Murder', 1954, '2103aaf2-bd6d-428f-9bc3-8302f2d3cf41.jpg'),
(163, 'The Secret in Their Eyes', 2009, '59f3cc4f-58a3-409f-b21e-6e5643db92bf.jpg'),
(164, 'Howl\'s Moving Castle', 2004, '140ba3f3-7b4e-467f-b20b-e17c2ee8c031.jpg'),
(165, 'Three Billboards Outside Ebbing, Missouri', 2017, 'f884d8fb-485c-4b1d-8432-5e9931e61838.jpg'),
(166, 'The Bridge on the River Kwai', 1957, 'ee9b8327-6535-4ee4-ac13-cf4145a16c6d.jpg'),
(167, 'Trainspotting', 1996, '1a2c0b80-dd14-45de-9eb0-7f58a9b85305.jpg'),
(168, 'Prisoners', 2013, 'aff78ebe-9c58-4614-9cd6-bcbbdb137cd4.jpg'),
(169, 'Warrior', 2011, '04082a6b-2722-4fd2-8b79-0fe76d813719.jpg'),
(170, 'Fargo', 1996, '8146e495-edd3-4ae1-a7f4-ca7f82214756.jpg'),
(171, 'Gran Torino', 2008, '8909840f-2c54-4572-a0cd-d0bd14cf51b7.jpg'),
(172, 'My Neighbor Totoro', 1988, '1926fd8f-f02d-43d9-bd2e-9a8c533b8a80.jpg'),
(173, 'Catch Me If You Can', 2002, '7a37eabc-d4e0-4ddb-8a27-d1cbbdb5837e.jpg'),
(174, 'Million Dollar Baby', 2004, '6c85ed23-f0de-4dfc-9bf3-7ec07ca67c59.jpg'),
(175, 'Children of Heaven', 1997, 'be08aad4-eeda-4f5f-8855-d490a9b7d991.jpg'),
(176, 'Blade Runner', 1982, 'b46b1f2a-3b2b-4e9a-b486-2d94c1e58b2b.jpg'),
(177, 'The Gold Rush', 1925, '869ad1db-30ae-4a60-b4a8-1f3733b46e8b.jpg'),
(178, 'Before Sunrise', 1995, '0a665be1-ff17-4dd5-bb90-36bcd96f3711.jpg'),
(179, 'Klaus', 2019, 'c82612f1-5735-4af9-98b4-af517da69267.jpg'),
(180, '12 Years a Slave', 2013, '7e690b44-206c-4da6-80d5-9fabcd906d7b.jpg'),
(181, 'Harry Potter and the Deathly Hallows: Part 2', 2011, 'f49ad28c-6a90-4a9b-a2f9-b28313653d28.jpg'),
(182, 'On the Waterfront', 1954, '0535da43-dc46-41a8-b539-e6f66a55a88c.jpg'),
(183, 'Ben-Hur', 1959, '6cdbbaba-ef5e-4175-83de-a977bbb37c8e.jpg'),
(184, 'The Grand Budapest Hotel', 2014, 'ac701486-c8fe-4ccf-a773-befa867d4f49.jpg'),
(185, 'Gone Girl', 2014, 'f1b3920c-5e70-491f-a6fb-bb84884cb324.jpg'),
(186, 'Wild Strawberries', 1957, 'a8704620-a1ff-4d7e-be20-3ce02e0a167d.jpg'),
(187, 'The General', 1926, '5e1df3c9-62c3-4bdc-be18-00797318aa5e.jpg'),
(188, 'The Third Man', 1949, '7204d644-14f6-4b7e-9d43-c03bbfb4c61a.jpg'),
(189, 'In the Name of the Father', 1993, 'd88cdb69-17e1-473e-942d-6e9c8f7768c0.jpg'),
(190, 'Barry Lyndon', 1975, '3a03b7db-c09a-4582-bfd7-917685497a19.jpg'),
(191, 'The Deer Hunter', 1978, 'd61baa42-d613-46ab-acd1-1bc11ce5746c.jpg'),
(192, 'Hacksaw Ridge', 2016, '8132feb7-8cee-415e-98f7-f51edb2239d6.jpg'),
(193, 'The Wages of Fear', 1953, '98efe4d4-9f3d-44c6-a730-3cc97683dad1.jpg'),
(194, 'Memories of Murder', 2003, '41432470-f222-429f-8a94-e4215ca31775.jpg'),
(195, 'Sherlock Jr.', 1924, 'a8c67b25-4a6d-44b8-b9f2-258120715013.jpg'),
(196, 'Wild Tales', 2014, '7492a1c9-4751-44ed-ae2e-ef64d72282e3.jpg'),
(197, 'Mr. Smith Goes to Washington', 1939, 'c1f1c03a-fda2-4ff7-83b2-4ba5d2ce1bc4.jpg'),
(198, 'Mad Max: Fury Road', 2015, '364dd510-5754-42c6-954f-17e258b1f68d.jpg'),
(199, 'Mary and Max', 2009, '5365b4b6-75cf-436c-83b3-f290d824c0a7.jpg'),
(200, 'The Seventh Seal', 1957, 'bd785993-b4b3-4003-a803-3385334dfa72.jpg'),
(201, 'How to Train Your Dragon', 2010, '67b69998-0db1-4af0-98ad-4be8ce421ce8.jpg'),
(202, 'Room', 2015, 'd4d33a6b-8ad3-4dae-b494-bc87828ffc01.jpg'),
(203, 'Monsters, Inc.', 2001, '681d0cfd-296d-46f2-8cca-f19c0382d744.jpg'),
(204, 'Jaws', 1975, 'a835c3ed-eeb4-48f4-aa7c-3295aaa9ce99.jpg'),
(205, 'Dead Poets Society', 1989, 'ed65eada-b1ae-41d4-a27a-35e31f6fc5fa.jpg'),
(206, 'The Big Lebowski', 1998, '1086823b-9ce6-403d-982e-c00ea5e59c35.jpg'),
(207, 'Tokyo Story', 1953, '8e14c8cf-a964-4d26-81e3-0b8922a73a39.jpg'),
(208, 'The Passion of Joan of Arc', 1928, 'cd04576a-64a7-45e8-9a11-e004a34f8f30.jpg'),
(209, 'Ford v Ferrari', 2019, '9fc47ab5-8eae-494f-af81-04542b3ffc0c.jpg'),
(210, 'Hotel Rwanda', 2004, 'd53fffa0-4465-4fc0-a4d7-aee9363885d3.jpg'),
(211, 'Rocky', 1976, '586352c4-5b02-4678-a044-a9e1488a45aa.jpg'),
(212, 'Platoon', 1986, 'e2ad0287-6040-457a-bad4-e596b3c4cbd0.jpg'),
(213, 'Ratatouille', 2007, 'd62fddea-d1c5-429b-a36d-5551c09e94da.jpg'),
(214, 'Spotlight', 2015, '58e66e0c-e124-4359-9f27-e2680cf3327a.jpg'),
(215, 'The Terminator', 1984, 'a896d44e-30a0-4ccd-8103-658199de1f9c.jpg'),
(216, 'Logan', 2017, 'bb80c4d8-4ed4-4d2d-a1a8-842c5308680e.jpg'),
(217, 'Stand by Me', 1986, 'd95d2474-bd1b-46af-9419-e95dc6a8e6d1.jpg'),
(218, 'Rush', 2013, 'de16e196-fb30-43d9-a2df-a02a14e2d844.jpg'),
(219, 'Network', 1976, '2ce912af-f04a-47b4-86aa-59ffeefbe283.jpg'),
(220, 'Before Sunset', 2004, 'e13fa82f-c2ca-412e-8aee-7f75738e0c35.jpg'),
(221, 'Into the Wild', 2007, '2d601248-46d6-4fd6-9496-1e8213b43952.jpg'),
(222, 'The Wizard of Oz', 1939, 'e2192130-9adf-4aad-93d0-bf3176de8607.jpg'),
(223, 'Pather Panchali', 1955, 'ca491e98-ad3b-4380-9e4d-fd8cf07a3e04.jpg'),
(224, 'Groundhog Day', 1993, 'cd990e1a-a58c-40ed-beb1-8f643af3c4cb.jpg'),
(225, 'The Best Years of Our Lives', 1946, 'a3895e1b-0acb-4030-8f6d-3c59491fad22.jpg'),
(226, 'The Exorcist', 1973, 'b29fd03b-7d88-4466-b639-05224dd14b66.jpg'),
(227, 'To Be or Not to Be', 1942, '916b4026-e2a8-4fc6-9614-95db9b5714b1.jpg'),
(228, 'The Incredibles', 2004, 'a5bcc062-baf8-4f5b-9746-fd8195e9ddee.jpg'),
(229, 'La haine', 1995, '2fb4257b-5512-4a8a-9ef0-e32360f7c5df.jpg'),
(230, 'Pirates of the Caribbean: The Curse of the Black Pearl', 2003, '4a3f06c4-a20d-441c-bd80-d0351e9a3b04.jpg'),
(231, 'The Battle of Algiers', 1966, '99726b29-1657-4856-b0ff-0f1ff5808f29.jpg'),
(232, 'The Grapes of Wrath', 1940, '6280eeb0-c3ae-461c-b4d5-0f8954acbd96.jpg'),
(233, 'Hachi: A Dog\'s Tale', 2009, '2e123c2c-3027-4fcc-8b58-4b0ace312bd8.jpg'),
(234, 'Jai Bhim', 2021, 'b68680ef-1d5f-4b9d-b8bd-269e831d7c4c.jpg'),
(235, 'My Father and My Son', 2005, '327dfdd4-c5dd-4ecb-a71b-d0fb8252ed40.jpg'),
(236, 'Amores Perros', 2000, 'e24ae65c-dab5-4ac6-b0cc-74c97946b452.jpg'),
(237, 'Rebecca', 1940, '12cc1d81-31cc-4395-911f-6a3d946939a0.jpg'),
(238, 'Cool Hand Luke', 1967, '89f62154-1cc8-4be3-98df-a026e0822b8e.jpg'),
(239, 'The Handmaiden', 2016, '22717bfd-ab6a-4c8a-9d55-617d9ceef3f2.jpg'),
(240, 'The 400 Blows', 1959, '49209c9b-8abb-4f1a-a4a3-303cfb445943.jpg'),
(241, 'The Sound of Music', 1965, '40bbd170-d1c3-4843-a554-484b0e8182dc.jpg'),
(242, 'It Happened One Night', 1934, '0329a34c-bff2-44b2-9448-5287a6b1da5d.jpg'),
(243, 'Persona', 1966, '04c561e9-4ec4-4e7c-bf5a-7bd02ad0d6df.jpg'),
(244, 'Life of Brian', 1979, 'bf960b42-4b42-43fa-86a3-a062471f3d32.jpg'),
(245, 'The Iron Giant', 1999, '7d53092a-4f8a-4dd9-bc82-950077bbcb85.jpg'),
(246, 'Dersu Uzala', 1975, '31fa8e3f-2390-4435-9d4e-e339be50b2f8.jpg'),
(247, 'The Help', 2011, 'b282efbf-6a5a-4cfe-8f4d-da0312dbae20.jpg'),
(248, 'Aladdin', 1992, '49ced844-6349-4acc-a55f-1c49c562d7bb.jpg'),
(249, 'Gandhi', 1982, '659a88c6-bc14-48df-8c19-fa1b5c07b813.jpg'),
(250, 'Dances with Wolves', 1990, '6f2aca9b-a8c4-4e64-a9e5-3910a446673d.jpg'),
(251, 'Ant-Man and the Wasp: Quantumania', 2023, '218ad21c-9cd0-4dbc-a636-b29cac6d4e1f.jpg'),
(252, 'Cocaine Bear', 2023, 'ce92ba28-a6c8-4be9-ae51-af421b0f11c5.jpg'),
(253, 'The Whale', 2022, '87f3b265-bcc0-4d2b-addc-3fcd322135c7.jpg'),
(254, 'Babylon', 2022, '47e36b82-18b5-4bac-bd09-9c634826f25f.jpg'),
(255, 'Knock at the Cabin', 2023, '0d389d95-5c7b-44ce-8fef-d5e7b9a8f4a5.jpg'),
(256, 'Sharper', 2023, '9acc3594-a98c-41d5-84fc-2d5d6324fcad.jpg'),
(257, 'The Banshees of Inisherin', 2022, 'b714500e-c103-418e-9e94-cae1956e0ac7.jpg'),
(258, 'Winnie the Pooh: Blood and Honey', 2023, '5a951247-bcc4-4dd3-9708-f2384c425550.jpg'),
(259, 'Avatar: The Way of Water', 2022, '4717dfd4-1e45-447e-b14e-1adfa8690bba.jpg'),
(260, 'Black Panther: Wakanda Forever', 2022, 'b1e90285-780f-4738-af82-08a719cb307a.jpg'),
(261, 'Everything Everywhere All at Once', 2022, 'd440485b-5956-4529-aef9-f135a297b209.jpg'),
(262, 'All Quiet on the Western Front', 2022, '0ab34a8c-09f9-4896-825e-9ab7f09a74b7.jpg'),
(263, 'Infinity Pool', 2023, '3939e2ee-7695-415f-b3d2-2d5d7a9526c8.jpg'),
(264, 'Your Place or Mine', 2023, '01690f9f-b520-4270-a15a-e8985a76252a.jpg'),
(265, 'The Menu', 2022, '1dd6a08e-ee99-45fc-99d5-7e2f04313b75.jpg'),
(266, 'Puss in Boots: The Last Wish', 2022, '07b5ffdb-116a-4659-af4d-96a0225a365b.jpg'),
(267, 'M3GAN', 2022, '13a12b5b-b775-40f4-b230-d9b7a0a1bd88.jpg'),
(268, 'Bullet Train', 2022, '8d350b0a-30dc-4108-8e12-86bf30168fe7.jpg'),
(269, 'The Fabelmans', 2022, '5c4b9977-b05c-4820-8316-bf5dbadc3eab.jpg'),
(270, 'The Woman King', 2022, '44cc9a52-2b48-41ad-b4d5-5c193cbb005f.jpg'),
(271, 'The Strays', 2023, '385ec846-3e40-4df3-9568-ee57126f2d0b.jpg'),
(272, 'Tár', 2022, '0fd85161-90aa-4c33-9ac7-d65e8c658a79.jpg'),
(273, 'Women Talking', 2022, 'fa36c099-d8f2-41fe-a48f-c5cbc6f040e6.jpg'),
(274, 'Triangle of Sadness', 2022, '869363d8-05ed-4012-8e87-86ea4916d559.jpg'),
(275, 'The Flash', 2023, 'a7e34924-f577-4a5b-be3c-a5396d4562f3.jpg'),
(276, 'We Have a Ghost', 2023, '1e5e2f99-d41c-4bfd-aa21-2eecc8ed9cf8.jpg'),
(277, 'Somebody I Used to Know', 2023, '9dee2026-bfee-49f5-b89a-0ed27a1f319d.jpg'),
(278, 'White Noise', 2022, '836de870-a41d-4b20-9456-2c61c8945cab.jpg'),
(279, 'John Wick: Chapter 4', 2023, '50c5f513-f7cd-45c4-b98c-5ac1678d5c55.jpg'),
(280, 'Plane', 2023, '31dd5690-ae2f-4b38-ac2e-2d0677b8f3ef.jpg'),
(281, 'The Little Mermaid', 2023, '77cab7d6-b962-4d9f-920c-e17bc9022b1d.jpg'),
(282, 'Aftersun', 2022, 'bd5fe7ef-d78b-43d2-8d06-41525fdeffee.jpg'),
(283, 'Creed III', 2023, 'b6d89253-bf21-4e9d-b0b6-98c3a794074e.jpg'),
(284, 'Jesus Revolution', 2023, '805942a5-167d-453e-8d04-83a096f4672b.jpg'),
(285, 'Glass Onion', 2022, '84c33afb-7056-4239-8b2d-f6039ba8abf5.jpg'),
(286, 'You People', 2023, '7cfe391b-1029-44e5-8afa-951ba240a288.jpg'),
(287, 'Titanic', 1997, '79cbfa59-cd20-4233-80e7-a8461e5c815d.jpg'),
(288, 'Magic Mike\'s Last Dance', 2023, '9fd0f1d3-3a21-41b2-87e4-e910c7d77f43.jpg'),
(289, 'Ant-Man', 2015, '5958a0c1-5194-4b5a-8d6f-913506919d9e.jpg'),
(290, 'X', 2022, '65a28d5a-15f3-4d88-bc93-999879045695.jpg'),
(291, 'Scream VI', 2023, '87493816-ee77-4cd7-af80-c352d1487d56.jpg'),
(292, 'Shehzada', 2023, '10823e81-ef70-443d-8bda-47cf12443e30.jpg'),
(293, 'A Man Called Otto', 2022, 'afed8a0b-3049-45d8-b892-dfd2a309a5b5.jpg'),
(294, 'Operation Fortune: Ruse de guerre', 2023, 'ab90ff19-eec3-428b-9df1-d7b3d3f51369.jpg'),
(295, '2 Guns', 2013, '333975db-87ca-4c02-9901-536cb0662b3b.jpg'),
(296, 'Ant-Man and the Wasp', 2018, '69f326fc-64a5-4274-bc40-0a262ad21d13.jpg'),
(297, 'Elvis', 2022, 'bda535c2-12c6-4cc6-857b-404ccc8780f7.jpg'),
(298, 'Boston Strangler', 2023, '18620411-cbf1-4946-9444-9f3cfc5dcb05.jpg'),
(299, 'Harry Potter and the Sorcerer\'s Stone', 2001, '69b36e03-3503-4c74-8081-4a8bf7d6209c.jpg'),
(300, 'The Pale Blue Eye', 2022, '11895240-4092-4506-811d-9b16cc3bb676.jpg'),
(301, 'The Batman', 2022, '121bc22d-f2e4-43bf-8afa-6d877f0662bc.jpg'),
(302, 'Missing', 2023, '37d8fc64-ba77-4c2f-b34d-2b83e7b3f9b9.jpg'),
(303, 'Empire of Light', 2022, 'fb2cca81-5e5e-446b-a689-5b5907691309.jpg'),
(304, 'Tetris', 2023, 'fecf81ad-712c-4009-b839-71b68be39286.jpg'),
(305, 'Shotgun Wedding', 2022, '7df0e956-c8c6-4c69-a3bc-91e6b6ea139c.jpg'),
(306, 'The Super Mario Bros. Movie', 2023, '4920ccb4-a456-4b90-9491-b57fa6c930cb.jpg'),
(307, 'Unlocked', 2023, 'fb43c17e-b3c0-4ef2-a636-3b9bad434385.jpg'),
(308, 'Smile', 2022, '857ca5fa-4f10-4df6-b25d-6652b8336149.jpg'),
(309, 'Top Gun', 1986, 'f7ce4aa2-8d0e-4aa3-a0d6-dff21a0ca1ac.jpg'),
(310, '65', 2023, '49673aab-2250-4898-ab15-399e8596d6d4.jpg'),
(311, 'The Unbearable Weight of Massive Talent', 2022, '5b3be0ec-75f3-4fd7-a8cb-d068c9c152ed.jpg'),
(312, 'Fast X', 2023, 'b85b146f-e45f-4cfa-8507-bee2d8ff0902.jpg'),
(313, 'Don\'t Worry Darling', 2022, 'bc8452ca-ff77-493d-938f-74999f14dbcf.jpg'),
(314, 'Marlowe', 2022, '1d709ce5-a5ce-4610-9958-8120d35435c5.jpg'),
(315, 'Guardians of the Galaxy Vol. 3', 2023, '36fcd11c-52d6-4c2d-b101-2ed1aebd00d6.jpg'),
(316, 'Once Upon a Time in Hollywood', 2019, 'a39bea3f-2443-4c0e-a7e9-80953f562aab.jpg'),
(317, 'Sisu', 2022, '9761aa34-c21b-46ea-8d40-fc29aae2bfc0.jpg'),
(318, 'Air', 2023, '4d090348-c2d8-49c8-ac80-9cdf73608351.jpg'),
(319, 'Amsterdam', 2022, '19e1dd67-de08-4d9b-80a8-6c0835047e22.jpg'),
(320, 'Avatar', 2009, 'b6c7f27c-c071-4b14-a36f-d3ed6ed69603.jpg'),
(321, '80 for Brady', 2023, 'c9bec61a-a540-4f39-95da-e577aeb18619.jpg'),
(322, 'The VelociPastor', 2018, '45c5538b-6d06-4669-b355-4a72ac238528.jpg'),
(323, 'Where the Crawdads Sing', 2022, '5c03187a-9b92-4ef2-a44c-1a775307df95.jpg'),
(324, 'Thor: Love and Thunder', 2022, 'd4489210-a422-4908-b1fe-5b36c379e2fa.jpg'),
(325, 'Black Adam', 2022, 'ae4dbe67-5ab2-4662-932c-ed8d470b3d56.jpg'),
(326, 'Magic Mike', 2012, 'a1feb72b-a54e-4deb-8d74-7824f7be6246.jpg'),
(327, 'John Wick', 2014, '2e79d448-19a1-4ba8-b59b-0ec98171b737.jpg'),
(328, 'Jurassic World: Dominion', 2022, '5a7c4ddc-5962-46e4-a1d8-e2281ed9620a.jpg'),
(329, 'Killers of the Flower Moon', 2023, 'd225a767-8f58-4af0-a6c5-385da1f7b9c3.jpg'),
(330, 'Barbarian', 2022, 'f9329da6-d2aa-4058-935a-b3488db55c2c.jpg'),
(331, 'Dungeons & Dragons: Honor Among Thieves', 2023, '5cca8ac9-fd3c-4325-981e-5f796d4d1549.jpg'),
(332, 'Pearl', 2022, '651b14a3-e5ee-41c4-9f10-02f815f6ee5a.jpg'),
(333, 'Love', 2015, 'd6f32fea-1a2b-4b17-ba01-1b36e63aaff4.jpg'),
(334, 'Scream', 2022, '76e8f5b3-42c5-44fa-bcb4-356a6b370a86.jpg'),
(335, 'Knives Out', 2019, '3f2ddddb-6eb2-4f88-96b0-284802f520af.jpg'),
(336, 'Close', 2022, '4a17c9de-1847-40b7-8593-00a1dcbc3f34.jpg'),
(337, 'Dune', 2021, 'fd8886a3-b9e4-4dbe-82ed-3e7445fa6e1d.jpg'),
(338, 'Guillermo del Toro\'s Pinocchio', 2022, '71f03d42-84ae-41bf-9630-7c17d1d7a741.jpg'),
(339, 'Pathaan', 2023, '288e3e56-282e-4569-95ec-9f66677db7d6.jpg'),
(340, 'Nope', 2022, '240225d2-ab3c-4ac7-b878-521d04c1ebb5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `movie_genre`
--

DROP TABLE IF EXISTS `movie_genre`;
CREATE TABLE `movie_genre` (
  `movie_id` int(10) UNSIGNED NOT NULL,
  `genre_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie_genre`
--

INSERT INTO `movie_genre` (`movie_id`, `genre_id`) VALUES
(5, 3),
(5, 10),
(30, 2),
(30, 11),
(38, 3),
(38, 34),
(51, 4),
(51, 11),
(53, 3),
(53, 18),
(53, 19),
(63, 1),
(63, 11),
(65, 4),
(65, 11),
(67, 3),
(72, 3),
(72, 30),
(76, 8),
(78, 1),
(78, 3),
(84, 2),
(84, 5),
(90, 6),
(90, 11),
(102, 5),
(103, 3),
(103, 10),
(114, 3),
(114, 19),
(123, 3),
(123, 8),
(123, 18),
(131, 3),
(143, 3),
(143, 5),
(180, 3),
(180, 34),
(183, 8),
(190, 3),
(190, 6),
(190, 18),
(233, 3),
(236, 3),
(236, 9),
(248, 7),
(248, 15),
(251, 1),
(254, 2),
(254, 3),
(254, 8),
(259, 11),
(262, 1),
(262, 3),
(262, 18),
(282, 3),
(289, 1),
(289, 11),
(293, 2),
(293, 3),
(295, 1),
(295, 9),
(296, 1),
(310, 1),
(310, 11),
(319, 3),
(319, 8),
(320, 11),
(321, 2),
(321, 3),
(330, 4),
(330, 9),
(330, 19);

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(16) NOT NULL,
  `level` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`, `level`) VALUES
(1, 'User', 0),
(2, 'Admin', 255),
(3, 'Moderator', 128);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id` int(10) UNSIGNED NOT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `movie_id` int(10) UNSIGNED NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(36) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `description` varchar(256) DEFAULT NULL,
  `picture_path` varchar(256) DEFAULT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `created_at`, `description`, `picture_path`, `permission_id`) VALUES
(1, 'admin', '2023-02-20', NULL, NULL, 2),
(2, 'guest', '2023-02-23', NULL, NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`who_id`,`whom_id`),
  ADD KEY `whom_id` (`whom_id`),
  ADD KEY `who_id` (`who_id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `256` (`name`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `image_path` (`image_path`);

--
-- Indexes for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD PRIMARY KEY (`movie_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `permission_id` (`permission_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=341;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `auth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`who_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`whom_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD CONSTRAINT `movie_genre_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`),
  ADD CONSTRAINT `movie_genre_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
