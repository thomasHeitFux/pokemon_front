import React from "react";
import style from './card.module.css'
import {Link} from "react-router-dom"

export default function Card({ id,img, name, type }) {
    
    
    return (
        <div className={style.container}>
            <Link to={"/pokemons/"+id}> 
            <img src={img?img:"https://i.pinimg.com/originals/70/a6/9b/70a69b357b7ea034151f45e82425367f.png"} alt="" width="150px" height="167px" />
            </Link>
            <h3>{name.toUpperCase()}</h3>
            <ul>
                { type?type.map((e) => (<h4>{e}</h4>)):(<h4>not type</h4>)}
            </ul>
        </div>
    )
}