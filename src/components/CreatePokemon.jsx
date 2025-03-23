import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { postPokemon, getTypes, getPokemons } from '../actions';
import { Link, useHistory } from "react-router-dom"
import style from "./CreatePokemon/CreatePokemon.module.css"
import ash from '../assets/ash.png';

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const history = useHistory()
    const allPokemons = useSelector((state) => state.allPokemons);
    const allNames = allPokemons.map(e => e.name)
    console.log(types);
    

    useEffect(() => {
        dispatch(getPokemons(),getTypes());
    }, [dispatch]);
//----------------------------------------------ESTADO PARA LOS INPUTS
    const [input, setInput] = useState({
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
//---------------------------------------------ESTADO PARA LOS ERRORES
    const [errors, setErrors] = useState({});

    React.useEffect(() => {
        dispatch(getTypes())
    }, [])


//------------------------------------------------------------ VALIDATOR
    function validate(input) {
        let errors = {};

        if (!input.name) {
            errors.name = 'Name is required.'
        } else if (allNames.find(e => e === input.name.toLowerCase())) {
            errors.name = 'There is already a pokemon with that name.'
        }
        else if (input.name.length>12) {
            errors.name = 'The name is too long.'
        }
        //  || !/.*\.(gif|jpe?g|bmp|png)$/.test(input.img)
        else if (!/(www|http:|https:)+[^\s]+[\w]/.test(input.img)|| !/(gif|jpe?g|bmp|png)/.test(input.img)){
            errors.img= "if the image is not found we will assign a default image";
        }

        else if (input.types.length > 2 ) {
            errors.type = 'You must choose between 1 and 2 types.'
        }
        else if (!input.hp || input.hp > 100 || /([a-z])/.test(input.hp)) {
            errors.hp = 'Health points must be within range.'
        }
        else if (!input.atack || input.atack > 100 || /([a-z])/.test(input.atack) ) {
            errors.atack = 'Atack points must be within range.'
        }
        else if (!input.defense || input.defense > 100 || /([a-z])/.test(input.defense)) {
            errors.defense = 'Defense points must be within range.'
        }
        else if (!input.speed || input.speed > 100 || /([a-z])/.test(input.speed)) {
            errors.speed = 'Speed points must be within range.'
        }
        else if (!input.height || input.height > 100 || /([a-z])/.test(input.height) ) {
            errors.height = 'Height points must be within range.'
        }
        else if (!input.width || input.width > 100 || /([a-z])/.test(input.width)) {
            errors.width = 'width points must be within range.'
        }
        return errors
    };
//--------------------------------------------------------------------HANDLER CHANGE
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
//---------------------------------------------------------------------SETEA EL ERROR
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }
//---------------------------------------------------------------------HANDLER SELECT
    function handleSelect(e) {
        if (input.types.length<2 &&!input.types.includes(e.target.value)) {
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            });
        }else{alert("You must choose between 1 and 2 different types ")}
//----------------------------------------------------------------------SETEA EL ERROR
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

//---------------------------------------------------------------------HANDLER DELETE
    function handleDelete(i) {
        setInput({
            ...input,
            types: input.types.filter(e => e !== i)
        });
    }
//----------------------------------------------------------------------HANDLER SUBMIT
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
{/*--------------------------------------------------------------------INPUT IMAGEN------------------------------------------------------ */}
                <div>
                    <input className={style.controls} placeholder="Enter the image" autoComplete='off' type="text" value={errors.img?input.img=null:input.img} name="img" onChange={handleChange} />
                    {errors.img && (<p className={style.danger}>{errors.img}</p>)}
                </div>
{/*------------------------------------------------------------------- INPUT NOMBRE ---------------------------------------------------------*/}
                <div>
                    <input className={style.controls} placeholder="Enter the name" autoComplete='off' type="text" name='name' onChange={handleChange} value={input.name} />
                    {errors.name && (<p className={style.danger}>{errors.name}</p>)}
                </div>
{/*------------------------------------------------------------------ INPUT VIDA ------------------------------------------------------------*/}
                <div className={style.input}>
                    <label>Health:</label>
                    <input type="range" min="0" max={"100"} name='hp' onChange={handleChange} value={input.hp} />
                    <div className={style.number} >{input.hp} pts.</div>
                    {errors.hp && (<p className={style.danger}>{errors.hp}</p>)}
                </div>
{/*------------------------------------------------------------------ INPUT ATAQUE ----------------------------------------------------------*/}
                <div className={style.input}>
                    <label>Atack:</label>
                    <input type="range" min={'0'} max={'100'} name='atack' onChange={handleChange} value={input.atack} />
                    <div className={style.number} >{input.atack} pts.</div>
                    {errors.atack && (<p className={style.danger}>{errors.atack}</p>)}
                </div>
{/*-------------------------------------------------------------- INPUT DEFENSA ----------------------------------------------*/}               
                <div className={style.input}>
                    <label>Defense:</label>
                    <input type="range" min={'0'} max={'100'} name='defense' onChange={handleChange} value={input.defense} />
                    <div className={style.number} >{input.defense} pts.</div>
                    {errors.defense && (<p className={style.danger}>{errors.defense}</p>)}
                </div>
{/*-------------------------------------------------------------- INPUT SPEED ----------------------------------------------*/} 
                <div className={style.input}>
                    <label>Speed:</label>
                    <input type="range" min={'0'} max={'100'} name='speed' onChange={handleChange} value={input.speed} />
                    <div className={style.number} >{input.speed} m/h</div>
                    {errors.speed && (<p className={style.danger}>{errors.speed}</p>)}
                </div>
{/*-------------------------------------------------------------- INPUT HEIGHT ----------------------------------------------*/} 
                <div className={style.input}>
                    <label>Height:</label>
                    <input type="range" min={'0'} max={'100'} name='height' onChange={handleChange} value={input.height} />
                    <div className={style.number} >{input.height} fts.</div>
                    {errors.height && (<p className={style.danger}>{errors.height}</p>)}
                </div>
{/*-------------------------------------------------------------- INPUT WIDTH ----------------------------------------------*/} 
                <div className={style.input}>
                    <label>Weight:</label>
                    <input type="range" min={'0'} max={'1000'} name='width' onChange={e => handleChange(e)} value={input.width} />
                    <div className={style.number} >{input.width} lb.</div>
                    {errors.width && (<p className={style.danger}>{errors.width}</p>)}
                </div>
{/*-------------------------------------------------------------- SELECT TYPES ----------------------------------------------*/} 
                <select 
                className={style.select}
                    name='type'
                    onChange={e => handleSelect(e)}>
                    {types.map((t) => (
                        <option value={t}>{t}</option>
                    ))}
                </select>
                <ul className={style.ul}>
                    {input.types.map(e => (<li className={style.li} key={input.types.indexOf(e)}>{e}<p className={style.p} onClick={()=>handleDelete(e)}>x</p></li>))}
                </ul>
{/*-------------------------------------------------------------- BUTTON SUBMIT ----------------------------------------------*/} 
                {errors.type && (<p className={style.danger}>{errors.type}</p>)}
                {input.types.length > 0 && input.name.length > 0 && !errors.name && !errors.hp && !errors.atack && !errors.defense && !errors.height && !errors.width && !errors.type && (<button onClick={e => handleSubmit(e)} className={style.button} type="submit">Create</button>)}
            </form>
            <div className={style.ash}>
                <img src={ash} />
            </div>
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