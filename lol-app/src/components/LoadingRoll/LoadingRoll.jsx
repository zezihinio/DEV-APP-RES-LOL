import './LoadingRoll.css'

function LoadingRoll() {
    return(
        <div className='loadingRoll-parent'>
            <div className='loadingRoll-msg'>chargement</div>
            <div className='loadingRoll'>
                <div className='loadingRoll-topLeft'></div>
                <div className='loadingRoll-topRight'></div>
                <div className='loadingRoll-bottomRight'></div>
                <div className='loadingRoll-bottomLeft'></div>
            </div>
            
        </div>
    
    )
}

export default LoadingRoll