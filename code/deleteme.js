var mysql = require('mysql');

//Requiring askCustomer function, basically
var bam = require('./bamazon');

// create connection variable
var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
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
      
    //note how I am calling this function inside the query, basically
    //this is how I make sure that the inquirer will get fired after I display the things in stock
    //if I were to call this function outside con.query, the behaviour will result in the question appearing first,
    //then the stock items - just like it happened when the inquirer was not wrapped in a function
    //and they were both getting fired at the same time  
    bam.askCustomer();  

    });


});
