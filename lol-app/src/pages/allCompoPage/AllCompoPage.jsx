import './AllCompoPage.css'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CompoCard from '../../components/compoCard/compoCard';
import Navbar from '../../components/navbar/navbar';
import {HiPlus} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import {FaTrash} from 'react-icons/fa'


/**
 * AllCompoPage composant affiche toutes les compositions (builds) disponibles et permet à l'utilisateur 
 * de créer une nouvelle composition.
 * Les compositions peuvent être éditées ou supprimées par leurs auteurs respectifs.
 */
function AllCompoPage() {
    const [data, setData] = useState([]); // État pour les données des champions
    const myData = useSelector((state) => state.counter); // Récupération des données globales depuis Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [builds, setBuilds] = useState(null); // État pour les données des compositions

    /**
     * Redirige l'utilisateur vers la page de création d'une nouvelle composition.
     */
    function createComposition() {
        navigate('/createComposition')
    }

    // useEffect pour récupérer les données des champions et des compositions à partir de l'API 
    useEffect(() => {
        // Récupération des données des champions
        fetch('http://localhost:3001/Champions')
        .then((response) => response.json())
        .then((jsonData) => {
        setData(jsonData);
        })
        .catch((error) => console.error(error))

        // Récupération des données des compositions
        fetch('http://localhost:3001/Builds')//getBuilds
        .then((response) => response.json())
        .then((jsonData) => {
            setBuilds(jsonData);
            })
            .catch((error) => console.error(error))
    },[])// Le tableau vide signifie que l'effet se déclenche une seule fois au montage du composant

    return (
        <div className="mainPage">
            <Navbar data={data} myData={myData}/>
            
            <div className='allCompo'>
                <div className='newComp' onClick={()=>{createComposition()}}>
                    <h1><HiPlus/></h1>
                    <span>Nouvelle composition</span>
                </div>
                {
                    builds ?
                    builds.map((compo, index)=>{
                        return <CompoCard data={compo} editMode={compo.author == myData.useremail} key={index}/>
                    })
                    :
                    ""
                }
            </div>
            
        </div>
    )

}

export default AllCompoPage