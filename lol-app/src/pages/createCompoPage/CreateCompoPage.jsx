import './CreateCompoPage.css'
import { useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { handleCompo } from '../../app/features/counterSlice';
import { useNavigate } from 'react-router-dom';
import LoadingRoll from '../../components/LoadingRoll/LoadingRoll';
import Axios from "axios";

/**
 * CreateCompoPage : permet aux utilisateurs de créer une nouvelle composition (build) pour un champion
 * avec des runes primaires et secondaires. Il récupere les donnees des champions et des runes
 * depuis l'API de League of Legends et permet à l'utilisateur de sélectionner et valider
 * sa composition.
 */

function CreateCompoPage() {

    const [data, setData] = useState(null); // État pour les données des champions
    const [runeData, setRuneData] = useState(null); // État pour les données des runes
    const myData = useSelector((state) => state.counter); // Récupération des données globales depuis Redux
    const dispatch = useDispatch();
    const [compoName, setCompoName] = useState(''); // État pour le nom de la composition
    const [compoChamp, setCompoChamp] = useState(''); // État pour le nom du champion sélectionné
    const navigate = useNavigate();  

    const [prim, setPrim] = useState(-5);
    const [sec, setSec] = useState(-5);

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
    // useEffect pour récupérer les données des champions et des runes 
    useEffect(() => {
        const fetchData = async () => {
            // Récupération des données des champions
            await fetch('http://ddragon.leagueoflegends.com/cdn/13.24.1/data/fr_FR/champion.json')
            .then((response) => response.json())
            .then((jsonData) => {
            const championData = Object.values(jsonData.data); // Extract the array of champions
            setData(championData);
            })
            .catch((error) => console.error(error))

            // Récupération des données des runes
            await fetch('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/fr_FR/runesReforged.json')
            .then((response) => response.json())
            .then((jsonData) => {
            const d = Object.values(jsonData); // Extract the array of champions
            setRuneData(d);
            
            })
            .catch((error) => console.error(error))
        }
        fetchData()
        
    },[])// Le tableau vide signifie que l'effet se déclenche une seule fois au montage du composant

    /**
     * Met à jour le nom de la composition à partir de l'entrée utilisateur.
     */
    function updateCompoName() {
        let d = document.querySelector('.compoNameInput').value.toLowerCase()
        setCompoName(d)
    }
    /**
     * Met à jour le nom du champion de la composition à partir de l'entrée utilisateur.
     */
    function updateCompoChamp() {
        let d = document.querySelector('.compoChampInput').value.toLowerCase()
        setCompoChamp(d)
    }
    /**
     * Change le champion sélectionné en mettant à jour l'entrée correspondante.
     * @param {string} name - Le nom du champion.
     */
    function changeChamp(name) {
        document.querySelector('.compoChampInput').value = name
    }
    /**
     * Vérifie si la composition est valide.
     * @returns {boolean} - True si la composition est valide, sinon false.
     */
    function isValid() {
        let result = false
        data.forEach(champ => {
            console.log(`${champ.id.toLowerCase()} ?= ${compoChamp}`);
            if (champ.id.toLowerCase() == compoChamp) {
                if (sec != prim && sec != -5 && prim != -5) {
                    result = true
                }
            }
        });
        return result
    }
    /**
     * Capitalise la première lettre d'une chaîne de caractères.
     * @param {string} str - La chaîne de caractères à capitaliser.
     * @returns {string} - La chaîne de caractères avec la première lettre en majuscule.
     */
    function capitalizeFirstLetter(str) {
        const firstLetter = str.charAt(0);
        const uppercaseFirstLetter = firstLetter.toUpperCase();
        const remainingLetters = str.slice(1);
        return uppercaseFirstLetter + remainingLetters;
    }
    /**
     * Valide la composition et l'envoie au serveur si elle est valide.
     */
    function validate() {
        if (isValid()) {
            let send = {
                "author": myData.useremail,
                "comment": "",
                "primaryRune" : runeData[prim],
                "secondaryRune" : runeData[sec],
                "buildName" : compoName,
                "championName" : capitalizeFirstLetter(compoChamp)
            }
            Axios.post("http://localhost:3001/Build", send)
            .then((rep) => {console.log(rep); navigate("/compositions")} )           
        }else{
            alert('bad champ name')
        }        
    }


    return (
        data ?
        <div className='mainPage'>
            <Navbar data={data} myData={myData}/>
            {
                myData.connected ?
                <div className='compoCreate'>
                <input  type='text' className='compoNameInput' onChange={()=>{
                    updateCompoName()
                }} placeholder='Entrez le nom de la composition'/>
                <input onChange={()=>{updateCompoChamp()}} className='compoChampInput' type='text' placeholder='Choisissez un champion'/>
                
                {
                    data ?
                    <>
                    <div className='allchampionsSelect'>
                        {
                            data.map((champion, index)=>{
                                return <div key={index} className='championSelect'>

                                            <img onClick={()=>{changeChamp(champion.id)}} src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`} />
                                </div>
                            })
                        }
                    </div>
                    </>
                    :
                    <span>Chargment des champions</span>
                }
                <h2>Rune primaire</h2>
                <div className='runeList'>
                    {
                        runeData ?
                        <>
                        {
                            runeData.map((perk, index)=>{
                                
                                    return (
                                        <div key={index} className={prim==index ? 'rune active' : sec==index ? 'rune other' : 'rune'}>
                                            <img onClick={()=>{updatePrimary(index)}}    src={`https://ddragon.canisback.com/img/${perk.icon}`}/>
                                        </div>
                                    )
                                
                                
                            })
                        }
                        </>
                        
                        :
                        <span>Chargement des runes</span>
                    }
                </div>
                <h2>Rune secondaire</h2>
                <div className='runeList'>
                    {
                        runeData ?
                        <>
                        {
                            runeData.map((perk, index)=>{
                                
                                    return (
                                        <div key={index} className={sec==index ? 'rune active' : prim==index ? 'rune other' : 'rune'}>
                                            <img onClick={()=>{updateSecondary(index)}}   src={`https://ddragon.canisback.com/img/${perk.icon}`}/>
                                        </div>
                                    )
                                
                                
                            })
                        }
                        </>
                        
                        :
                        <span>Chargement des runes</span>
                    }
                </div>
                <button className='validateBtn' onClick={()=>{validate()}}>validate</button>
                </div>
                :
                <div className='compoCreate'>
                    <h1 >RESERVED TO LOGGED PLAYERS</h1>
                </div>
            }
            
        </div>
        :
        <LoadingRoll/>
        
    )

}

export default CreateCompoPage