const express = require('express');
const { getAllGames, getGameById } = require('./controllers');
const app = express();
app.use(express.json());
app.get('/games', async (req, res) => {
  const games = await getAllGames();
  res.json({ games });
});
app.get('/games/details/:id', async (req, res) => {
  const games = await getGameById(parseInt(req.params.id));
  res.json({ games });
});
module.exports = { app };
