import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { postPokemon, getTypes, getPokemons } from '../actions';
import { Link, useHistory } from "react-router-dom"
import style from "./CreatePokemon/CreatePokemon.module.css"

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const history = useHistory()
    const allPokemons = useSelector((state) => state.allPokemons);
    const allNames = allPokemons.map(e => e.name)

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    const [input, setInput] = React.useState({
        img: "",
        name: "",
        hp: "25",
        atack: "25",
        defense: "25",
        speed: "25",
        height: "25",
        width: "25",
        types: []
    })

    const [errors, setErrors] = React.useState({});

    React.useEffect(() => {
        dispatch(getTypes())
    }, [])


    // VALIDATOR
    function validate(input) {
        let errors = {};

        if (!input.name) {
            errors.name = 'Name is required.'
        } else if (allNames.find(e => e === input.name.toLowerCase())) {
            errors.name = 'There is already a pokemon with that name.'
        }
        //  || !/.*\.(gif|jpe?g|bmp|png)$/.test(input.img)
        else if (!/(www|http:|https:)+[^\s]+[\w]/.test(input.img)){
            errors.img= "if the image is not found we will assign a default image";
            input.img=null
        }

        else if (input.types.length > 2 ) {
            errors.type = 'You must choose between 1 and 2 types.'
        }
        else if (!input.hp || input.hp > 200 || /([a-z])/.test(input.hp)) {
            errors.hp = 'Health points must be within range.'
        }
        else if (!input.atack || input.atack > 200 || /([a-z])/.test(input.atack) ) {
            errors.atack = 'Atack points must be within range.'
        }
        else if (!input.defense || input.defense > 200 || /([a-z])/.test(input.defense)) {
            errors.defense = 'Defense points must be within range.'
        }
        else if (!input.speed || input.speed > 200 || /([a-z])/.test(input.speed)) {
            errors.speed = 'Speed points must be within range.'
        }
        else if (!input.height || input.height > 200 || /([a-z])/.test(input.height) ) {
            errors.height = 'Height points must be within range.'
        }
        else if (!input.width || input.width > 200 || /([a-z])/.test(input.width)) {
            errors.width = 'width points must be within range.'
        }
        return errors
    };


    //HANDLE CHANGE
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        //SETEA EL ERROR
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }
    //HANDLE SELECT
    function handleSelect(e) {
        if (input.types.length<2 &&!input.types.includes(e.target.value)) {
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            });
        }else{alert("You must choose between 1 and 2 different types ")}
        //SETEA EL ERROR
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    //DELETE
    function handleDelete(i) {
        setInput({
            ...input,
            types: input.types.filter(e => e !== i)
        });
    }
    //HANDLE SUBMIT
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postPokemon(input));
        alert('Pokemon creado')
        setInput({
            img: "",
            name: "",
            hp: "",
            atack: "",
            defense: "",
            speed: "",
            height: "",
            width: "",
            types: []
        })
        history.push('/home')
    }

    return (
        <div className={style.background}>
            <Link to="/home"><button className={style.back}>Go back</button></Link>
            
            <form className={style.form}>
            <h1>Create a Pokemon!</h1>
                <div>
                    {/* INPUT IMAGEN */}
                
                    <input className={style.controls} placeholder="Enter the image" autoComplete='off' type="text" value={input.img} name="img" onChange={handleChange} />
                    {errors.img && (<p className={style.danger}>{errors.img}</p>)}
                </div>
                <div>
                    {/* INPUT NOMBRE */}
                   
                    <input className={style.controls} placeholder="Enter the name" autoComplete='off' type="text" name='name' onChange={handleChange} value={input.name} />
                    {/* ERROR */}
                    {errors.name && (<p className={style.danger}>{errors.name}</p>)}
                </div>
                <div className={style.input}>
                    {/* INPUT VIDA */}
                    <label>Health:</label>
                    <input type="range" min="0" max={"200"} name='hp' onChange={handleChange} value={input.hp} />
                    <div className={style.number} >{input.hp} pts.</div>
                    {errors.hp && (<p className={style.danger}>{errors.hp}</p>)}
                </div>
                <div className={style.input}>
                    <label>Atack:</label>
                    <input type="range" min={'0'} max={'200'} name='atack' onChange={handleChange} value={input.atack} />
                    <div className={style.number} >{input.atack} pts.</div>
                    {errors.atack && (<p className={style.danger}>{errors.atack}</p>)}
                </div>
                <div className={style.input}>
                    <label>Defense:</label>
                    <input type="range" min={'0'} max={'200'} name='defense' onChange={handleChange} value={input.defense} />
                    <div className={style.number} >{input.defense} pts.</div>
                    {errors.defense && (<p className={style.danger}>{errors.defense}</p>)}
                </div>
                <div className={style.input}>
                    <label>Speed:</label>
                    <input type="range" min={'0'} max={'200'} name='speed' onChange={handleChange} value={input.speed} />
                    <div className={style.number} >{input.speed} m/h</div>
                    {errors.speed && (<p className={style.danger}>{errors.speed}</p>)}
                </div>
                <div className={style.input}>
                    <label>Height:</label>
                    <input type="range" min={'0'} max={'200'} name='height' onChange={handleChange} value={input.height} />
                    <div className={style.number} >{input.height} fts.</div>
                    {errors.height && (<p className={style.danger}>{errors.height}</p>)}
                </div>
                <div className={style.input}>
                    <label>Width:</label>
                    <input type="range" min={'0'} max={'200'} name='width' onChange={e => handleChange(e)} value={input.width} />
                    <div className={style.number} >{input.width} lb.</div>
                    {errors.width && (<p className={style.danger}>{errors.width}</p>)}
                </div>


                <select 
                className={style.select}
                    name='type'
                    onChange={e => handleSelect(e)}>
                    {types.map((t) => (
                        <option value={t.name}>{t.name}</option>
                    ))}
                </select>
                <ul className={style.ul}>
                    {input.types.map(e => (<li className={style.li} key={input.types.indexOf(e)}>{e}<p className={style.p} onClick={()=>handleDelete(e)}>x</p></li>))}
                </ul>
                {errors.type && (<p className={style.danger}>{errors.type}</p>)}
                {input.types.length > 0 && input.name.length > 0 && !errors.name && !errors.hp && !errors.atack && !errors.defense && !errors.height && !errors.width && !errors.type && (<button onClick={e => handleSubmit(e)} className={style.button} type="submit">Create</button>)}

            </form>
        </div>
    )
}





// Nombre *
// Vida
// Fuerza
// Defensa
// Velocidad
// Altura
// Peso