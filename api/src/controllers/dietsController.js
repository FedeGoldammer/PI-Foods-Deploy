const { Router } = require('express');
const db = require("../db");
const { Recipe, Diets } = require('../db');
const router = Router();

const dietDB = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian','ovo vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescatarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30', 'dairy free'];

const dietsToDB = async (req, res) => {
    dietDB.forEach(e => {
        Diets.findOrCreate({
            where: { name: e}
        })
    });
}

const dietsList = async (req, res) => {

    dietDB.forEach(e => {
        Diets.findOrCreate({
            where: { name: e}
        })
    });
    const diets = await Diets.findAll();
    res.status(200).json(diets);
}

module.exports = {
    dietsList,
    dietsToDB,
}
