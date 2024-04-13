import { Router } from 'express';

const router = Router();

/* Product */

router.get('/product', (req, res) => {
  res.json({ message: 'hi' })
  return;
})

router.post('/product', (req, res) => {

})

router.get('/product/:id', (req, res) => {

})

router.put('/product/:id', (req, res) => {

})


router.delete('/product/:id', (req, res) => {

})


/* Updates */

router.get('/update', (req, res) => {

})

router.post('/update', (req, res) => {

})

router.get('/update/:id', (req, res) => {

})

router.put('/update/:id', (req, res) => {

})


router.delete('/update/:id', (req, res) => {

})

/* UpdatePoints */

router.get('/updatepoint', (req, res) => {

})

router.post('/updatepoint', (req, res) => {

})

router.get('/updatepoint/:id', (req, res) => {

})

router.put('/updatepoint/:id', (req, res) => {

})

router.delete('/updatepoint/:id', (req, res) => {

})

export default router;