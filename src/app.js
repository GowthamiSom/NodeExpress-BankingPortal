const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync('./src/json/accounts.json', 'UTF8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('./src/json/users.json', 'UTF8');
const users = JSON.parse(userData);

app.get('/', function (req, res) {
    res.render('index', { title: 'Account Summary', accounts: accounts });
});
app.get('/savings', function (req, res) {
    console.log('get / savings');
    res.render('account', { account: accounts.savings });
});
app.get('/checking', function (req, res) {
    console.log('get / checking');
    res.render('account', { account: accounts.checking });
});
app.get('/credit', function (req, res) {
    console.log('get / credit');
    res.render('account', { account: accounts.credit });
});
app.get('/profile', function (req, res) {
    console.log('get / profile');
    res.render('profile', { user: users[0] });
});
app.get('/transfer', function (req, res) {
    console.log('get / transfer');
    res.render('transfer');
});
app.post('/transfer', function (req, res) {
    console.log('post / transfer');
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = accounts[req.body.to].balance + parseInt(req.body.amount);
    var accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'UTF8');
    res.render('transfer', {message: "Transfer Completed"});
});
app.get('/payment', function (req, res) {
    console.log('get / payment');
    res.render('payment', { account: accounts.credit });
});
app.post('/payment', function (req, res) {
    console.log('post / payment');
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    accounts.credit.available = accounts.credit.available + parseInt(req.body.amount);
    var accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'UTF8');
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!')
});
