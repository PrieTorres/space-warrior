import app from '../server/index.js'
import  dotenv  from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`servidor escutando em: http://localhost:${port}`)
});
