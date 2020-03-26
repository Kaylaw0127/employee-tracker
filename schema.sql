DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
id INT AUTO_INCREMENT NOT NULL,
`name` VARCHAR (30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
`title` VARCHAR (30) NOT NULL,
`salary` DECIMAL (10, 2) NOT NULL,
`department_id` INT,
PRIMARY KEY (id)
);

CREATE TABLE employees (
id INT AUTO_INCREMENT NOT NULL,
`first_name` VARCHAR (30) NOT NULL,
`last_name` VARCHAR (30) NOT NULL,
`role_id` INT,
`manager_roles` INT,
PRIMARY KEY (id)
);