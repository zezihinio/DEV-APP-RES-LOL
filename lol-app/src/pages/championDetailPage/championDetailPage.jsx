import { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegStar, FaStar, FaExpandAlt , FaCompress, FaTimes  } from 'react-icons/fa';
import { handleFavChamp } from "../../app/features/counterSlice";
import { useParams } from "react-router-dom";
import './championDetailPage.css'
import LoadingRoll from "../../components/LoadingRoll/LoadingRoll";

/**
 * ChampionDetailPage affiche les détails d'un champion spécifique, y compris ses skins et son lore (histoire).
 * Il permet également d'ajouter ou de retirer un champion des favoris de l'utilisateur.
 */
function ChampionDetailPage() {
    
    const [data, setData] = useState(null);
    const [selectedSkin, setSelectedSkin] = useState()
    const [skinInspector, setSkinInspector] = useState(false)
    const [done, setDone] = useState(false);
    const myData = useSelector((state)=>state.counter)
    const dispatch = useDispatch()
    const {championName} = useParams()
    /**
     * Affiche le mode inspecteur pour le skin sélectionné.
     * @param {Object} skin - Le skin sélectionné.
     */
    function showInspector(skin) {
        setSelectedSkin(skin)
        setSkinInspector(true)
    }
    /**
     * Gère l'ajout ou le retrait du champion des favoris de l'utilisateur.
     */
    function handleFav() {
        dispatch(handleFavChamp(data[0].id))
        console.log(myData.favChamp);
    }
    /**
     * Vérifie si le champion est dans les favoris de l'utilisateur.
     * @returns {boolean} - True si le champion est dans les favoris, sinon false.
     */
    function isInFav() {
        let result = false
        myData.favChamp.forEach(champ => {
            if (champ == data[0].id) {
                result = true
            }
        });
        return result
    }
    // useEffect pour récupérer les données du champion à partir de l'API
    useEffect(() => {
        const fetchData = async () => {
        try {
            
            await fetch(`http://ddragon.leagueoflegends.com/cdn/13.24.1/data/fr_FR/champion/${championName}.json`)
            .then((response) => response.json())
            .then((jsonData) => {
                const championData = Object.values(jsonData.data); // Extract the array of champions
                setData(championData);
            })

        } catch (error) {
            console.error(error);
        }
        };
        
        fetchData();

    }, [championName]);
    console.log(data);
    return (
        <>
            <section className= {skinInspector ? "skinField" : "skinField hide"} >
                <div className="leaveBtn" onClick={()=>{setSelectedSkin(null); setSkinInspector(false)}}>
                    <FaTimes />
                </div>
                {
                    selectedSkin ?
                    <>
                    <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data[0].id}_${selectedSkin.num}.jpg`}/>
                    <h1>{selectedSkin.name}</h1>
                    </>
                    :
                    ''
                }
            </section>
            <div className="mainPage">
            <Navbar myData={myData}/>
            {
                data ?
                <>
                <div className="headerMargin"></div>
                <section className="headerChampion">
                    <div className="championName">
                        <h1 >{data[0].name}</h1>
                        <h2>{data[0].title}</h2>
                        
                    </div>
                    {
                            isInFav() ?
                            <FaStar onClick={()=>{handleFav()}} className='sF'/>:
                            <FaRegStar onClick={()=>{handleFav()}} className='s'/>
                    }
                    <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data[0].id}_0.jpg`}/>
                </section>
                <section className="loreSection">
                    <h1>Lore</h1>
                    <h3>{data[0].lore}</h3>
                </section>
                <section>
                    <h1 className="bg-danger">SKIN</h1>
                    <div className="allSkin">
                        {
                            data[0].skins.map((skin, index)=>{
                                return (
                                    <div className="skin" onClick={()=>{showInspector(skin)}}>
                                        <FaExpandAlt  className="zoom"/>
                                        <span>{skin.name}</span>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data[0].id}_${skin.num}.jpg`}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                
                </>
                
                :
                <LoadingRoll/>
            }
            
            
        </div>
        </>
    )
}

export default ChampionDetailPage