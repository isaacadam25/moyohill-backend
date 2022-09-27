const express = require('express');
const router = express.Router();

// importing controllers
const { createInvoice, getAllInvoice, getSingleInvoice,
    updateInvoice, deleteInvoice
} = require('../controllers/invoice.controller');

router.get('/', getAllInvoice);
router.get('/:id', getSingleInvoice);
router.post('/', createInvoice);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);


module.exports = router;