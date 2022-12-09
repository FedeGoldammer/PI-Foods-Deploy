const { Router } = require('express');
const {
    allDataRecipes,
    recipeByID,
    recipeCreate,
} = require('../controllers/recipesController.js');
const { dietsList } = require('../controllers/dietsController.js');
const axios = require('axios');
const router = Router();

// Configuración de rutas
router.get("/recipes", allDataRecipes)

router.get("/recipes/:id", recipeByID)

router.post("/recipes", recipeCreate)

router.get("/diets", dietsList)


module.exports = router;
