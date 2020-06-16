exports.run = (client) => {
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');  
    var now = new Date().toLocaleString("es-ES", {timeZone: "America/Santiago", timeZoneName: "short", weekday: "short", month: "long", day: "2-digit", year: "numeric", hour: '2-digit', minute:'2-digit'});
  
client.user.setActivity('LiteriumNT', { type: 'STREAMING', url:'https://twitch.tv/zetastormy' })
  .then(presence => console.log(`[WS => Shard 0] [READY] The presence established is ${presence.activities[0].name}.`))
  .catch(console.error);  
  console.log(`[WS => Shard 0] [CONNECTED] The bot is working - ${now}`);
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
    
};