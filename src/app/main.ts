import express from 'express';
import { engine } from 'express-handlebars';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseQueryParams } from './utils/parse';
import { searchIcons } from './utils/search';

const dirname = fileURLToPath(path.dirname(import.meta.url));

const app = express();

app.use('/icons', express.static('generated/icons'));
app.use('/styles', express.static(path.join(dirname, 'styles')));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(dirname, 'views'));

app.get('/', (req, res) => {
  const { q } = parseQueryParams(req.query);
  res.render('home', {
    icons: searchIcons(q),
    ...(req.headers['hx-request'] && { layout: false }),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(`🚀 Server listening at http://localhost:${port}`);
});
