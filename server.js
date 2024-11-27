const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Archivos estáticos (CSS, JS, imágenes)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/webfonts', express.static(path.join(__dirname, 'webfonts')));

// Ruta para servir el archivo login.html
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Redirigir la raíz '/' al login.html
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Rutas para otros archivos HTML
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/categories.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'categories.html'));
});

app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cart.html'));
});

app.get('/my-profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-profile.html'));
});

app.get('/product-info.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'product-info.html'));
});

app.get('/products.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'products.html'));
});

app.get('/sell.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'sell.html'));
});

// Rutas para los archivos JSON en la carpeta 'data'
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/cart/buy.json'));
});

app.get('/cat', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/cats/cat.json'));
});

app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    res.sendFile(path.join(__dirname, `data/cats_products/${productId}.json`));
});

app.get('/product-comment/:id', (req, res) => {
    const commentId = req.params.id;
    res.sendFile(path.join(__dirname, `data/products_comments/${commentId}.json`));
});

app.get('/sell', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/sell/publish.json'));
});

app.get('/user-cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/user_cart/25801.json'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});