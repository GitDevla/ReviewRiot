const config = require('./next.config.js');
const db = require('mysql2/promise');
const fs = require('fs');
const crypto = require('crypto');

async function queryDatabase(query) {
    const conn = await db.createConnection({
        host: config.env.databaseHost,
        user: config.env.databaseUser,
        password: config.env.databasePassword,
        multipleStatements: true
    })
    await conn.query(query);
    conn.end();
}

async function nukeDatabase() {
    console.log("Droping database");
    await queryDatabase("DROP DATABASE IF EXISTS reviewriot;");
    console.log("Database droped");
}

async function initalizeDatabase() {
    console.log("Initalizing database");
    const dataSql = fs.readFileSync('./reviewriot.sql').toString();
    await queryDatabase(dataSql);
    console.log("Database initalized");
}

async function generateEnvfile() {
    fs.writeFileSync(".env.local", "");
}

async function generateSecret(name, strength = 32) {
    console.log("Generating " + name + " secret");
    const secret = crypto.randomBytes(strength).toString('hex');
    fs.appendFileSync(".env.local", `${name}=${secret}`);
}

async function start() {
    await nukeDatabase();
    initalizeDatabase();
    await generateEnvfile();
    generateSecret("JWT_TOKEN", 32);
}

start();
