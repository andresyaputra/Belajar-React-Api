const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Function to read products from JSON file
function readProductsFromFile() {
  try {
    const data = fs.readFileSync('products.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading products file:', err);
    return [];
  }
}

// Function to write products to JSON file
function writeProductsToFile(products) {
  try {
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    console.log('Products data written to file.');
  } catch (err) {
    console.error('Error writing products file:', err);
  }
}

let products = readProductsFromFile();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir)); // Serve static files from the uploads directory

app.get('/products', (req, res) => {
  const { category } = req.query;
  if (category) {
    return res.json(products.filter(product => product.category === category));
  }
  res.json(products);
});

app.post('/products', upload.single('image'), (req, res) => {
  console.log('Received new product:', req.body);
  console.log('Uploaded file:', req.file);

  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.file ? req.file.path : '',
  };
  products.push(newProduct);
  writeProductsToFile(products); // Write products data to file
  res.status(201).json(newProduct);
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(product => product.id !== parseInt(id));
  writeProductsToFile(products); // Write products data to file
  res.status(204).end();
});

app.put('/products/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const existingProduct = products.find(product => product.id === parseInt(id));
  
  if (!existingProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }

  console.log('Updating product:', req.body);
  console.log('Uploaded file:', req.file);

  const updatedProduct = {
    id: parseInt(id),
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.file ? req.file.path : existingProduct.image,
  };
  products = products.map(product => (product.id === parseInt(id) ? updatedProduct : product));
  writeProductsToFile(products); // Write products data to file
  res.json(updatedProduct);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
