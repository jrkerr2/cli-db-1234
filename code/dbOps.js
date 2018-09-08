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
      // console.log(result);
      bam.askUser();
      
    });

    // bam.askUser();  
});

// is there enough quantity?

exports.buyProduct = function(product,quantity) {
    var sql = `SELECT item_id,stock_quantity,price FROM products WHERE item_id = ${product}`;
    console.log("Made it to buy");
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result[0].stock_quantity);
      if (result[0].stock_quantity >= quantity) {
          var stock = result[0].stock_quantity;
          var price = result[0].price;
          console.log(typeof result[0].price);
          console.log(typeof result[0].stock_quantity);
          console.log(typeof price);
          console.log(typeof stock);
          updateProduct(product,quantity,price,stock);
      }
      else {
          console.log("Insufficient quantity!");
          bam.askUser();
          // con.end();
          // bamazon.inquire():
          
      }       
      
    });
    
    // con.end();

}

function updateProduct(product,quantity,price,stock) {
    console.log("Made it to Update");
    var remaining = stock-quantity;
    console.log(remaining);
    var total = quantity*price;
    console.log(total);

    var sql = `UPDATE products SET stock_quantity = ${remaining} WHERE item_id = ${product}`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Your total is: " + (total).toFixed(2));
      con.end();
      
    });
};