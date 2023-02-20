const config = require('./next.config.js');
const db = require('mysql2/promise');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path')

async function initalizeDatabase() {
    console.log("Initalizing database");
    const dataSql = fs.readFileSync('./reviewriot.sql').toString();
    const conn = await db.createConnection({
        host: config.env.databaseHost,
        user: config.env.databaseUser,
        password: config.env.databasePassword,
        database: config.env.databaseDatabase,
        multipleStatements: true
    })

    await conn.query(dataSql);
    console.log("Database initalized");
    conn.end();
}

function generateEnvfile() {
    fs.writeFileSync(".env.local", "");
}

function generateSecret(name, strength = 32) {
    console.log("Generating " + name + " secret");
    const secret = crypto.randomBytes(strength).toString('hex');
    fs.appendFileSync(".env.local", `${name}=${secret}`);
}

initalizeDatabase();
generateEnvfile();
generateSecret("JWT_TOKEN", 32);