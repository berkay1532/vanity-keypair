import express from "express";
import cors from "cors"; // ✅ CORS modülü eklendi
import vanityRoutes from "./routes/vanityRoutes.js";

const app = express();
const PORT = 3000;

// ✅ CORS middleware'i tüm rotalarda aktif hale getiriyoruz
app.use(cors());

app.use(express.json());
app.use("/generate", vanityRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Vanity API aktif: http://localhost:${PORT}`);
});
