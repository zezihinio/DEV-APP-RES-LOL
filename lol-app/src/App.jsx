import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChampionCard from './components/championCard/championCard'
import axios from 'axios'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { incremment } from './app/features/counterSlice'
import Navbar from './components/navbar/navbar'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";


function App() {
  // Récupération des données du store Redux
  const myData = useSelector((state)=>state.counter)
	const dispatch = useDispatch()

  // États locaux pour gérer les données, le filtre et l'état de la recherche active
  const [data, setData] = useState([]);
  const [filter, setfilter] = useState("");
  const [activeSearch, setActiveSearch] = useState(false)
  const navigate = useNavigate()

  // Fonction pour vérifier si un champion est dans les favori
  function isInFav(id) {
    myData.favChamp.forEach(champ => {
      if (champ == id) {
        return true
      }
    });
    return false
  }
  // Effet pour récupérer les données des champions lors du montage du composant
  useEffect(() =>{
    fetch('http://localhost:3001/Champions')
    .then((response) => response.json())
    .then((jsonData) => {
      setData(jsonData);
    })
    .catch((error) => console.error(error))
  },[])

  console.log(data);
  return (
    <div className='mainPage'>
        <h1>{filter}</h1>
        <input type='text' onChange={(e)=>{setfilter(e.target.value.toLowerCase())}} className={activeSearch ? 'inputSearch active' : 'inputSearch'}/>
        <div className="searchBtn" onClick={()=>{setActiveSearch(!activeSearch)}}>
          <FaSearch />
        </div>
        <Navbar data={data} myData={myData}/>
        <div className='allChampion'>
            {
              data.map((champion, index) => {
                if(champion.id.toLowerCase().includes(filter))
                return <ChampionCard key={index} championData={champion} fav={isInFav(champion.id)}/>
              })
            }
        </div>
    </div>    
  );
}

export default App;