import React, { useEffect, useState } from 'react';

const Landing = ({ displayLogin, auth, route, breakpoint }) => {
  const [ searchTerms, setSearchTerms ] = useState([]);     //only for the searchBar
  const [ searchContent, setSearchContent ] = useState([]); //this is the actual search data

  const updateTerms = barVal => {
    setSearchTerms(barVal.split(' ').map(word => word));
    setSearchContent(barVal.split(' ').reduce((acc, word) => {
      if(!acc.includes(word)){
        acc.push(word);
      }
      return acc;
    }, []));
  };

  const submitSearch = ({ target }) => {
    event.preventDefault();
    //do something with searchContent
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