const express = require('express');
const router = express.Router();

// importing controllers
const { createAccount, getAllAccount, getSingleAccount,
    updateAccount, deleteAccount
} = require('../controllers/account.controller');

router.get('/', getAllAccount);
router.get('/:id', getSingleAccount);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);


module.exports = router;