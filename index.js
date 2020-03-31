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
    `View all employees by manager id`, 
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

    case `View all employees by manager id`:
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


const getAllEmployees = function () {
connection.query("SELECT * FROM employees;", function (err, res) {
if (err) throw err;

console.table(res)

start()
})
}

const seeDepartments = function () {
connection.query("SELECT * FROM departments;", function (err, res) {
if (err) throw err;

console.table(res)

start()
})
}

const getEmployeeByDepartment = function () {
connection.query("SELECT * FROM employees ORDER BY roles.departments_id;", function (err, res) {
if (err) throw err;

console.table(res)

start()
})
}

const getEmployeeByManager = function () {
connection.query("SELECT * FROM employees ORDER BY employees.manager_id;", function (err, res) {
if (err) throw err;

console.table(res)

start()
})
}

const addEmployee = function () {
console.log(`Add information about your new employee `)
inquirer
.prompt([
{
  type: `input`,
  message: `What is the employee's first name?`,
  name: `first_name`
},
{
  type: `input`,
  message: `What is the employee's last name?`,
  name: `last_name`
},
{
  type: `number`,
  message: `What is the employee's role ID number??`,
  name: `role_id`
},
{
  type: `number`,
  message: `What is the employee's manager's ID number??`,
  name: `manager_id`
}
]).then((answers) => {
connection.query(
  "INSERT INTO employees SET ?", answers, function (err, res) {
    if (err) throw err;
    console.log(`Employee added!`);
    start()
  }
)

})

}

const removeEmployee = function () {
connection.query("SELECT * FROM employees;", function (err, res) {
if (err) throw err;

console.table(res)
})

inquirer
.prompt({
type: `input`,
message: `What employee ID would you like to delete?`,
name: `deleteID`
}).then((answer) => {
console.log(answer)
connection.query("DELETE FROM employees WHERE id = ?", answer.deleteID, function (err, res) {
  if (err) throw err;

  console.log(`Employee has been deleted`)
  start()
})
})
}

const updateEmployeeRole = function () {
connection.query("SELECT * FROM employees;", function (err, res) {
if (err) throw err;

console.table(res)
})
connection.query("SELECT * FROM roles;", function (err, res) {
if (err) throw err;

console.table(res)
})
inquirer
.prompt([
{
  type: `input`,
  message: `What employee ID would you like to edit the role of?`,
  name: `updateRole`
},
{
  type: `input`,
  message: `What role ID would you like to give them?`,
  name: `newRole`
}
]).then((answer) => {
console.log(answer)
connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [answer.newRole, answer.updateRole], function (err, res) {
  if (err) throw err;

  console.log(`Role has bene updated`)
  start()
})
})
}

const updateEmployeeManager = function () {
connection.query("SELECT * FROM employees;", function (err, res) {
if (err) throw err;

console.table(res)
})
connection.query("SELECT * FROM roles;", function (err, res) {
if (err) throw err;

console.table(res)
})
inquirer
.prompt([
{
  type: `input`,
  message: `What employee ID would you like to edit the role of?`,
  name: `updateRole`
},
{
  type: `input`,
  message: `What role ID would you like to give them?`,
  name: `newRole`
}
]).then((answer) => {
console.log(answer)
connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [answer.newRole, answer.updateRole], function (err, res) {
  if (err) throw err;

  console.log(`Role has been updated`)
  start()
})
})
}
const viewAllRoles = function () {
connection.query("SELECT * FROM roles;", function (err, res) {
if (err) throw err;

console.table(res)

start()
})
}

const addRole = function () {
console.log(`Adding a new role!...\n`)
inquirer
.prompt([
{
  type: `input`,
  message: `What is the role title?`,
  name: `title`
},
{
  type: `input`,
  message: `What is the role's salary?`,
  name: `salary`
},
{
  type: `number`,
  message: `What is the role's department ID number?`,
  name: `department_id`
}
]).then((answers) => {
connection.query(
  "INSERT INTO employee_tracker_db.roles SET ?", answers, function (err, res) {
    if (err) throw err;
    console.log(`Role has been added!`);
    start()
  }
)

})
}


const removeRole = function () {
connection.query("SELECT * FROM employee_tracker_db.roles;", function (err, res) {
if (err) throw err;

console.table(res)
})
inquirer
.prompt({
type: `input`,
message: `What role ID would you like to delete?`,
name: `deleteID`
}).then((answer) => {
console.log(answer)
connection.query("DELETE FROM employee_tracker_db.roles WHERE id = ?", answer.deleteID, function (err, res) {
  if (err) throw err;

  console.log(`Role has been deleted`)
  start()
})
})
}

const addDepartment = function (){
console.log(`Adding a new department \n`)
inquirer
.prompt([
{
  type: `input`,
  message: `What is the department called?`,
  name: `name`
}
]).then((answers) => {
connection.query(
  "INSERT INTO employee_tracker_db.departments SET ?", answers, function (err, res) {
    if (err) throw err;
    console.log(`department has been added!`);
    start()
  }
)

})
}

const removeDepartment = function () {
connection.query("SELECT * FROM employee_tracker_db.departments;", function (err, res) {
if (err) throw err;

console.table(res)
})
inquirer
.prompt({
type: `input`,
message: `What department ID would you like to delete?`,
name: `deleteID`
}).then((answer) => {
console.log(answer)
connection.query("DELETE FROM employee_tracker_db.departments WHERE id = ?", answer.deleteID, function (err, res) {
  if (err) throw err;

  console.log(`Department has been deleted`)
  start()
})
})
}
start()