import  axios  from 'axios'

export const GET_POKEMONS = 'GET_POKEMONS';
export const FILTERED_TYPE = 'FILTERED_TYPE';
export const GET_POKENAMES= 'GET_POKENAMES';
export const GET_TYPES= 'GET_TYPES';
export const FILTERED_CREATED= "FILTERED_CREATED";
export const SORT_NAME= 'SORT_NAME';
export const GET_DETAIL='GET_DETAIL'
export const ORDER_POWER='ORDER_POWER'
export const EMPTY_DETAIL='EMPTY_DETAIL'
export const ATACK_POWER='ATACK_POWER'
const url = 'https://pokemonhenry.fly.dev'
//------------------------------------------VACIA EL ESTADO DEL DETALLE
export  function emptyDetail(payload){
        return ({
            type: EMPTY_DETAIL,
            payload
        })
    
};

//----------------------------------------TRAE DETALLE DE POKEMON POR ID
export  function getDetail(id){
    return async function (dispatch) {
        var json = await axios(`${url}/pokemons/${id}`);
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        })
    }
};

//-------------------------------------TRAE TODOS LOS POKEMONS DEL BACK
export  function getPokemons(){
    return function (dispatch) {
        // 'https://pokemonspi.herokuapp.com/pokemons'
         axios(`${url}/pokemons`)
         .then((json)=> dispatch({
            type: GET_POKEMONS,
            payload: json.data
        }))
    }
};
// export  function getPokemons(){
//     return async function (dispatch) {
//         var json = await axios('http://localhost:3001/pokemons');
//         return dispatch({
//             type: GET_POKEMONS,
//             payload: json.data
//         })
//     }
// };
// ----------------------------------------TRAE TODOS LOS TIPOS DEL BACK
export  function getTypes(){
    return async function (dispatch) {
        var json = await axios(`${url}/types`);
        return dispatch({
            type: GET_TYPES,
            payload: json.data
        })
    }
};

//----------------------------------------------DELETEA AL POKEMON POR ID
export function deletePokemon(id) {
    return async function(){
        console.log(id)
        const json = await axios.delete(`${url}/delete/${id}`)
        return json;
    }
}

// HACE EL POST DEL POKEMON     
export function postPokemon(payload) {
    return async function(){
        const json = await axios.post(`${url}/pokemons`,payload)
        return json;
    }
}

//FILTRO POR TIPO
export function filteredTypes(payload){
    return{
        type: FILTERED_TYPE,
        payload
    }
};

//-----------------------------------------------------FILTRO POR NOMBRE
export  function getPokeNames(name){
    // return async function (dispatch) {
        // const json = await axios(`https://pokemonspi.herokuapp.com/pokemons?name=${name}`);
        return ({
            type: GET_POKENAMES,
            // payload: json.data
            payload:name
        })
    // }
};
//--------------------------------------------------------FILTRA POR CREADO O EXISTENTE
    export function filteredCreated(payload){
        return{
            type: FILTERED_CREATED,
            payload
        }
    };
//------------------------------------------------------------ORDENA DE A-Z O AL REVES
    export function sortByName(payload){
        return{
            type: SORT_NAME,
            payload
        }
    }
    //----------------------------------------------------ORDENA POR PODER 
    export function orderPower(payload){
        return{
            type: ORDER_POWER,
            payload
        }
    }

    export function powerAtack(payload){
        return{
            type: ATACK_POWER,
            payload
        }
    }
