const fs = require('fs');
const readline = require('readline');

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
  const accountFrom = getOrCreateAccount(transactions[x].from);
  const accountTo = getOrCreateAccount(transactions[x].to);
  const amount = transactions[x].amount;

  accountFrom.removeFromBalance(amount);
  accountTo.addToBalance(amount);
}



function removeHeader(file) {
  file.shift();
}

function getOrCreateAccount(accountName) {
  for (let x = 0; x < accounts.length; x++) {
    if (accounts[x].name === accountName) {
      return accounts[x]; 
    }
  }
  const newAccount = new Account(accountName);
  accounts.push(newAccount);
  return newAccount;
}

//console.log(accounts);

// Listall
// for (let account of accounts) {
//   console.log('Name: ', account.name, ' Balance: ', account.balance.toFixed(2));
// }


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const requestedAccount = '';

rl.question('Which account would you like to see the transactions for? ', (answer) => {
  requestedAccount += answer;
  console.log(answer)
  console.log(requestedAccount)
  rl.close();


  
});

// List Account
console.log('Name: ', requestedAccount);
for (let x = 0; x < transactions.length; x++) {
  if (requestedAccount === transactions[x].name) {
    console.log(x, ': ', transactions[x].date, transactions[x].narrative);
  }
}
