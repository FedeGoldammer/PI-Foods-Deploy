import axios from 'axios';
import { BACK_PAGE, GET_RECIPES, GET_RECIPE_DETAILS, DIETS_FILTER, ALPHABETICAL_SORT, HEALTH_SCORE_SORT, SEARCH_RECIPE, GET_DIETS, LOCAL_HOST } from './types';


export function getRecipes() {
    return function(dispatch) {
        axios.get(`${LOCAL_HOST}/recipes`)
    .then((response) => {
        return dispatch({type: GET_RECIPES, payload: response.data})
    }).catch((error) => {
        console.log(error)
    }
    )
}};

export function getRecipesByName(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/recipes?name=${payload}`);
            return dispatch({type: SEARCH_RECIPE, payload: response.data})
        } catch {
            return alert ('Recipe Not Found')
        }
    }
}

export function getDiets() {
    return async function(dispatch) {
        try{
            var response = await axios.get(`${LOCAL_HOST}/diets`);
            return dispatch({type: GET_DIETS, payload: response.data.map(d => d.name)});
        } catch (error) {
            console.log(error)
        }
    }
};

export function addRecipe(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.post(`${LOCAL_HOST}/recipes`, payload);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
};

export function getRecipeDetails(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/recipes/${payload}`);
            return dispatch({type: GET_RECIPE_DETAILS, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export function dietsFilter(payload) {
    return {
        type: DIETS_FILTER,
        payload
    }
};

export function alphabeticalSort(payload) {
    return {
        type: ALPHABETICAL_SORT,
        payload
    }
};

export function healthScoreSort(payload) {
    return {
        type: HEALTH_SCORE_SORT,
        payload
    }
}

export function cleanPag() {
    return {
        type: BACK_PAGE,
        payload: {}
    }
}