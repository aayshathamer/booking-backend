const express = require('express');
const router = express.Router();
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getServiceCounts
} = require('../controllers/serviceController');

router.get('/', getAllServices);
router.get('/counts', getServiceCounts); // ✅ Add counts route
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;
