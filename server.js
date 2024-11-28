const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'clave';
const mariadb = require("mariadb");


const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "ecommerce",
  connectionLimit: 5,
});


const app = express();
const port = 3000;

// Configurar CORS
app.use(cors());


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



app.get("/todo", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT ID,NOMBRE,DESCRIPCION,PRECIO,CANTIDAD_VENDIDOS FROM carrito "
      );
  
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
  });
  
// Endpoint POST /login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin") {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
  });
  
  // Middleware para interpretar JSON
app.use(express.json());

app.post("/info", async (req, res) => {
  let conn;
  try {
    console.log("Datos recibidos en el POST:", req.body); // Para verificar qué datos llegan
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO carrito (NOMBRE, DESCRIPCION, PRECIO, CANTIDAD_VENDIDOS) VALUES (?, ?, ?, ?)`,
      [req.body.NOMBRE, req.body.DESCRIPCION, req.body.PRECIO, req.body.CANTIDAD_VENDIDOS]
    );
    res.json({ ID: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); // release to pool
  }
});

  
  const verifyToken = (req, res, next) => {
    const token = req.headers["access-token"];
    if (!token) return res.status(403).json({ message: "Token no proporcionado" });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token inválido" });
    }
  };
  


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});