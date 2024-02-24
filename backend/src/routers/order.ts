import {Router} from 'express'

const { createOrder,getOrder } = require('../controllers/orderController');

const orderRouter = Router()


orderRouter.post('/order', createOrder);
orderRouter.get('/order', getOrder);


module.exports = orderRouter;