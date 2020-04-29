import React, { useEffect, useState } from 'react';
import moment from 'moment';

const JobSearch = ({ result, searchReturn, submitSearch, searchTerms, updateTerms, setSearchTerms, setSearchReturn, landSearch, setLandSearch }) => {

    useEffect(() => {
        if(!landSearch){
            setSearchTerms([]);
            setSearchReturn([]);  
        }
        setLandSearch(false);
    }, []);

    useEffect(() => {
        //doesn't work as intended. Should remove list of results as soon as searchbar is cleared.
        //checking searchTerms === [""] also doesn't work.
        if(searchTerms.length === 0){
            setSearchReturn([]);
        }
    }, [searchTerms]);

    return (
        <div>
            <form onSubmit = { () => submitSearch(false) } className = 'rowNW margin1'>
                <input placeholder='search jobs' value = { searchTerms.join(' ') } onChange = { ({ target }) => updateTerms(target.value) } className = 'bgLB colorDB topLeft15 bottomLeft15 borderDB padHalf widthundred' />  
                <input type = 'submit' value = 'Search' className = 'bgDB colorOW borderDB topRight15 bottomRight15 padHalf' />
            </form>
            { searchReturn.length > 0 && <div className = 'centerText colorDB twentyPoint bottomMarginHalf'>{ searchReturn.length < 999 ? searchReturn.length : '999+' } Results</div> }
            <ul>{ result.length > 0 && 
                searchReturn.map(search => {
                    return(
                        <li key={ search.item.id } className = 'bgLB colorDB pad1 bottomBorderDB'>
                            <a href={`#post/${search.item.id}`} className = 'centerText'>
                                <h4 className = 'leftMarginHalf colorDB'>{search.item.title}</h4>
                            </a>
                            <div>{ search.item.description }</div>
                            <div>Posted: { moment(search.item.datePosted).format('MM/DD/YYYY') }</div> 
                        </li>
                    )
                })
            }</ul>
        </div>
    )
}

export default JobSearch;