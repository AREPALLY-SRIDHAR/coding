const express = require("express");

const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
let database = null;
const dataPath = path.join(__dirname, "cricketTeam.db");

const install = async () => {
  try {
    database = await open({
      filename: dataPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
install();
const convert = (dataObject) => {
  return {
    playerId: dataObject.player_id,
    playerName: dataObject.player_name,
    jerseyNumber: dataObject.jersey_number,
    role: dataObject.role,
  };
};

app.get("/players/", async (request, response) => {
  const playerQuery = `SELECT * FROM cricket_team`;
  const players = await database.all(playerQuery);
  response.send(players.map((each) => convert(each)));
});

module.exports = app;
