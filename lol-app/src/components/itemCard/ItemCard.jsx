import './ItemCard.css'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

function ItemCard({item}) {
    const myData = useSelector((state)=>state.counter)
    const dispatch = useDispatch()

    return (
        <div className='itemCard'>
            <img src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${item.image.full}`}/>
            <span>{item.name}</span>
        </div>
    )

}

export default ItemCard