// main bamazon application file

var inquirer = require('inquirer');
var mysql = require('mysql');
var dbOps = require('./dbOps');

// create connection variable
var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1234",
  database: "bamazon"
  
});

inquirer.prompt([
    {
      name: "id",
      message: "What product (ID) would you like to buy?"
    }, 
    
    {
      name: "qty",
      message: "How many?"
    }

  ]).then(function(answers) {
    // set variables = user input
    var product = answers.id;
    console.log(typeof product);
    var quantity = parseInt(answers.qty);
    console.log(typeof quantity);

    // call buy function
    dbOps.buyProduct(product,quantity);
    
  });

  