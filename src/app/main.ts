import express from 'express';
import { engine } from 'express-handlebars';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();

app.use('/icons', express.static('generated/icons'));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', join(fileURLToPath(dirname(import.meta.url)), 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

const port = 3000;
app.listen(port, () => {
  console.info(`🚀 Server listening at http://localhost:${port}`);
});
