import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import moment from 'moment';

const Landing = ({ displayLogin, auth, route, breakpoint, posts }) => {
  const [ searchTerms, setSearchTerms ] = useState([]);     //only for the searchBar
  const [ searchContent, setSearchContent ] = useState([]); //this is the actual search data
  const [ searchList, setSearchList ] = useState([]);
  const [ searchReturn, setSearchReturn ] = useState([])

  const options = {
    includeScore: true,
    keys: ['title', 'description', 'industry'],
    threshold: 0.6
  };

  const updateTerms = barVal => {
    setSearchTerms(barVal.split(' ').map(word => word));
    setSearchContent(barVal.split(' ').reduce((acc, word) => {
      if(!acc.includes(word)){
        acc.push(word);
      }
      return acc;
    }, []));
  };

  useEffect(()=> {
    if(posts)
      setSearchList(posts)    
  }, [posts])

  const fuse = new Fuse(searchList, options);

  const result = fuse.search(searchTerms.toString());

  const submitSearch = ({ target }) => {
    event.preventDefault();
    //do something with searchContent
    setSearchReturn(result)
  };

  return(
    <div id='LandingRoot' className={ `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW' : 'rowNW' }` }>
      <div className='marginHalf'>
        <h2>Find a Job Near You. Gluten-Free!</h2>
        <p>so many jobs!</p>
        <form onSubmit = { submitSearch } className = 'rowNW widthundred marginRightHalf'>
          <input placeholder='search jobs' value = { searchTerms.join(' ') } onChange = { ({ target }) => updateTerms(target.value) } className = 'bgLB colorDB topLeft15 bottomLeft15 borderDB padHalf widthundred' />  
          <input type = 'submit' value = 'Search' className = 'bgDB colorOW borderDB topRight15 bottomRight15 padHalf' />
        </form>
        <ul>{ result.length > 0 && 
          searchReturn.map(search => {
            return(
              <li key={ search.item.id }>
                { search.item.title } - posted: { moment(search.item.datePosted).format('MM/DD/YYYY') }
              </li>
            )
          })
        }</ul>
      </div>
      <div className='marginHalf'>
        <h2>Find Local Labor without Having Kids!</h2>
        <div>
          <p>create an offer today</p>
          { !auth.id && <input type = 'button' className = 'bgDB colorOW padHalf borderLB border5' onClick = {() => displayLogin()} value =  ' Log In ' /> }
          { auth.id && <input type = 'button' className = 'bgDB colorOW padHalf borderLB border5' onClick = { () => route('#jobs') } value = 'List Job'/> }
        </div>
        
      </div>
    </div>
  )
}

export default Landing;