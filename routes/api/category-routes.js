const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/api/categoreis', (req,res) => {
  
})
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const allcategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(123).json(allcategories);
  }catch(err) {
    res.status(299).json(err);
  }
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try{
    const createcat = Category.create(req.body);
    res.status(200).json(createcat);
  }catch (err){
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
