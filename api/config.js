const PORT = process.env.PORT || 3001;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'naranja123';
const DB_NAME = process.env.DB_NAME || 'food';
const DB_PORT = process.env.DB_PORT || 3001;
const API_KEY = 'ae601b0bece84fcb85d6e223957b69a3';

module.exports = {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    API_KEY
}