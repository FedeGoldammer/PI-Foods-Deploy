import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails, cleanPag } from '../redux/action';
import { Link } from 'react-router-dom'
import "./recipedetails.css";


export default function RecipeDetails(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    
    useEffect(() => {
        dispatch(getRecipeDetails(id));
        return () => {
            dispatch(cleanPag())
        }
    }, [dispatch, id]);
    
    const recipeDetails = useSelector(state => state.recipeDetails);
    
    return (
        
        <div className="details" key={id}>            
                  
            <div className="divimg">
                <img className="detailImg" 
                src={recipeDetails.image ? 
                recipeDetails.image : 
                '../images/imgnotfound.jpg'} alt="Pic not found"/>
            </div>

            <h1 className="texts">{recipeDetails.name}</h1>

            <div className="ddsh">
                <h2 className="texts">Diets: </h2> 
                {recipeDetails.diets ? recipeDetails.diets.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e}>{e}</h2>
                    )
                }) :
                recipeDetails.Diets?.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e.name}>{e.name}</h2>
                    )
                })}
            </div>

            <div className="ddsh">
                <h3 className="scores">Health Score: {recipeDetails.healthScore}</h3>
            </div>   

            <div className="ddsh">
                <h3 className="texts">Summary: </h3>
                <p className="summary">{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
            </div>

            <div className="ddsh">
                <h3 className="texts">Steps: </h3>
                <ul>{Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(e => {
                    return(
                        <li className="steps" key={e.number}>{e.step}</li>
                        )
                }) :
                <li>{recipeDetails.steps}</li>
                }</ul>
            </div>
            
            <Link to="/home"><button className="backButton">Go back to recipes</button></Link>
            
        </div>

    )      
        
}