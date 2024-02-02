const Product = require('./product.model');

// Hämta alla produkter
exports.getAllProducts = async (req, res) => {
  try {
    //från databasen
    const products = await Product.find();
    
    // Skicka tillbaka produkterna som JSON
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internt serverfel' });
  }
};

// Hämta produkt baserat på ID
exports.getProductById = async (req, res) => {
  const id = req.params.id;
  console.log('Hämtar produkt med produktID:', id);

  try {
    // Hämta produkt från databasen baserat på ID
    const product = await Product.findById(id);

    console.log('Produkt hittad:', product);

    if (!product) {
      return res.status(404).json({ error: 'Produkt ej hittad' });
    }

    // Skicka tillbaka produkten som JSON
    res.json(product);
  } catch (error) {
    console.error('Fel vid hämtning av produkt via ID:', error);
    res.status(500).json({ error: 'Internt serverfel' });
  }
};

//Hämta produktkategorier
exports.getProductsByCategory = async (req, res) => {
  try {
    // Hämta kategorin från URL-parametern
    const { category } = req.params;
    console.log('Mottagen kategori:', category);

    // Hämta produkter från databasen baserat på kategori
    const products = await Product.find({
      category: category,
    });
    console.log('Produkter i kategorin:', products);

    // Skicka tillbaka produkterna som JSON
    res.status(200).json(products);
  } catch (error) {
    console.error('Fel vid hämtning av produkter via kategori:', error);
    res.status(500).json({ error: 'Internt serverfel' });
  }
};
