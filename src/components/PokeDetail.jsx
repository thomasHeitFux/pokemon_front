import React from "react";
import { emptyDetail, getDetail, deletePokemon } from "../actions";
import { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import style from './detail.module.css'
import ash from '../assets/ash.png'

export default function Detail() {
    const dispatch = useDispatch();
    const pokeId = useParams();
    const history = useHistory()

    function handlerBack() {
        dispatch(emptyDetail())
    }

    useEffect(() => {
        dispatch(getDetail(pokeId.id))
    }, [])



    function handleDelete(e) {
        e.preventDefault()
        if (window.confirm("are you sure?")) {
            dispatch(emptyDetail())
            dispatch(deletePokemon(pokeId.id));
            history.push('/home')
        }
    }
    const myPokemon = useSelector(state => state.detail)
    return (<div className={style.background}>

        <Link to='/home' ><button className={style.button} onClick={handlerBack}>Go back</button></Link>
        {
            myPokemon.length > 0 ?
                <div className={style.container}>


                    <div>
                        <div className={style.name}>

                            <h1>{myPokemon[0].name.toUpperCase()}</h1>
                            {myPokemon[0].createInDb ? <button className={style.delete} onClick={handleDelete}>Delete</button> : <div></div>}
                        </div>

                        <img className={style.img} src={myPokemon[0].img ? myPokemon[0].img : "https://i.pinimg.com/originals/70/a6/9b/70a69b357b7ea034151f45e82425367f.png"} />

                        <div className={style.skill}>
                            <h3>Health:</h3><h3>{myPokemon[0].hp}</h3>
                            <div className={style.bar}><div className={style.colorbar} style={{width:`${myPokemon[0].hp}%`}}></div></div>
                        </div>
                        <div className={style.skill}>
                            <h3>Atack:</h3><h3>{myPokemon[0].atack}</h3>
                            <div className={style.bar}><div className={style.colorbar} style={{width:`${myPokemon[0].atack}%`}}></div></div>
                        </div>
                        <div className={style.skill}>
                            <h3>Defense:</h3><h3>{myPokemon[0].defense}</h3>
                            <div className={style.bar}><div className={style.colorbar} style={{width:`${myPokemon[0].defense}%`}}></div></div>
                        </div>
                        <div className={style.skill}>
                            <h3>Speed:</h3><h3>{myPokemon[0].speed}</h3>
                            <div className={style.bar}><div className={style.colorbar} style={{width:`${myPokemon[0].speed}%`}}></div></div>
                        </div>
                        <div className={style.skill}>
                            <h3>Height:</h3><h3>{myPokemon[0].height}</h3>
                            <div className={style.bar}><div className={style.colorbar} style={{width:`${myPokemon[0].height}%`}}></div></div>
                        </div>
                        <div className={style.skill}>
                            <h3>Weight:</h3><h3>{myPokemon[0].width}</h3>
                            <div className={style.bar}><div className={style.colorbar}  style={{width:`${myPokemon[0].width/10}%`}}></div></div>
                        </div>
                        <ul><h3>Types:</h3>
                            {myPokemon[0].type ? myPokemon[0].type.map((e) => (<h4>{e}</h4>)) : myPokemon[0].Types.map(e => (<h4>{e.name}</h4>))}
                        </ul>




                    </div>
                </div> :
                <div><img src='https://i.gifer.com/origin/0d/0dea0c59cbf084d981fc5b55643cb6e6.gif' alt="" /></div>
        }
        <div className={style.ash}>
            <img src={ash} />
        </div>
    </div>
    )
}