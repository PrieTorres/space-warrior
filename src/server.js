import path from 'path';
import app, {buildPath} from '../index.js'
import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`servidor escutando em: http://localhost:${port}`)
});
