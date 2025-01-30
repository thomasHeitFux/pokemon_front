import React from 'react'
import { useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { getPokemons, getPokeNames } from '../actions'
import style from "./Searchbar/Searchbar.module.css"



export default function SearchBar() {
    const dispatch = useDispatch()
    const [name,setName]= useState("");
    const allPokemons = useSelector((state) => state.allPokemons);
    const allNames = allPokemons.map(e => e.name)


    function handleInputChange(e) {
        e.preventDefault();
        const inputValue = e.target.value.toLowerCase();
        setName(inputValue);

        if (inputValue === "") return;  // Evita llamadas vacías

        if (allNames.find(e => e.includes(inputValue))) {
            dispatch(getPokeNames(inputValue));
        }
};

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     if (allNames.find(e => e === name.toLowerCase())) {
    //         dispatch(getPokeNames(name.toLowerCase()))
    //     }else{
    //     alert(`${name} is not a pokemon `)
    //     dispatch(getPokemons())}
    // }
   
      

return(
    <div className={style.container}>
        <input className={style.searchbar} onChange={e=>handleInputChange(e)} type="text" placeholder='Search...'/>
        {/* <button className={style.button}  onClick={e=>handleSubmit(e)} onKeyPress={e=>handleSubmit(e)} type="submit">Search</button> */}
    </div>
)

}