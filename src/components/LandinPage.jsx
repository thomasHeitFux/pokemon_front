import React from 'react';
import {Link} from 'react-router-dom';
import style from "./LandingPage.module.css"
import ash from '../assets/ash.png';

export default function landinPage (){
    return(
        <div className={style.container}>
            <div>
            <Link to = "/home"><button className={style.button}>Home</button></Link>
            </div>
            <div className={style.image}><img src='https://i.gifer.com/origin/0d/0dea0c59cbf084d981fc5b55643cb6e6.gif' alt="" /></div>
            <div className={style.ash}>
                <img src={ash} />
            </div>
        </div>
    )
}