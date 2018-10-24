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
    inquirer
        .prompt ([
            {
            name: "choices",
            type: "list",
            message: "Welcome Mr. Manager. What tasks do you need done today?",
            choices: ["View Products for Sale",
                      "View Low Inventory",
                      "Add to Inventory",
                      "Add New Product"]
            }
        ])
        .then(function(input) {
            switch(input.choices) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProducts();
                    break;  
            }
        })
}

function viewProducts () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(var i = 0; i < res.length; i++) {
            console.log("\n" + "----> " + "Item: " + res[i].product_name + " | " + "Department: " + res[i].department_name + 
                        " | " + "Price: " + res[i].price + " | " + "Current stock: " + res[i].stock_quantity + 
                        " | " + "\n");
              }
        initiate();
    })
}

function viewInventory () {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\n" + "----> " + "Item: " + res[i].product_name + " | " + "Department: " + res[i].department_name + 
            " | " + "Price: " + res[i].price + " | " + "Current stock: " + res[i].stock_quantity + 
            " | " + "\n");
        }
        initiate();
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
    
    inquirer
        .prompt([
            {
            name: "choice",
            type: "rawlist",
            message: "Hello Mr. Manager. For which product would you like to update the inventory?",
            choices: function() {
                var optionarr = [];
            for (var i = 0; i < res.length; i++) {
                optionarr.push(res[i].product_name);
            }
            return optionarr
            },
            },
            {
            name: "addition",
            type: "input",
            message: "How many units of inventory would you like to add?"
            }
        ])
        .then(function(input) {
            var choice;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === input.choice) {
                    choice = res[i];
                }
            }

                connection.query("UPDATE products SET ? WHERE ?",
                [
                {
                  stock_quantity: choice.stock_quantity + parseInt(input.addition)
                },
                {
                  item_id: choice.item_id
                }
                ],
                )
                initiate();

        });
    })
}

function addProducts() {
    inquirer
      .prompt([
        {
        name: "item",
        type: "input",
        message: "What is the name of the item you'd like to add to Bamazon inventory?"
        },
        {
        name: "department",
        type: "input",
        message: "To which deparment should we assign the product?"
        },
        {
        name: "price",
        type: "input",
        message: "What would like the price to be?"
        },
        {
        name: "quantity",
        type: "input",
        message: "How many units do you want to add to the inventory?"
        }
      ]).then(function(data) {
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: data.item,
        department_name: data.department,
        price: data.price,
        stock_quantity: data.quantity
      },
      function(err, res) {
        console.log("Thanks Mr. Manager. " + res.affectedRows + " new product inserted!\n");
        initiate();
      }
    )
    console.log(query.sql);
    });
  
  }