import './compoCard.css'
import {FaTrash} from 'react-icons/fa'
import Axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * CompoCard affiche une carte de composition (build) avec les détails du champion, des runes et des actions d'édition ou de suppression.
 * 
 * @param {Object} data - Les données de la composition.
 * @param {boolean} editMode - Indique si le mode d'édition est activé pour cette carte.
 */
function CompoCard({ data, editMode }) {
    const [close, setClose] = useState(true); // État pour gérer l'affichage du mode édition
    const [titleValue, setTitleValue] = useState(data.buildName); // État pour le nom de la composition
    const [runeData, setRuneData] = useState(null); // État pour les données des runes
    const [prim, setPrim] = useState(-5); // État pour la rune primaire sélectionnée
    const [sec, setSec] = useState(-5); // État pour la rune secondaire sélectionnée
    const myData = useSelector((state) => state.counter); // Récupération des données globales depuis Redux


    /**
     * Met à jour la rune primaire sélectionnée.
     * @param {number} id - L'ID de la rune primaire.
     */
    function updatePrimary(id) {
        if (id == prim) {
            setPrim(-5)
        }else{
            setPrim(id)
            if (sec == id) {
                setSec(-5)
            }
        }
    }
    /**
     * Met à jour la rune secondaire sélectionnée.
     * @param {number} id - L'ID de la rune secondaire.
     */
    function updateSecondary(id) {
        if (id == sec) {
            setSec(-5)
        }else{
            setSec(id)
            if (id == prim) {
                setPrim(-5)
            }
        }
    }

    // useEffect pour récupérer les données des runes à partir de l'API
    useEffect( ()=> {
        const fetchData = async ()=> {
            await fetch('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/fr_FR/runesReforged.json')
            .then((response) => response.json())
            .then((jsonData) => {
            const d = Object.values(jsonData); // Extraction des données des runes
            setRuneData(d);
            
            })
            .catch((error) => console.error(error))                

        }
          fetchData();  
    })

    const navigate = useNavigate();
    /**
     * Supprime la composition actuelle.
     */    
    function deleteCompo() {
        console.log("data.buildName :");
        console.log(data.buildName);
        Axios.delete(`http://localhost:3001/Build/${data.buildName}`)
            .then((rep) => navigate('/'))
            .catch((error) => console.error('Error deleting build:', error));
    }
    /**
     * Édite la composition actuelle avec les nouvelles valeurs.
     */
    function editBuild(){
        const send = {
            "buildName": data.buildName, 
            "email": myData.useremail,
            "newPrimaryRune" : runeData[prim],
            "newSecondaryRune" : runeData[sec],
            "newBuildName" : titleValue,
        }
        Axios.put(`http://localhost:3001/Build/${data.buildName}`, send) // qui a le meme nom que le send
        .then((rep) => navigate('/'))
        .catch((error) => console.error('Error deleting build:', error));
        
                
    }
    return (
        <>
            <div className='compoCard'>
                <div className={close ? 'editModel close' : 'editModel'}>
                    <label> Build Name </label>
                    <input value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                    <button onClick={() => setClose(true)}> Cancel </button>
                    <label htmlFor="primary-rune-select">Choose a primary Rune:</label>
                    <select
                        name="primary rune"
                        id="primary-rune-select"
                        value={prim}
                        onChange={(e) => updatePrimary(e.target.value)}
                    >
                        <option value={-5}>--Please choose an option--</option>
                        {runeData ?
                            runeData.map((rune, index) => (
                                <option value={index} key={index}>{rune.name}</option>
                            )) : ""
                        }
                    </select>
                    <label htmlFor="secondary-rune-select">Choose a secondary Rune:</label>
                    <select
                        name="secondary rune"
                        id="secondary-rune-select"
                        value={sec}
                        onChange={(e) => updateSecondary(e.target.value)}
                    >
                        <option value={-5}>--Please choose an option--</option>
                        {runeData ?
                            runeData.map((rune, index) => (
                                <option value={index} key={index}>{rune.name}</option>
                            )) : ""
                        }
                    </select>
                    <button onClick={editBuild}>Update</button>
                </div>
                <h3>{data.buildName}</h3>
                {data.author ? <h3>{data.author}</h3> : ""}
                <div className='compoCardHeader'>
                    <div className='compoCardChamp'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${data.championName}.png`} alt="Champion" />
                    </div>
                    <div className='compoCardRune'>
                        {data.primaryRune ?
                            <div className='compoCardRunePrimary'>
                                <img src={`https://ddragon.canisback.com/img/${data.primaryRune.icon}`} alt="Primary Rune" />
                            </div>
                            : null
                        }
                        {data.secondaryRune ?
                            <div className='compoCardRuneSecondary'>
                                <img src={`https://ddragon.canisback.com/img/${data.secondaryRune.icon}`} alt="Secondary Rune" />
                            </div>
                            : null
                        }
                    </div>
                </div>
                <div className='compoCardFooter'>
                    {editMode ? <FaTrash onClick={deleteCompo} /> : ""}
                    {editMode ? <FaEdit onClick={() => setClose(false)} /> : ""}
                </div>
            </div>
        </>
    );
}

export default CompoCard