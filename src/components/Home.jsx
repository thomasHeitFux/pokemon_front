import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filteredTypes, filteredCreated, sortByName, orderPower, powerAtack } from '../actions'
import Card from './card';
import { Link } from "react-router-dom"
import style from "./Home.module.css"
import { Paginado } from './paginado';
import SearchBar from './SearchBar';


export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const [order, setOrder] = useState("")
    const lastIdx = currentPage * pokemonsPerPage;
    const firstIdx = lastIdx - pokemonsPerPage;
    const currPokemons = allPokemons.slice(firstIdx, lastIdx);
    const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    function handleFilterTypes(e) {
        dispatch(filteredTypes(e.target.value))
    }
    function handlerCreated(e) {
        dispatch(filteredCreated(e.target.value))
    }
    function handlerSort(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado de ${e.target.value}`)
    }
    function handlerOrderPower(e) {
        e.preventDefault();
        dispatch(orderPower(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado de ${e.target.value}`)
    }
    function handlerPowerAtack(e) {
        e.preventDefault();
        dispatch(powerAtack())
        setCurrentPage(1);
        setOrder(`ordenado de ${e.target.value}`)
    }

    return (

        <div className={style.background}>


            <div className={style.nav}>
                <Link to='/'>
                    <button className={style.back}>Go back</button>
                </Link>
                <div className={style.searchCreate}>
                    <Link to='/create'>
                        <button className={style.create}>Create</button>
                    </Link>
                    <SearchBar />
                </div>

                <div className={style.filts}>
                    <select className={style.filters} onChange={e => handlerSort(e)}>
                        <option value="A-Z">A-Z</option>
                        <option value="Z_A">Z-A</option>
                    </select>

                    {/* botoncito */}
                    {/* <button onClick={handlerPowerAtack}>atack</button> */}
                    
                    <select className={style.filters} onChange={e => handlerOrderPower(e)}>
                        <option value="strong"> Strong</option>
                        <option value="weak">Weak</option>
                    </select>
                    <select className={style.filters} onChange={(e) => handlerCreated(e)}>
                        <option value="All">All</option>
                        <option value="existente">existing</option>
                        <option value="creados">Created</option>
                    </select>
                    <select className={style.filters} onChange={e => handleFilterTypes(e)}>
                        <option value="all">All</option>
                        <option value="normal">Normal</option>
                        <option value="fire">Fire</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="rock">Rock</option>
                        <option value="shadow">Shadow</option>
                        <option value="dragon">Dragon</option>
                        <option value="unknown">Unknown</option>
                        <option value="fairy">Fairy</option>
                        <option value="dark">Dark</option>
                        <option value="ice">Ice</option>
                        <option value="psychic">Psychic</option>
                        <option value="grass">Grass</option>
                        <option value="water">Water</option>
                        <option value="electric">Electric</option>
                        <option value="steel">Steel</option>
                        <option value="ghost">Ghost</option>
                        <option value="bug">Bug</option>
                        <option value="ground">Ground</option>
                        <option value="fighting">Fighting</option>
                    </select>
                </div>


            </div>


            {currPokemons.length>0?currPokemons.map(e => ((
                <Link to="/home">
                    <Card
                        img={e.img}
                        name={e.name}
                        type={e.type ? e.type : e.Types.map(e => e.name)}
                        id={e.id ? e.id : e.idbd}
                        height={e.height}
                        weight={e.weight}
                        atack={e.atack}
                        defense={e.defense}
                        hp={e.hp}
                        speed={e.speed} />
                </Link>))):<h1>Loading...</h1>}


            <div className={style.pages}>

                {currentPage > 1 && (<button className={style.prevNext} onClick={() => paginado(currentPage - 1)}>prev</button>)}

                <Paginado pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado} />
                
                {totalPages !== currentPage && (<button className={style.prevNext} onClick={() => paginado(currentPage + 1)}>next</button>)}


            </div>

        </div>
    )
}

