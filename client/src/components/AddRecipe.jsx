import React from "react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getDiets, addRecipe, getRecipesByName } from '../redux/action'
import './addrecipe.css';


function validURL(str) {
    var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

function validate(input) {
    const errors = {};
    if (!input.name) errors.name = 'Please complete with a recipe name';
    if (!input.summary) errors.summary = 'Please add some comments about your recipe';
    if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'The score must be a number between 1 and 100';
    if (!input.steps) errors.steps = 'Please detail the steps for your recipe';
    if (!input.diets.length) errors.diets = 'You must select at least one diet';
    if (input.image) {
        const validImg = validURL(input.image);
        if (!validImg) {
            errors.image = 'Please complete with a valid image url';
        }
    }
    return errors;
};


export default function AddRecipe() {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    const history = useHistory();
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        name: ''  ,
        summary: '',
        healthScore: '',
        steps: '',
        diets: [],
        image: ''
    })
    
    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {   //// de esta manera el componente muestra los cambios (componentdidupdate?) para poder ir validando
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value
            }
            const validations = validate(newInput);
            setErrors(validations)
            return newInput
        });

    };
    
    function handleCheckBox(e) {
       
        let newArray = input.diets;
        let find = newArray.indexOf(e.target.value);
        
        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }
        
        setInput({
            ...input,
            diets: newArray
        });
        const validations = validate(input);
        setErrors(validations)
        
    }
    
    function handleSubmit(e) {
         e.preventDefault();

        if (Object.values(errors).length > 0) {
             alert("Please complete the information required");
        } else if (
            input.name === '' && 
            input.summary === '' && 
            input.healthScore === '' &&
            input.steps === '' &&
            !input.diets.length) {
            alert("Please complete the form");}
        else {
            dispatch(addRecipe(input));
            alert('New recipe added successfully!')
            setInput({
                name: "",
                summary: '',
                score: '',
                healthScore: '',
                steps: '',
                diets: [],
                image: ''
            });
            history.push('/home')
        }
    };
    
    
    return (
        <div className="addRecipe">
            <h1 className="msg">Create your own recipe!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form">
                    <div className="prettierForm">
                        <div className="nameInput">
                            <label className="msgs">Name:</label>
                            <input className="inputs" name="name" type="text" value={input.name} onChange={e => handleChange(e)}/>
                            {errors.name && (
                                <span className="errors">{errors.name}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Summary:</label>
                            <textarea className="inputs" name="summary" type="text" rows="4" cols="30" value={input.summary} onChange={e => handleChange(e)}/>
                            {errors.summary && (
                                <span className="errors">{errors.summary}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Health Score:</label>
                            <input className="inputs" name="healthScore" type="number" value={input.healthScore} onChange={e => handleChange(e)}/>
                            {errors.healthScore && (
                                <span className="errors">{errors.healthScore}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Steps:</label>
                            <textarea className="inputs" name="steps" type="text" rows="4" cols="30" value={input.steps} onChange={e => handleChange(e)}/>
                            {errors.steps && (
                                <span className="errors">{errors.steps}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Image URL:</label>
                            <input className="inputs" name="image" type="text" value={input.image} onChange={e => handleChange(e)}/>
                            {errors.healthScore && (
                                <span className="errors">{errors.image}</span>
                            )}
                        </div>
                    </div>
                    <div className="checkSelect">
                        <label className="msgs">Diets:</label>
                        {diets.map(d =>{
                            return (
                                <div key={d} className="checks">
                                    <label className="dietas">{d}</label>
                                    <input className="checks" type="checkbox" name={d} value={d} selected={input.diets.includes(d)} onChange={e => handleCheckBox(e)}/>
                                </div>
                            )
                        })}
                        {errors.diets && (
                            <span className="errors">{errors.diets}</span>
                        )}
                    </div>
                </div>
                <button className="submitButton" type="submit">Submit Recipe</button>
                <Link to="/home"><button className="goBackButton">Go back</button></Link>
            </form>
        </div>



    )

};