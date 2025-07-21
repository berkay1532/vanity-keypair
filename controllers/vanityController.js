import { handleKeypairGeneration } from '../services/vanityService.js';

export async function generateKeypair(req, res) {
  const { prefix, suffix } = req.body;

  if ((prefix && suffix) || (!prefix && !suffix)) {
    return res.status(400).json({ error: 'Ya prefix ya da suffix belirtmelisiniz.' });
  }

  try {
    const result = await handleKeypairGeneration({ prefix, suffix });
    res.json(result);
  } catch (error) {
    console.error("Keypair oluşturma hatası:", error);
    res.status(500).json({ error: 'Sunucu hatası oluştu.' });
  }
}
