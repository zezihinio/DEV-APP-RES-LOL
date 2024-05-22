import Navbar from "../../components/navbar/navbar";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ItemCard from "../../components/itemCard/ItemCard";
import './ItemPage.css'
/**
 * Composant ItemPage : responsable de l'affichage de la page des objets (items) dans l'application.
 * Il récupère les données des champions et des objets à partir de l'API de League of Legends
 * et affiche les objets achetables sous forme de cartes d'items.
 */

function ItemPage() {
    // Déclaration des états locaux pour stocker les données des champions et des objets
    const [data, setData] = useState([]);
    const [itemsData, setItemData] = useState([]);
    const [items, setItems] = useState([]);
    // Utilisation de Redux pour accéder aux données de l'état global
    const myData = useSelector((state)=>state.counter)
	const dispatch = useDispatch()

    // useEffect pour récupérer les données des champions et des objets à partir des API
    useEffect(() =>{
        // Récupération des données des champions
        fetch('http://ddragon.leagueoflegends.com/cdn/13.24.1/data/fr_FR/champion.json')
        .then((response) => response.json())
        .then((jsonData) => {
        const championData = Object.values(jsonData.data); // Extract the array of champions
        setData(championData);
        })
        .catch((error) => console.error(error))

        // Récupération des données des objets
        fetch('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/fr_FR/item.json')
        .then((response) => response.json())
        .then((jsonData) => {
        const items = Object.values(jsonData.data); // Extract the array of champions
        setItemData(items);
        })
        .catch((error) => console.error(error))
        // Transformation des données des objets pour les stocker dans un tableau avec leurs identifiants
        for (const key in itemsData) {
            setItems(items.push({"id" : key, "content" : itemsData[key]}))
        }
        console.log(itemsData);
        console.log(itemsData);
    },[]) // Le tableau vide signifie que l'effet se déclenche une seule fois au montage du composant



    return (
        <div className="mainPage">
            {/* Barre de navigation avec les données des champions et les données de l'état global */}  
            <Navbar data={data} myData={myData}/>
            <div className="allItems">
            {/* Affichage des cartes des items achetables */}
                {itemsData.map((item, index) => {
                        if (item.gold.purchasable) {
                            return <ItemCard key={index} item={item}/>
                        }
                        return null;
                    })
                }
            </div>
        </div>
    )
}

export default ItemPage