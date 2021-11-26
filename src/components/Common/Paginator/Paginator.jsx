import React, {useState} from 'react';
import style from './Paginator.module.css';


let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)

    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    } 

    let portionSize = 10;
    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1 ) * portionSize + 1; 
    let rightPortionPageNumber = (portionNumber * portionSize);

    return (
            <div className={style.pageNumber}>
                {portionNumber > 1 && 
                <button onClick={()=>{setPortionNumber(portionNumber-1)}}>PREV</button>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return (
                            <span 
                                className = {props.currentPage === p ? style.pageSelected : null}
                                key={p}
                                onClick={(e) => {props.onPageChanged(p)}}>
                                {p}
                            </span>
                        )
                })}
                {portionCount > portionNumber && 
                <button onClick={()=>{setPortionNumber(portionNumber + 1)}}>NEXT</button>}
            </div>
    );
}

export default Paginator;