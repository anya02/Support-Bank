//var readlineSync = require('readline-sync');
const fs = require('fs');

let transactionFileContent;

class Account {
  constructor (name){
  this.name = name;
  this.balance = 0;
  }

  addToBalance(amount) {
    this.balance += amount;
  }

  removeFromBalance(amount) {
    this.balance -= amount;
  }
}

class Transaction {
  constructor (date, from, to, narrative, amount) {
  this.date = date;
  this.from = from;
  this.to = to;
  this.narrative = narrative;
  this.amount = amount;
  }
}

try {
    transactionFileContent = fs.readFileSync('./Transactions2014.csv', 'utf8');
  } catch (err) {
    console.error(err);
  }

let transactionsAsStrings = transactionFileContent.split('\n');

removeHeader(transactionsAsStrings);


const transactions = [];

for (let x = 0; x < transactionsAsStrings.length; x++) {
    const transactionsAsArray = transactionsAsStrings[x].split(',');
    transactions.push(new Transaction(
      transactionsAsArray[0],
      transactionsAsArray[1],
      transactionsAsArray[2],
      transactionsAsArray[3],
      parseFloat(transactionsAsArray[4])
    ));
}


const accounts = [];

for (let x = 0; x < transactions.length; x++) {
  const accountsIndexFrom = checkAccountExists(transactions[x].from);
  const accountsIndexTo = checkAccountExists(transactions[x].to);
  const amount = transactions[x].amount;

  accounts[accountsIndexFrom].removeFromBalance(amount);
  accounts[accountsIndexTo].addToBalance(amount);
}



function removeHeader(file) {
  file.shift();
}

function checkAccountExists(accountName) {
  for (let x = 0; x < accounts.length; x++) {
    if (accounts[x].name === accountName) return x;
  }
  accounts.push(new Account(accountName));
  return (accounts.length - 1);
}
