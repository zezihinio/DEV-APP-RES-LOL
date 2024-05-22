import './navbar.css'
import {CgClose} from 'react-icons/cg'
import {FaTrash} from 'react-icons/fa'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleFavChamp } from '../../app/features/counterSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { disconnect } from '../../app/features/counterSlice';
/**
 * Navbar affiche une barre de navigation qui permet de naviguer entre différentes pages de l'application.
 * Il permet également de gérer les favoris des champions et la connexion/déconnexion de l'utilisateur.
 * 
 * @param {Object} myData - Les données de l'utilisateur provenant de Redux.
 */
function Navbar({ myData }) {
    const [active, setActive] = useState(false); // État pour gérer l'affichage du modal des favoris
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Navigue vers la page des champions.
     */
    function allChampion() {
        navigate('/')
    }
    /**
     * Navigue vers la page des items.
     */
    function allItems() {
        navigate('/items')
    }
    /**
     * Navigue vers la page des builds.
     */
    function compo() {
        navigate('/compositions')
    }
    /**
     * Navigue vers la page d'authentification.
     */
    function auth() {
        navigate('/auth')
    }

    function handleFav(championId) {
        dispatch(handleFavChamp(championId))
    }
    return (
        <>
        <div className={`favModal ${active ? 'active' : ''}`}>
            <div className='favModalHead'>
                <CgClose onClick={()=>{setActive(false)}} className='closeFavModal'/>
            </div>
            <div className='favChampionList'>
                {
                    myData.favChamp.map((championId, index)=>{
                        return <div key={index} className='favChampion'>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${championId}.png`} />
                            {championId}
                            <FaTrash className='removeFav' onClick={()=>{handleFav(championId)}}/>
                        </div>
                    })
                }
            </div>
        </div>
        <div className='navbar'>
            <img onClick={()=>{allChampion()}} className='title' src='https://logosmarcas.net/wp-content/uploads/2020/11/League-of-Legends-Logo.png'/>
            <a onClick={()=>{allChampion()}}>Champions</a>
            <a onClick={()=>{setActive(true)}}>Champions favoris</a>
            <a onClick={()=>{allItems()}} >Objets</a>
            <a onClick={()=>{compo()}}>Compositions</a>
            {
                myData.connected ?
                <a onClick={()=>dispatch(disconnect())}>Log out</a>
                :
                <a onClick={()=>{auth()}}>Log in</a>
            }
            
        </div>
        </>
    )
}

export default Navbar