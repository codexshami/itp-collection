import express from 'express';
import { getPres, postPres, getUserPres } from "../controller/presController.js"
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js"
const router = express.Router();

router.get('/getPres', isAdminAuthenticated, getPres);
router.post('/postPres', isAdminAuthenticated, postPres);
router.get('/getUserPres/:id', isPatientAuthenticated, getUserPres);

export default router;
