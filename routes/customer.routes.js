const express = require('express');
const router = express.Router();

// importing controllers
const { createCustomer, getAllCustomers, 
        getSingleCustomers, updateCustomer, 
        deleteCustomer
} = require('../controllers/customer.controller');

router.get('/', getAllCustomers);
router.get('/:id', getSingleCustomers);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);


module.exports = router;