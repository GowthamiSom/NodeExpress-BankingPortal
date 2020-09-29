const express = require('express');
const router = express.Router();

const { accounts, writeJSON } = require('../data');

router.get('/transfer', function (req, res) {
    res.render('transfer');
});
router.post('/transfer', function (req, res) {
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = accounts[req.body.to].balance + parseInt(req.body.amount);
    writeJSON();
    res.render('transfer', { message: "Transfer Completed" });
});
router.get('/payment', function (req, res) {
    res.render('payment', { account: accounts.credit });
});
router.post('/payment', function (req, res) {
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    accounts.credit.available = accounts.credit.available + parseInt(req.body.amount);
    writeJSON();
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;