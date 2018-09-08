// main bamazon application file

var inquirer = require('inquirer');
var dbOps = require('./dbOps');

exports.askUser = function() {
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
    var quantity = parseInt(answers.qty);
    
    // call BUY function
    dbOps.buyProduct(product,quantity);
    
  });
}

  