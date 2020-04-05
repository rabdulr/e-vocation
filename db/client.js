const { Client } = require('pg');

let client;

if (process.env.HENRY){
  client = new Client({ dialect: 'postgres', user: 'hankyspanks', password: 'password', database: 'test', host: 'localhost' });
} else {
  client = new Client(process.env.DATABASE_URL || 'postgres://localhost/capstone')
}

client.connect();
module.exports = client;