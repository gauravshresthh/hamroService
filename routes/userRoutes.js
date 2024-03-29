const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/loginAdmin', authController.loginAdmin);

router.post('/resend-code', authController.resendActivationCode);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPasswordWithToken);
router.post('/verify-token', authController.verifyToken);
router.post('/verify-email', authController.verifyEmail);
// router.get('/confirmation/:phone/:token', authController.verifyNumber);

router.post(
	'/update-my-password',
	authController.protect,
	authController.updatePassword
);
router.get(
	'/me',
	authController.protect,
	userController.getMe,
	userController.getUser
);
router.put(
	'/update-me',
	authController.protect,
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);
router.delete('/delete-me', authController.protect, userController.deleteMe);

router
	.route('/admin')
	.get(
		authController.protect,
		authController.permit('admin'),
		userController.getAllUsers
	)
	.post(
		authController.protect,
		authController.permit('admin'),
		userController.createUser
	);

router
	.route('/admin/:id')
	.get(
		authController.protect,
		authController.permit('admin'),
		userController.getUser
	)
	.put(
		authController.protect,
		authController.permit('admin'),
		userController.uploadUserPhoto,
		userController.resizeUserPhoto,
		userController.updateUser
	)
	.delete(
		authController.protect,
		authController.permit('admin'),
		userController.deleteUser
	);

module.exports = router;
