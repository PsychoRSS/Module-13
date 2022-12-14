const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all Tags
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll();
    res.status(200).json(allTags)
  }catch(err) {
    res.status(500).json(err);
  }
});

// Find one tag
router.get('/:id', (req, res) => {
  try {
    const tagData = Tag.findByPk(req.params.id, {
      include: [{model:Product, as: "Product Data"}]
    })
    
    if(!tagData) {
      res.status(404).json({ messge: "No item with this id!!!!!!! "})
    }
    res.status(200).json(tagData);
  }catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => {
    if (req.body.tagIds.length) {
      const TagIdArr = req.body.tagIds.map((tag_id) =>{
        return{
          tag_id: tag.id
        }
      })
      return ProductTag.bulkCreate(TagIdArr);
    }
    res.status(200).json(tag)
  })
  .then((tagID) => res.status(200).json(tagID))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  try{
    const tagData = Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    
    if(!tagData[0]) {
      res.status(404).json({ messge: "No item with this ID!!!!!!!!!!!!!!!!!"})
      return;
    }
    res.status(200).json(tagData);
  }catch(err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', (req, res) => {
  try {
    const tagData = Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if(!tagData[0]) {
      res.status(404).json({ messge: "No item with this ID to delete!!!!"})
      return;
    }
    res.status(200).json(tagData);
  }catch(err) {
    res.status(400).json(err)
  }
  // delete on tag by its `id` value
});

module.exports = router;
