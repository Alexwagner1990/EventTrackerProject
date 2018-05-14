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
DROP TABLE IF EXISTS `tournament` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `tournament` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `rounds_won` INT NOT NULL DEFAULT 0,
  `rounds_lost` INT NOT NULL DEFAULT 0,
  `rounds_drawn` INT NOT NULL DEFAULT 0,
  `place` INT NULL,
  `type` VARCHAR(100) NOT NULL DEFAULT 'Default',
  `total_players` INT NULL,
  `description` VARCHAR(10000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
SET SQL_MODE = '';
GRANT USAGE ON *.* TO tournamentplayer@localhost;
 DROP USER tournamentplayer@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
SHOW WARNINGS;
CREATE USER 'tournamentplayer'@'localhost' IDENTIFIED BY 'tournament';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'tournamentplayer'@'localhost';
SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `tournament`
-- -----------------------------------------------------
START TRANSACTION;
USE `tournamentdb`;
INSERT INTO `tournament` (`id`, `name`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'Weekend Tournament', 3, 3, 0, 5, DEFAULT, NULL, NULL);
INSERT INTO `tournament` (`id`, `name`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'Easygoing Tournament', 4, 1, 1, 3, DEFAULT, NULL, NULL);
INSERT INTO `tournament` (`id`, `name`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'Challanging Tournament', 2, 6, 1, 15, DEFAULT, NULL, NULL);
INSERT INTO `tournament` (`id`, `name`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'The Big Grand Prix', 10, 3, 1, 2, DEFAULT, NULL, NULL);
INSERT INTO `tournament` (`id`, `name`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`, `description`) VALUES (DEFAULT, 'Regional Finals', 5, 6, 2, 10, DEFAULT, NULL, NULL);

COMMIT;
