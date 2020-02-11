const express = require('express');
const apiRouter = express.Router();

const appearRouter = require('./appears');
const authRouter = require('./auth');
const blockRouter = require('./blocks');
const likeRouter = require('./likes');
const logRouter = require('./logs')
const mailRouter = require('./mail')
const matchRouter = require('./matches')
const messageRouter = require('./messages')
const notificationRouter = require('./notifications')
const overviewRouter = require('./overviews')
const reportRouter = require('./reports')
const tagRouter = require('./tags')
const unlikeRouter = require('./unlikes')
const userRouter = require('./users')
const verifyRouter = require('./verifies')
const visitRouter = require('./visits')


apiRouter.use('/appears', appearRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/blocks', blockRouter);
apiRouter.use('/likes', likeRouter);
apiRouter.use('/logs', logRouter);
apiRouter.use('/mail', mailRouter);
apiRouter.use('/matches', matchRouter);
apiRouter.use('/messages', messageRouter);
apiRouter.use('/notifications', notificationRouter);
apiRouter.use('/overviews', overviewRouter);
apiRouter.use('/reports', reportRouter);
apiRouter.use('/tags', tagRouter);
apiRouter.use('/unlikes', unlikeRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/verifies', verifyRouter);
apiRouter.use('/visits', visitRouter);

module.exports = apiRouter;