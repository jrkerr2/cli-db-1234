var mysql = require('mysql');
var bam = require('./bamazon');

// create connection variable
var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1234",
  database: "bamazon"
  
});

// open connection, get products from DB
con.connect(function(err) {
    if (err) throw err;    
    
    // create query string variable
    var sql = 'SELECT item_id,product_name,price FROM products';
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      for (i = 0; i < result.length; i++) {
        console.log("ID: " + result[i].item_id, "|| PROD: " + result[i].product_name, "|| PRICE: " + result[i].price);
      }
      // run inquirer after query is returned
      bam.askUser();
      
    });    
});

// execut user request -- is there enough quantity?
exports.buyProduct = function(product,quantity) {
    var sql = `SELECT item_id,stock_quantity,price FROM products WHERE item_id = ${product}`;
        
    con.query(sql, function (err, result) {
      if (err) throw err;

      // quantity check
      if (result[0].stock_quantity >= quantity) {
          var stock = result[0].stock_quantity;
          var price = result[0].price;

          // if OK, update the DB using new values
          updateProduct(product,quantity,price,stock);
      }
      else {
          console.log("Insufficient quantity!");

          // re-prompt the user
          bam.askUser();                   
      }           
    });       
}

// update query
function updateProduct(product,quantity,price,stock) {    
    var remaining = stock-quantity;  // calc remaining inventory after purchase
    var total = quantity*price;  // calc total price charged to user; for presentation only
    
    // update query string using template literals from above variables
    var sql = `UPDATE products SET stock_quantity = ${remaining} WHERE item_id = ${product}`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Your total is: " + (total).toFixed(2));
      console.log("Thank you for your business!");
      con.end();
      
    });
};