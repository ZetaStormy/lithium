exports.run = (client) => {
  //SQLite requires better-sqlite3
  const SQLite = require("better-sqlite3");
  //Create a new database using SQLite() constructor.
  const sql = new SQLite("./scores.sqlite");  
  
  //Set the streaming presence activity.
  client.user.setActivity("LiteriumNT", {
    type: "STREAMING", 
    url: "https://twitch.tv/zetastormy"
  });  

  //Get the table.
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  //Create the table if it doesn't exists.
  if (!table["count(*)"]) {
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  //Create methods to get and set data from the database.
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");   
};