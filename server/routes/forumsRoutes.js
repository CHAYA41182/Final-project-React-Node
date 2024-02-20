const forumsController = require('../controllers/forumsControllers/forumsController');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = require('express').Router();

router.use(verifyAdmin);

router.get('/', forumsController.getForums);
router.get('/:id', forumsController.getForum);
router.post('/', forumsController.createForum);
router.put('/:id', forumsController.updateForum);
router.delete('/:id', forumsController.deleteForum);

module.exports = router;

