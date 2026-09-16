import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Example API to get products for POS
  app.get('/api/products', (req, res) => {
    // In cPanel MySQL, you would connect via `mysql2` package here and run `SELECT * FROM products`
    res.json([
      { id: '1', name: 'Premium Rice 5kg', category: 'General', price: 12, stock: 45, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80' },
      { id: '2', name: 'Cooking Oil 2L', category: 'General', price: 8, stock: 30, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80' },
      { id: '3', name: 'Gold Coin (1 Gram)', category: 'Gold', price: 65, stock: 10, image: 'https://images.unsplash.com/photo-1610375461246-83ff852e8152?auto=format&fit=crop&w=500&q=80' }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
