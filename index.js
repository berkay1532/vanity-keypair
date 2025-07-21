import express from 'express';
import vanityRoutes from './routes/vanityRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/generate', vanityRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Vanity API aktif: http://localhost:${PORT}`);
});
