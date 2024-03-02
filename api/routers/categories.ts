import {Router} from 'express';
import Category from '../models/Category';

const categoryRouter = Router();

categoryRouter.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find();
        return res.send(categories);
    } catch (e) {
        next(e);
    }
});


export default categoryRouter;
