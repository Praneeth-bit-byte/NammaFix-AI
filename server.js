import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API fallback / health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NammaFix-AI API' });
});

// Serve static frontend build in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NammaFix-AI server running on http://0.0.0.0:${PORT}`);
});
