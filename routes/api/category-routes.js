const router = require('express').Router();
const { Category, Product } = require('../../models');

// router.get('/api/categoreis', (req,res) => {
  
// })
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const allcategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allcategories);
  }catch(err) {
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  try {
    const categorytData = await Category.findByPk(req.params.id, {
    include: [{model:Product}]
    });
    
    if(!categorytDat) {
      res.status(404).json({ message: 'No traveller found with this id!!!!!!' })
    }
    
    res.status(200).json(categorytDat);
  }catch (err) {
    res.status(500).json(err);
  }
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

router.put('/:id', async (req, res) => {
  try {
    const categorydata = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },

    })
    if (!categorydata[0]) {
      res.status(404).json({ message: "no Category with this id"});
      return;
    }
    res.status(200).json(categorydata);
  }catch (err) {
    res.status(400).json(err)
  }
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const categorydata = Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    if(!categorydata) {
      res.status(404).json({message: "No category with this id to delete"})
      return;
    }
    
    res.status(200).json(categorydata)
  }catch (err) {
    res.status(400).json(err)
  }
  // delete a category by its `id` value
  
});

module.exports = router;
