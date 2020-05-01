import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import moment from 'moment';

const Landing = ({ displayLogin, auth, mode, route, breakpoint, posts, searchReturn, setSearchReturn, result, searchList, setSearchList, searchTerms, setSearchTerms, searchContent, setSearchContent, submitSearch, updateTerms, setLandSearch }) => {

  return(
    <div id='LandingRoot' className={ `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW alignCenter' : 'rowNW' }` }>
      <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'scrollable maxHeight3' : '' } marginHalf bgBB topLeft5 topRight5 bottomRight15 bottomLeft15 maxWidth4` }>
        <h2 className = 'centerText colorAO padHalf'>About EVocation</h2>
        <div className = 'pad1 bgDB colorOW border15 maxWidth4'>
          <p className = 'indent1'><em>EVocation</em> was build with the goal of helping communities rebuild as we adapt to a new way of life and doing business during the Covid-19 Global Health Crisis.</p>
          <p className = 'indent1'>We want to help connect struggling businesses, local contractors, people who need odd jobs done, and everyone in between to find the labor and the work they need to get by in these trying times.</p>
          <p className = 'indent1'>As a user of our website, you can post jobs and allow companies, contractors, and qualified individuals bid for a fair price to do the work you need done. Once you choose an appropriate and affordable bid,
           you can contact the company and arrange a formal contract with them. We'll help you keep track of when the work is scheduled to be done.</p>
           <p className = 'indent1'>As a company, you can search for local jobs that fit your skill set and expertise, and offer a price you think is fair for the labor required. You'll have easy access to your clients and your scheduled work in your profile page.</p>
        </div>
      </div>
      <div className='marginHalf'>
        <h2>Find Local Labor with Our Intuitive Job Search System</h2>
        <div>
          { mode === 'COMPANY' && <div>
            <form onSubmit = { () => submitSearch(true) } className = 'rowNW widthundred marginRightHalf topMargin1'>
              <input placeholder='search jobs' value = { searchTerms.join(' ') } onChange = { ({ target }) => updateTerms(target.value) } className = 'bgLB colorDB topLeft15 bottomLeft15 borderDB padHalf widthundred' />  
              <input type = 'submit' value = 'Search' className = 'bgDB colorOW borderDB topRight15 bottomRight15 padHalf' />
            </form>
          </div> }
          <div>
            { !auth.id && <h4>Sign in Now to Find and Post Jobs!</h4> }
            { auth.id && mode === 'COMPANY' && <h4>Find Work for Your Company!</h4> }
            { auth.id && mode === 'USER' && <h4>List A Job for Local Companies to Find!</h4> }
          </div>
          { !auth.id && <div className = 'rowNW'>
            <div><input type = 'button' className = 'bgDB colorOW padHalf borderLB border5' onClick = {() => displayLogin()} value =  ' Log In ' /></div>
            <form method="GET" action={`/api/google`}><input type = 'submit' value = 'Google Log In' className = 'bgOW borderDB colorDB padHalf border5'/></form>
          </div> }
          { auth.id && mode === 'USER' && <input type = 'button' className = 'bgDB colorOW padHalf borderLB border5' onClick = { () => route('#posts') } value = 'List Job'/> }
          { auth.id && mode === 'COMPANY' && <input type = 'button' className = 'bgDB colorOW topMarginHalf padHalf borderLB border5' onClick = {() => route('#jobs/search')} value = 'Search Jobs' /> }
        </div>
        
      </div>
    </div>
  )
}

export default Landing;