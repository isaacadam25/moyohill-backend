const express = require('express');
const router = express.Router();

// importing controllers
const { createStatus, getAllStatus, getSingleStatus,
    updateStatus, deleteStatus
} = require('../controllers/status.controller');

router.get('/', getAllStatus);
router.get('/:id', getSingleStatus);
router.post('/', createStatus);
router.put('/:id', updateStatus);
router.delete('/:id', deleteStatus);


module.exports = router;