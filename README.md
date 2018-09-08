## bAMAZON Inventory DB Application
This application uses Node.js and Mysql to implement a CLI, ask the user to pick a product from the database, choose a quantity, check that the quanity needs can be met, and if so, update the database.

# Installation
- git clone this branch to your local machine
- vagrant up to bring up virtual server (see vm doc for further info)
- vagrant ssh to login to virtual server
- cd /var/code
- verify package.json exists
- npm install
- verify node_modules exists
- verify node_modules contains package.json ingredients

# User Instructions
- From command line in virtual machine, run `node bamazon.js`; follow user promtps, enter choices

# Screenshots
- See "Screencaps" folder for positive and negative paths through the application requirements

# Technical Debt
- no glaring defects detected so far
- no data validation implemented
- bonus extensions of the app certainly possible