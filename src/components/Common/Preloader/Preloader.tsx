import React from 'react';
import loader from '../../../assets/loader.gif';

type PropsType = {}

const Preloader: React.FC = () => {
    return (
        <div> <img src={loader} alt={'img'}/>  </div>
    )    
}

export default Preloader;