const express = require('express');
const router = express.Router();
const controller = require('../controllers/departmentController');

router.post('/', controller.createDepartment);
router.get('/', controller.getDepartments);
router.get('/:id', controller.getDepartmentById);
router.put('/:id', controller.updateDepartment);
router.delete('/:id', controller.deleteDepartment);

module.exports = router;
