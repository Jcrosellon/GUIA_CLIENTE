CREATE DATABASE IF NOT EXISTS `logistica`;

USE `logistica`;

CREATE TABLE IF NOT EXISTS `clientes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `nit` VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS `pedidos` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cliente_id` INT,
    `date` DATE,
    `statusDate` DATE,
    `preparingDate` DATE,
    `shippedDate` DATE,
    `deliveredDate` DATE,
    `total` DECIMAL(10, 2),
    FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`)
);
