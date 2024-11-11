const request = require('supertest');
let { app } = require('../index.js');
let { getAllGames, getGameById } = require('../controllers/index.js');
const http = require('http');
jest.mock('../controllers/index.js', () => ({
  ...jest.requireActual('../controllers/index.js'),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

describe('Controller Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all employees', () => {
    const mockedGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];
    getAllGames.mockReturnValue(mockedGames);
    const result = getAllGames();
    expect(result).toEqual(mockedGames);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints tests', () => {
  it('GET API /games should get all games', async () => {
    const mockedGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];

    getAllGames.mockResolvedValue(mockedGames);

    const res = await request(app).get('/games');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      games: mockedGames,
    });
    expect(res.body.games.length).toBe(3);
  });

  it('GET /games/details/:id should get an game by ID', async () => {
    const mockedGame = {
      gameId: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      genre: 'Adventure',
      platform: 'Nintendo Switch',
    };

    getGameById.mockResolvedValue(mockedGame);

    const res = await request(app).get('/games/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      games: mockedGame,
    });
  });
});
