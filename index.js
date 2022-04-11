class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let bal = 0;
    for (const transaction of this.transactions) {
      bal += transaction.value;
    }
    return bal;
  }
  addTransactions(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransactions(this);
    console.log(
      `${this.value > 0 ? "Deposit" : "Withdrawal"} of amount ${
        this.value
      } was succesful!!`
    );
  }

  // Alternative method
  // isAllowed() {
  //   if (this.value > 0) {
  //     // Deposit condition
  //     return true;
  //   }

  //   // Check if we have enough money if withdrawing
  //   const cashAvailable = this.account.balance + this.value;
  //   if (cashAvailable >= 0) {
  //     return true;
  //   }
  //   return false;
  // }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed(){
    // Do we have money?
    return (this.account.balance + this.value >= 0);
  }

}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed(){
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log("Starting balance: ", myAccount.balance);
t1 = new Deposit(10000, myAccount);
t1.commit();
t2 = new Withdrawal(3000, myAccount);
t2.commit();
t3 = new Deposit(15000, myAccount);
t3.commit();
console.log("Ending alance:", myAccount.balance);
console.log("Transactions on my account:", myAccount.transactions);
