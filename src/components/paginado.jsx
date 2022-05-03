import React from "react";
import style from './paginado.module.css';

export function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
    const pageNumbers = []
    // const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage)
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    // pageNumbers.slice(totalPages)
    
    return (
        <nav  >
            <ul className={style.container}>
                {pageNumbers && pageNumbers.map((n) => (
                    <div>
                        <li className={style.li}>
                            <a onClick={ () => paginado(n)}>{n}</a>
                        </li>
                     
                    </div>
                ))}
            </ul>
        </nav>
    )


}