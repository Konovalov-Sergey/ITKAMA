import React from 'react';
import loader from './../../assets/loader.gif';

const Preloader = (props) => {
    return (
        <div>
            <img src={loader} alt={'img'}/>
        </div>
    )
    
}

export default Preloader;