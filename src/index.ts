import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (_, res) => {
  res.status(200).json({
    message: "good day"
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));
