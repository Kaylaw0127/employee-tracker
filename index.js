// Dependencies
var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer")

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Daisy1121!",
  database: "employee_tracker_db"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Command Line
function start () {
inquirer
.prompt({
  type: `list`,
  message: `What would you like to do?`,
  choices: 
    [`View all employees`, 
    `View all employees by department`, 
    `View all employees by manager`, 
    `Add employee`, 
    `Remove employee`, 
    `Update employee role`, 
    `Update employee manager`, 
    `View all roles`, 
    `Add role`, 
    `Remove role`, 
    `Add department`, 
    `Remove department`, 
    `See all departments`],
  name: `initialize`
}).then((answer) => {
  console.log(answer)
  switch (answer.initialize) {
    case `View all employees`:
      getAllEmployees()
      break

    case `View all employees by department`:
      getEmployeeByDepartment()
      break

    case `View all employees by manager`:
      getEmployeeByManager()
      break

    case `Add employee`:
      addEmployee()
      break

    case `Remove employee`:
      removeEmployee()
      break

    case `Update employee role`:
      updateEmployeeRole()
      break

    case `Update employee manager`:
      updateEmployeeManager()
      break

    case `View all roles`:
      viewAllRoles()
      break

    case `Add role`:
      addRole()
      break

    case `Remove role`:
      removeRole()
      break

    case `Add department`:
      addDepartment()
      break
    
    case `Remove department`:
      removeDepartment()
      break

    case `See all departments`:
      seeDepartments()
      break
  }
})
}

start()