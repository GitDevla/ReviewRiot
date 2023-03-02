-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Már 02. 16:57
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `reviewriot`
--
CREATE DATABASE IF NOT EXISTS `reviewriot` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `reviewriot`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `auth`
--

DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(256) NOT NULL,
  `password_hash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `auth`
--

INSERT INTO `auth` (`id`, `user_id`, `email`, `password_hash`) VALUES
(1, 1, 'admin', '$2b$10$bp81UrXZs.gBcXgvhR/9y.Eq12VIbqCFJUUn782x0XMPUD7u95wKe'),
(2, 2, 'guest@gmail.com', '$2b$10$jq/0EnvARwAdTzDctfjwgeXH/lMkI9INsRn/3IER17f0TiPDCWYZC');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `follow`
--

DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `who_id` int(10) UNSIGNED NOT NULL,
  `whom_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `genre`
--

DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `genre`
--

INSERT INTO `genre` (`id`, `name`) VALUES
(1, 'Akció'),
(12, 'Animáció'),
(21, 'Anime'),
(14, 'Családi'),
(47, 'Disztópia'),
(13, 'Dokumentum'),
(3, 'Dráma'),
(28, 'Életrajzi'),
(7, 'Fantasy'),
(39, 'Fekete komédia'),
(48, 'Film noir'),
(52, 'Futurisztikus'),
(37, 'Gasztro'),
(53, 'Gengszter'),
(18, 'Háborús'),
(4, 'Horror'),
(35, 'Iskolai'),
(6, 'Kaland'),
(29, 'Katasztrófafilm'),
(27, 'Képregényfilm'),
(55, 'Középkori'),
(10, 'Krimi'),
(20, 'Misztikus'),
(45, 'Mockumentary'),
(15, 'Musical'),
(5, 'Romantikus'),
(11, 'Sci-fi'),
(56, 'Sci-fi kaland'),
(16, 'Sport'),
(22, 'Szatirikus'),
(36, 'Szépirodalmi adaptáció'),
(41, 'Színházi adaptáció'),
(30, 'Szuperhős'),
(46, 'Táncfilm'),
(50, 'Természetfilm'),
(9, 'Thriller'),
(8, 'Történelmi'),
(2, 'Vígjáték'),
(17, 'Western'),
(40, 'Zenei'),
(26, 'Zombis');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `movie`
--

DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(256) NOT NULL,
  `release_date` date NOT NULL,
  `image_path` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `movie_genre`
--

DROP TABLE IF EXISTS `movie_genre`;
CREATE TABLE `movie_genre` (
  `movie_id` int(10) UNSIGNED NOT NULL,
  `genre_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(16) NOT NULL,
  `level` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `permission`
--

INSERT INTO `permission` (`id`, `name`, `level`) VALUES
(1, 'User', 0),
(2, 'Admin', 255),
(3, 'Moderator', 128);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id` int(10) UNSIGNED NOT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `movie_id` int(10) UNSIGNED NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `create_date` date NOT NULL DEFAULT current_timestamp(),
  `is_public` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
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
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `name`, `created_at`, `description`, `picture_path`, `permission_id`) VALUES
(1, 'admin', '2023-02-20', NULL, NULL, 2),
(2, 'guest', '2023-02-23', NULL, NULL, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- A tábla indexei `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`who_id`,`whom_id`),
  ADD KEY `whom_id` (`whom_id`),
  ADD KEY `who_id` (`who_id`);

--
-- A tábla indexei `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `256` (`name`);

--
-- A tábla indexei `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- A tábla indexei `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD PRIMARY KEY (`movie_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- A tábla indexei `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `permission_id` (`permission_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT a táblához `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `review`
--
ALTER TABLE `review`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `auth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Megkötések a táblához `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`who_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`whom_id`) REFERENCES `user` (`id`);

--
-- Megkötések a táblához `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD CONSTRAINT `movie_genre_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`),
  ADD CONSTRAINT `movie_genre_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

--
-- Megkötések a táblához `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

--
-- Megkötések a táblához `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
