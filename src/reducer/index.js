
import {
    GET_POKEMONS,
    GET_POKENAMES,
    FILTERED_TYPE,
    GET_TYPES, SORT_NAME,
    FILTERED_CREATED,
    GET_DETAIL,
    ORDER_POWER,
    EMPTY_DETAIL,
    ATACK_POWER
} from "../actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        //TODOS
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case ATACK_POWER:
           const filteredAtack = state.pokemons.filter(e=>e.atack>99) 
        return{
            ...state,
            pokemons:filteredAtack
            }
        //ORDEN PODER
        case ORDER_POWER:
            const ordered= action.payload ==='weak' ? state.allPokemons.sort(function (a, b) {
                if (a.atack > b.atack) return 1;
                if (a.atack < b.atack) return -1;
                else return 0;
            })
                : state.allPokemons.sort(function (a, b) {
                    if (a.atack > b.atack) return -1;
                    if (a.atack < b.atack) return 1;
                    else return 0;
                });
            return{
                ...state,
                pokemons: ordered
            }
            //VACIAR DETALLE
            case EMPTY_DETAIL:
                return{
                    ...state,
                    detail:[]
                }
        //DETALLE
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        //TIPOS 
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        //FILTRO NOMBRE
        case GET_POKENAMES:
            const pokeName = state.allPokemons.filter(e=>e.name===action.payload)
            return {
                ...state,
                pokemons: pokeName
            }
        //FILTRO TIPO
        case FILTERED_TYPE:
            let allpokes = state.pokemons;
            const filtered = action.payload === "all" ? allpokes : allpokes.filter(e =>e.type?e.type.find(e=>e == action.payload ):e.Types.find(e=>e.name==action.payload))
           if (filtered.length<1) {
            alert('No pokemons')
               return{
                ...state,
                pokemons: allpokes
               }
           }else{
            return {
                ...state,
                pokemons: filtered
            }
           }
          
        //FILTRO CREADO/EXISTENTE
        case FILTERED_CREATED:
            let allis = state.pokemons;
            const createdFiltered = action.payload === 'creados' ? allis.filter(e => e.createInDb) : allis.filter(e => !e.createInDb)
           if (action.payload==='creados' && createdFiltered.length<1) {
            alert('No pokemons')
            return {
                ...state,
                pokemons: allis 
            }
             
           }else if(action.payload === 'existente'){
                return {
                    ...state,
                    pokemons: createdFiltered
                }
           }
           else{
            return {
                ...state,
                pokemons: action.payload === "All" ? allis : createdFiltered
            }
           }
            
        //ORDENO A-Z
        case SORT_NAME:
            const sortByName = action.payload === 'A-Z' ? state.pokemons.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                else return 0;
            })
                : state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    else return 0;
                });
            return {
                ...state,
                pokemons: sortByName
            }

        default: return state
    }
}


export default rootReducer