"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConfig = void 0;
const pg_1 = require("pg");
exports.testConfig = new pg_1.Pool({
    user: 'bora',
    host: 'localhost',
    database: 'test_shima',
    password: 'qlfsat',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});
