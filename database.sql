-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tournamentdb
-- -----------------------------------------------------
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `tournament`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tournament` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `tournament` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `start_date` DATE NULL,
  `rounds_won` INT NOT NULL DEFAULT 0,
  `rounds_lost` INT NOT NULL DEFAULT 0,
  `rounds_drawn` INT NOT NULL DEFAULT 0,
  `place` INT NULL,
  `type` VARCHAR(100) NOT NULL DEFAULT 'Default',
  `total_players` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `view1` (`id` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `view1`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `view1` ;
SHOW WARNINGS;
DROP TABLE IF EXISTS `view1`;
SHOW WARNINGS;
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
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`) VALUES (DEFAULT, 'Weekend Tournament', '2018-01-01', 3, 3, 0, 5, DEFAULT, NULL);
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`) VALUES (DEFAULT, 'Easygoing Tournament', '2018-02-01', 4, 1, 1, 3, DEFAULT, NULL);
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`) VALUES (DEFAULT, 'Challanging Tournament', '2018-03-01', 2, 6, 1, 15, DEFAULT, NULL);
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`) VALUES (DEFAULT, 'The Big Grand Prix', '2018-04-01', 10, 3, 1, 2, DEFAULT, NULL);
INSERT INTO `tournament` (`id`, `name`, `start_date`, `rounds_won`, `rounds_lost`, `rounds_drawn`, `place`, `type`, `total_players`) VALUES (DEFAULT, 'Regional Finals', '2018-05-01', 5, 6, 2, 10, DEFAULT, NULL);

COMMIT;