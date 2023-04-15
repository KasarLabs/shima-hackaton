"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
const dbTestConfig_1 = require("./dbTestConfig");
const pool = process.env.NODE_ENV == "test"
    ? dbTestConfig_1.testConfig
    : new pg_1.Pool({
        user: "Antoine",
        host: "localhost",
        database: "shima",
        password: "Shima75",
        port: 5432,
        ssl: false,
    });
const query = (text, params, callback) => {
    return pool.query(text, params, callback);
};
exports.query = query;
