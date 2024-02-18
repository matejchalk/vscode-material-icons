import express from 'express';
import { engine } from 'express-handlebars';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MATERIAL_ICONS } from '../lib';

const dirname = fileURLToPath(path.dirname(import.meta.url));

const app = express();

app.use('/icons', express.static('generated/icons'));
app.use('/styles', express.static(path.join(dirname, 'styles')));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home', { icons: MATERIAL_ICONS });
});

const port = 3000;
app.listen(port, () => {
  console.info(`🚀 Server listening at http://localhost:${port}`);
});
