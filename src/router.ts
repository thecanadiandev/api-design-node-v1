import { Router } from 'express';
import { body, oneOf } from "express-validator";
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';


const router = Router();

/* Product */

router.get('/product', getProducts)
router.post('/product', [body('name').isString(), handleInputErrors], createProduct)
router.get('/product/:id', getOneProduct)
// req.body should have a field called name
router.put('/product/:id', [body('name').isString(), handleInputErrors], updateProduct)
router.delete('/product/:id', deleteProduct)


/* Updates */

router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate)
router.put('/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional()
  , updateUpdate)
router.delete('/update/:id', deleteUpdate)

/* UpdatePoints */

router.get('/updatepoint', (req, res) => {

})
router.post('/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  (req, res) => {

  })

router.get('/updatepoint/:id', (req, res) => {

})

router.put('/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(), (req, res) => {

  })

router.delete('/updatepoint/:id', (req, res) => {

})

export default router;