import express from 'express';

const app = express();

app.use('/icons', express.static('generated/icons'));

const port = 3000;
app.listen(port, () => {
  console.info(`🚀 Server listening at http://localhost:${port}`);
});
