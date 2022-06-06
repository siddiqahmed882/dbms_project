const path = require('path');
const fs = require('fs');

const handleImageUpload = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: 'Please attach an image file' });
  }

  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith('image')) {
    return res.status(400).json({ message: 'Please attach an image file' });
  }

  const imageName = `${Date.now()}-${productImage.name}`;

  const imagePath = path.join(
    __dirname,
    '../public/images/' + imageName
  );

  await productImage.mv(imagePath);

  return res
    .status(200)
    .json({ image: { src: `/images/${imageName}` } });
};

module.exports = { handleImageUpload };