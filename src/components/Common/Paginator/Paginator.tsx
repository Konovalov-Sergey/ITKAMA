import React, {useState} from 'react';
import style from './Paginator.module.css';

type PropsType = {
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    pageSize: number,
    totalItemsCount: number
};

let Paginator: React.FC<PropsType> = ({currentPage, onPageChanged, pageSize, totalItemsCount}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages: Array<number> = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    } 

    let portionSize: number = 10;
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
                                className={ currentPage === p ? style.pageSelected : style.pageNumber}
                                key={p}
                                onClick={(e) => {onPageChanged(p)}}>
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