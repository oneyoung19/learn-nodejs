/*
在Node.js中，SQLite是一个用于处理SQLite数据库的库。SQLite是一种轻量级的、基于文件的关系数据库管理系统，它不需要一个单独的服务器进程。使用SQLite，你可以在应用程序中嵌入一个完整的数据库系统，非常适合小型到中型应用程序。

在Node.js中，有几个库可以用于操作SQLite数据库，最常见的是sqlite3和better-sqlite3。

但在未来版本的Node.js中，可能会提供内置版的SQLite。

[node:sqlite](https://nodejs.org/docs/latest/api/sqlite.html)
*/
'use strict'
const { DatabaseSync } = require('node:sqlite')
const database = new DatabaseSync(':memory:')

// Execute SQL statements from strings.
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`)
// Create a prepared statement to insert data into the database.
const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)')
// Execute the prepared statement with bound values.
insert.run(1, 'hello')
insert.run(2, 'world')
// Create a prepared statement to read data from the database.
const query = database.prepare('SELECT * FROM data ORDER BY key')
// Execute the prepared statement and log the result set.
console.log(query.all())
// Prints: [ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]
