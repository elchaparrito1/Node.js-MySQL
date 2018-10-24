var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    initiate();
})

function initiate() {
    console.log('\n' + '\n' + "Welcome to Bamazon! Here is a list of our current products:");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(var i = 0; i < res.length; i++) {
      console.log("\n" + "----> " + "Item: " + res[i].product_name + " | " + "Department: " + res[i].department_name + 
                  " | " + "Price: " + res[i].price + " | " + "Current stock: " + res[i].stock_quantity + 
                  " | " + "Product sales: " + res[i].product_sales + "\n");
        }
    options();
      });
}

function options() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

    inquirer
        .prompt([
            {
            name: "choice",
            type: "rawlist",
            message: "Please select the id of the item for which you'd like to make a purchase.",
            choices: function() {
                var optionarr = [];
            for (var i = 0; i < res.length; i++) {
                optionarr.push(res[i].product_name);
            }
            return optionarr
             },
            },
            {
            name: "purchase",
            type: "input",
            message: "How many units of this product would you like to purchase?"
            }
        ])
        .then(function(input) {
            var choice;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === input.choice) {
                    choice = res[i];
                }
            }
            if (choice.stock_quantity <= 0) {
                console.log("Oh so sorry. We are currently out of stock of that item.");
                options();
            } else if (choice.stock_quantity < input.purchase) {
                console.log("Oh sorry. Your requested amount exceeds our current inventory. Please change amount, or select a different item.");
                options();
            } else {
                console.log("You order will cost a total of " + parseFloat(choice.price) * parseInt(input.purchase));
                // choice.stock_quantity - parseInt(input.purchase);
                connection.query("UPDATE products SET ?, ? WHERE ?",
                [
                {
                  stock_quantity: choice.stock_quantity - parseInt(input.purchase)
                },
                {
                  product_sales: choice.price * parseInt(input.purchase)
                },
                {
                  item_id: choice.item_id
                }
                ],
                )
                initiate();
            }

        });
    })
}