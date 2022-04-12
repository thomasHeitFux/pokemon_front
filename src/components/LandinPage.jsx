import React from 'react';
import {Link} from 'react-router-dom';
import style from "./LandingPage.module.css"

export default function landinPage (){
    return(
        <div className={style.container}>
            <div>
            {/* <h1 className={style.welcome}> welcome</h1> */}
            <Link to = "/home"><button className={style.button}>Home</button></Link>
            </div>
           
            
        </div>
    )
}