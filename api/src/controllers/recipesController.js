const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diets } = require('../db');
const { API_KEY } = require('../../config.js');
const router = Router();
const json = require ("../jsonData.json")


const getJsonInfo = async () => {
    const apiInfo = json.map(e => {
        return {
            id: e.id,
            image: e.image,
            name: e.name,
            diets: e.diets,
            summary: e.summary,
            healthScore: e.healthScore,
            steps: e.steps
        }
    })
    
    return apiInfo;
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const getApiById = async (id) => {
    return await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
}

const getDbById = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const recipeByID = async (req, res) => {
    const { id } = req.params  
    try {
        // Se fija si la id es una UUID
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            let dbRecipesById = await getDbById(id);
            return res.status(200).json(dbRecipesById)

        } else { 
            apiRecipesById = await getApiById(id)
            if (apiRecipesById.data.id) {
                let recipeDetails =  {                    
                    image: apiRecipesById.data.image,
                    name: apiRecipesById.data.title,
                    diets: apiRecipesById.data.diets,
                    summary: apiRecipesById.data.summary,
                    healthScore: apiRecipesById.data.healthScore,
                    steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.status(200).send(recipeDetails); 
            }
        }
    } catch {
        return res.status(400).send('La receta no existe')
    }
}


const allDataRecipes = async (req, res) => {
    const {name} = req.query;

    const data = await getJsonInfo();
    const info = await getDbInfo();
    const allData = data.concat(info);

    try {
        if (name !== undefined) {

            if (name !== null) {
                const recipeQuery = allData.filter((e) => 
                    e.name.toLowerCase().includes(name.toLowerCase())
                );

                if (recipeQuery.length === 0) {
                    const infoUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
                    const info = await infoUrl.data.results.map(e => {
                        return {
                            id: e.id,
                            image: e.image,
                            name: e.title,
                            diets: e.diets,
                            summary: e.summary,
                            healthScore: e.healthScore,
                            steps: e.analyzedInstructions[0]?.steps.map(e => {
                                return {
                                    number: e.number,
                                    step: e.step
                                }
                            })
                        }
                    })
                    const infoQuery = info.filter((e) => 
                    e.name.toLowerCase().includes(name.toLowerCase())
                    );

                    if (infoQuery.length === 0) {
                        res.send("Receta no existe");
                    } else {
                        res.status(200).json(infoQuery);
                    }

                } else {
                    res.status(200).json(recipeQuery);
                }
            }
            } else {
                res.status(200).json(allData);
            }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const recipeCreate = async (req, res) => {
    try {
        const { name, summary, image, healthScore, steps, diets } = req.body
        const newRecipe = await Recipe.create({
            name,
            summary,
            image,
            healthScore,
            steps,
        })

        let dietTypeDB = await Diets.findAll({
            where: {name: diets}
        })
        newRecipe.addDiets(dietTypeDB)
        res.status(200).json(newRecipe);  
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};


module.exports = {
    recipeCreate,
    allDataRecipes,
    recipeByID,
}
