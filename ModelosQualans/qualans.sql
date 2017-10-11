-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema qualans
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema qualans
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `qualans` DEFAULT CHARACTER SET utf8 ;
USE `qualans` ;

-- -----------------------------------------------------
-- Table `qualans`.`alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`alumno` (
  `id_alumno` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido_paterno` VARCHAR(45) NOT NULL,
  `apellido_materno` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(255) NOT NULL,
  `ciudad` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_alumno`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`prueba`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`prueba` (
  `id_prueba` INT(11) NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(45) NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_prueba`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`tipo` (
  `id_tipo` INT(11) NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_tipo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`pregunta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`pregunta` (
  `id_pregunta` INT(11) NOT NULL AUTO_INCREMENT,
  `id_tipo` INT(11) NOT NULL,
  `id_prueba` INT(11) NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `enunciado` TEXT NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_pregunta`),
  INDEX `fk_Pregunta_Prueba1_idx` (`id_prueba` ASC),
  INDEX `fk_Pregunta_Tipo1_idx` (`id_tipo` ASC),
  CONSTRAINT `fk_Pregunta_Prueba1`
    FOREIGN KEY (`id_prueba`)
    REFERENCES `qualans`.`prueba` (`id_prueba`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Pregunta_Tipo1`
    FOREIGN KEY (`id_tipo`)
    REFERENCES `qualans`.`tipo` (`id_tipo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`tipo_estimulo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`tipo_estimulo` (
  `id_tipo_estimulo` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_tipo_estimulo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qualans`.`respuesta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`respuesta` (
  `id_respuesta` INT(11) NOT NULL AUTO_INCREMENT,
  `id_pregunta` INT(11) NOT NULL,
  `id_alumno` INT(11) NOT NULL,
  `valor` TEXT NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  `id_tipo_estimulo` INT NOT NULL,
  PRIMARY KEY (`id_respuesta`, `id_pregunta`, `id_alumno`),
  INDEX `fk_Respuesta_Alumno1_idx` (`id_alumno` ASC),
  INDEX `fk_Respuesta_Pregunta1_idx` (`id_pregunta` ASC),
  INDEX `fk_respuesta_tipo_estimulo1_idx` (`id_tipo_estimulo` ASC),
  CONSTRAINT `fk_Respuesta_Alumno1`
    FOREIGN KEY (`id_alumno`)
    REFERENCES `qualans`.`alumno` (`id_alumno`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Respuesta_Pregunta1`
    FOREIGN KEY (`id_pregunta`)
    REFERENCES `qualans`.`pregunta` (`id_pregunta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_respuesta_tipo_estimulo1`
    FOREIGN KEY (`id_tipo_estimulo`)
    REFERENCES `qualans`.`tipo_estimulo` (`id_tipo_estimulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`tipo_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`tipo_usuario` (
  `id_tipo_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_tipo_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`usuario` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_usuario` INT(11) NOT NULL,
  `usuario` VARCHAR(100) NOT NULL,
  `contraseña` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido_paterno` VARCHAR(45) NOT NULL,
  `apellido_materno` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_usuario`, `id_tipo_usuario`, `usuario`),
  INDEX `fk_Usuario_Tipo_Usuario1_idx` (`id_tipo_usuario` ASC),
  CONSTRAINT `fk_Usuario_Tipo_Usuario1`
    FOREIGN KEY (`id_tipo_usuario`)
    REFERENCES `qualans`.`tipo_usuario` (`id_tipo_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`estado` (
  `id_estado` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_estado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qualans`.`asignacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`asignacion` (
  `id_asignacion` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NOT NULL,
  `id_respuesta` INT(11) NOT NULL,
  `id_estado` INT NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_asignacion`, `id_usuario`, `id_respuesta`),
  INDEX `fk_Asignacion_Respuesta1_idx` (`id_respuesta` ASC),
  INDEX `fk_Asignacion_Usuario1_idx` (`id_usuario` ASC),
  INDEX `fk_asignacion_estado1_idx` (`id_estado` ASC),
  CONSTRAINT `fk_Asignacion_Respuesta1`
    FOREIGN KEY (`id_respuesta`)
    REFERENCES `qualans`.`respuesta` (`id_respuesta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Asignacion_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `qualans`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_asignacion_estado1`
    FOREIGN KEY (`id_estado`)
    REFERENCES `qualans`.`estado` (`id_estado`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`codigo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`codigo` (
  `id_codigo` INT(11) NOT NULL AUTO_INCREMENT,
  `valor` VARCHAR(45) NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_codigo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`asignacion_codigo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`asignacion_codigo` (
  `id_asignacion_codigo` INT(11) NOT NULL AUTO_INCREMENT,
  `id_asignacion` INT(11) NOT NULL,
  `id_codigo` INT(11) NOT NULL,
  PRIMARY KEY (`id_asignacion_codigo`),
  INDEX `fk_Asignacion_Codigo_Asignacion1_idx` (`id_asignacion` ASC),
  INDEX `fk_Asignacion_Codigo_Codigo1_idx` (`id_codigo` ASC),
  CONSTRAINT `fk_Asignacion_Codigo_Asignacion1`
    FOREIGN KEY (`id_asignacion`)
    REFERENCES `qualans`.`asignacion` (`id_asignacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Asignacion_Codigo_Codigo1`
    FOREIGN KEY (`id_codigo`)
    REFERENCES `qualans`.`codigo` (`id_codigo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`equipo` (
  `id_equipo` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_equipo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`familia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`familia` (
  `id_familia` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_familia`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`filtro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`filtro` (
  `id_filtro` INT(11) NOT NULL AUTO_INCREMENT,
  `id_codigo` INT(11) NOT NULL,
  `id_familia` INT(11) NOT NULL,
  PRIMARY KEY (`id_filtro`, `id_codigo`, `id_familia`),
  INDEX `fk_Filtro_Familia1_idx` (`id_familia` ASC),
  INDEX `fk_Filtro_Codigo1_idx` (`id_codigo` ASC),
  CONSTRAINT `fk_Filtro_Codigo1`
    FOREIGN KEY (`id_codigo`)
    REFERENCES `qualans`.`codigo` (`id_codigo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Filtro_Familia1`
    FOREIGN KEY (`id_familia`)
    REFERENCES `qualans`.`familia` (`id_familia`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`forma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`forma` (
  `id_forma` INT(11) NOT NULL AUTO_INCREMENT,
  `id_prueba` INT(11) NOT NULL,
  `forma` VARCHAR(45) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_forma`),
  INDEX `fk_Forma_Prueba1_idx` (`id_prueba` ASC),
  CONSTRAINT `fk_Forma_Prueba1`
    FOREIGN KEY (`id_prueba`)
    REFERENCES `qualans`.`prueba` (`id_prueba`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`forma_pregunta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`forma_pregunta` (
  `id_forma_pregunta` INT(11) NOT NULL AUTO_INCREMENT,
  `id_forma` INT(11) NOT NULL,
  `id_pregunta` INT(11) NOT NULL,
  PRIMARY KEY (`id_forma_pregunta`, `id_forma`, `id_pregunta`),
  INDEX `fk_Forma_Pregunta_Forma1_idx` (`id_forma` ASC),
  INDEX `fk_Forma_Pregunta_Pregunta1_idx` (`id_pregunta` ASC),
  CONSTRAINT `fk_Forma_Pregunta_Forma1`
    FOREIGN KEY (`id_forma`)
    REFERENCES `qualans`.`forma` (`id_forma`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Forma_Pregunta_Pregunta1`
    FOREIGN KEY (`id_pregunta`)
    REFERENCES `qualans`.`pregunta` (`id_pregunta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`log` (
  `id_log` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_log`),
  INDEX `fk_Log_Usuario1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_Log_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `qualans`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`thread`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`thread` (
  `id_thread` INT(11) NOT NULL AUTO_INCREMENT,
  `id_remitente` INT(11) NOT NULL,
  `mensaje` TEXT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `tipo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_thread`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`mensaje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`mensaje` (
  `id_mensaje` INT(11) NOT NULL AUTO_INCREMENT,
  `id_thread` INT(11) NOT NULL,
  `id_remitente` INT(11) NOT NULL,
  `estado_lectura` TINYINT(4) NOT NULL,
  `estado_envio` TINYINT(4) NOT NULL,
  PRIMARY KEY (`id_mensaje`),
  INDEX `fk_Mensaje_Thread1_idx` (`id_thread` ASC),
  INDEX `fk_Mensaje_Usuario1_idx` (`id_remitente` ASC),
  CONSTRAINT `fk_Mensaje_Thread1`
    FOREIGN KEY (`id_thread`)
    REFERENCES `qualans`.`thread` (`id_thread`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Mensaje_Usuario1`
    FOREIGN KEY (`id_remitente`)
    REFERENCES `qualans`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`mensaje_destinatario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`mensaje_destinatario` (
  `id_thread_destinatario` INT(11) NOT NULL AUTO_INCREMENT,
  `id_thread` INT(11) NOT NULL,
  `id_usuario_destino` INT(11) NOT NULL,
  `estado_lectura` TINYINT(4) NOT NULL,
  PRIMARY KEY (`id_thread_destinatario`, `id_thread`, `id_usuario_destino`),
  INDEX `fk_Mensaje_Destinatario_Thread1_idx` (`id_thread` ASC),
  INDEX `fk_mensaje_destinatario_usuario1_idx` (`id_usuario_destino` ASC),
  CONSTRAINT `fk_Mensaje_Destinatario_Thread1`
    FOREIGN KEY (`id_thread`)
    REFERENCES `qualans`.`thread` (`id_thread`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_mensaje_destinatario_usuario1`
    FOREIGN KEY (`id_usuario_destino`)
    REFERENCES `qualans`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`thread_asignacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`thread_asignacion` (
  `id_thread_asignacion` INT(11) NOT NULL AUTO_INCREMENT,
  `id_thread` INT(11) NOT NULL,
  `id_asignacion` INT(11) NOT NULL,
  PRIMARY KEY (`id_thread_asignacion`, `id_thread`, `id_asignacion`),
  INDEX `fk_Thread_Asignacion_Asignacion1_idx` (`id_asignacion` ASC),
  INDEX `fk_Thread_Asignacion_Thread1_idx` (`id_thread` ASC),
  CONSTRAINT `fk_Thread_Asignacion_Asignacion1`
    FOREIGN KEY (`id_asignacion`)
    REFERENCES `qualans`.`asignacion` (`id_asignacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Thread_Asignacion_Thread1`
    FOREIGN KEY (`id_thread`)
    REFERENCES `qualans`.`thread` (`id_thread`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qualans`.`usuario_equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qualans`.`usuario_equipo` (
  `id_usuario_equipo` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NOT NULL,
  `id_equipo` INT(11) NOT NULL,
  PRIMARY KEY (`id_usuario_equipo`, `id_usuario`, `id_equipo`),
  INDEX `fk_Usuario_Equipo_Equipo_idx` (`id_equipo` ASC),
  INDEX `fk_Usuario_Equipo_Usuario1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_Usuario_Equipo_Equipo`
    FOREIGN KEY (`id_equipo`)
    REFERENCES `qualans`.`equipo` (`id_equipo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Usuario_Equipo_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `qualans`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
