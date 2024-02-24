import {Router} from 'express'

const { createMenu,getMenu } = require('../controllers/menuController');

const menuRouter = Router()


menuRouter.post('/menu', createMenu);
menuRouter.get('/menu', getMenu);


module.exports = menuRouter;