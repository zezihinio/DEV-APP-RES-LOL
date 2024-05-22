import './championCard.css'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { handleFavChamp } from '../../app/features/counterSlice';
import { useNavigate } from 'react-router-dom';

/**
 * ChampionCard affiche une carte pour chaque champion avec son image, son nom, et son titre.
 * Il permet également d'ajouter ou de retirer un champion des favoris.
 * 
 * @param {Object} championData - Les données du champion.
 * @param {boolean} fav - Indique si le champion est dans les favoris.
 */
function ChampionCard({ championData, fav }) {
    const navigate = useNavigate(); // navigation pour rediriger vers la page de détail du champion
    const myData = useSelector((state) => state.counter); // Récupération des données globales depuis Redux
    const dispatch = useDispatch(); // dispatcher des actions vers Redux
    /**
     * Gère l'ajout ou le retrait du champion des favoris.
     */
    function handleFav() {
        dispatch(handleFavChamp(championData.id))
        console.log(myData.favChamp);
    }
    /**
     * Vérifie si le champion est dans les favoris.
     * @returns {boolean} - True si le champion est dans les favoris, sinon false.
     */
    function isInFav() {
        let result = false
        myData.favChamp.forEach(champ => {
            if (champ == championData.id) {
                result = true
            }
        });
        return result
    }
    /**
     * Redirige vers la page de détail du champion.
     * @param {string} name - Le nom du champion.
     */
    function goToChampionDetail(name) {
        navigate(`/champion/${name}`)
    }
    return (
        <div className='championCard'>
            {
                isInFav() ?
                <FaStar onClick={()=>{handleFav()}} className='starFav'/>:
                <FaRegStar onClick={()=>{handleFav()}} className='star'/>
            }
            <div className='championCardTitle' onClick={()=>{goToChampionDetail(championData.id)}}>
                <span className='name'>{championData.name}</span>
                <span>{championData.title}</span>
            </div>
            <img className='championCardImg' src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData.id}_0.jpg`}/>
        </div>
    )
}

export default ChampionCard