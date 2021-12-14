import { Database } from "sqlite3";

const DBSOURCE = "db.sqlite"

export const db = new Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }
    console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        priority text, 
        deadline date, 
        comment text
        )`,
    (err) => {
        // Table already created
        if (err) return;
        // Table just created, creating some rows
        var insert = 'INSERT INTO orders (name, priority, deadline, comment) VALUES (?,?,?,?)'
        db.run(insert, ["Order #1",'medium','2004-05-23', "test"])
    });  
});