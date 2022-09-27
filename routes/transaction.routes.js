const express = require('express');
const router = express.Router();

// importing controllers
const { createTransaction, getAllTransaction, getSingleTransaction,
    updateTransaction, deleteTransaction
} = require('../controllers/transaction.controller');

router.get('/', getAllTransaction);
router.get('/:id', getSingleTransaction);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);


module.exports = router;