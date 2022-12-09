import { BACK_PAGE, GET_RECIPES, ADD_RECIPE, GET_RECIPE_DETAILS, DIETS_FILTER, ALPHABETICAL_SORT, HEALTH_SCORE_SORT, SEARCH_RECIPE, GET_DIETS } from '../action/types.js';

//Establezco los estados iniciales
const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  recipeDetails: []
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
          return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
          };

        case DIETS_FILTER:
//          diets={e.diets? e.diets : e.Diets.map(e=>e.name)} />
          const all = state.allRecipes;
          let filtered;
          filtered = action.payload === 'all' ? all : all.filter(e=>{
            if  (e.Diets) {
              return e.Diets.find(el => el.name === action.payload);
            } else {
              return e.diets?.find(el => el === action.payload);
            }
          })
          console.log(filtered)
          return {
            ...state,
            recipes: filtered
          };

        case ALPHABETICAL_SORT:   
          let sortedRecipes = [...state.recipes]       
          sortedRecipes = action.payload === 'atoz' ?
          state.recipes.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          }) :
          state.recipes.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
          });          
          return {
            ...state,
            recipes: sortedRecipes
          };

        case HEALTH_SCORE_SORT:
          let sortedRecipesByScore = [...state.recipes] 
          sortedRecipesByScore = action.payload === 'asc' ?
          state.recipes.sort(function(a, b) {
            if (a.healthScore > b.healthScore) return 1;
            if (a.healthScore < b.healthScore) return -1;
            return 0;
          }) :
          state.recipes.sort(function(a, b) {
            if (a.healthScore < b.healthScore) return 1;
            if (a.healthScore > b.healthScore) return -1;
            return 0;
          });
          return {
            ...state,
            recipes: sortedRecipesByScore
          };

        case SEARCH_RECIPE:
          return {
            ...state,
            recipes: action.payload
          };
            
        case GET_RECIPE_DETAILS:
          return {
            ...state,
            recipeDetails: action.payload,
          };

        case ADD_RECIPE:
          return {
            ...state,
          }

        case GET_DIETS:
          return {
            ...state,
            diets: action.payload
          }

        case BACK_PAGE:
          return {
            ...state,
            recipeDetails: action.payload
          }

        default:
          return state;
    }
}