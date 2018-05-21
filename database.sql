-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tournamentdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tournamentdb` ;

-- -----------------------------------------------------
-- Schema tournamentdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tournamentdb` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `tournamentdb` ;

-- -----------------------------------------------------
-- Table `tournament`
-- -----------------------------------------------------

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `tournament` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `start_date` DATE NULL,
  `rounds_won` INT NULL DEFAULT 0,
  `rounds_lost` INT NULL DEFAULT 0,
  `rounds_drawn` INT NULL DEFAULT 0,
  `place` INT NULL,
  `type` VARCHAR(100) NULL DEFAULT 'Default',
  `total_players` INT NULL,
  `description` VARCHAR(10000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
USE `tournamentdb` ;


-- -----------------------------------------------------
-- Data for table `tournament`
-- -----------------------------------------------------
START TRANSACTION;
USE `tournamentdb`;
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'Weekend Tournament', '2018-01-01', 3, 3, 0, 5, 'chess', 10, '\'my first chess tournament\'');
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'Easygoing Tournament', '2018-02-01', 4, 1, 1, 3, 'poker', 12, '\'poker with the guys at work\'');
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'Challanging Tournament', '2018-03-01', 2, 6, 1, 15, 'poker', 20, '\'didn\'t do so hot!\'');
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'The Big Grand Prix', '2018-04-01', 10, 3, 1, 2, 'boardgame', 4, '\'just me and my roomates');
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'Regional Finals', '2018-05-01', 5, 6, 2, 10, 'chess', 20, '\'had fun the second time!\'');

COMMIT;
