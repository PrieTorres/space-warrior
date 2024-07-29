import app from '../index.js'
import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`servidor escutando em: http://localhost:${port}`)
});
