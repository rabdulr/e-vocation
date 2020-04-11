import React, { useState, useEffect } from 'react';
import {Posts} from '../db/models/constructors';
import moment from 'moment';

const PostSearch = ({posts, route, auth, createJobPost}) => {

  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [siteCity, setSiteCity] = useState('');
  const [siteState, setSiteState] = useState('');
  const [siteZip, setSiteZip] = useState('');
  const [startDate, setStartDate] = useState(moment(new Date()).format('MM/DD/YYYY'));
  const [endDate, setEndDate] = useState(moment(new Date()).add(1, 'week').format('MM/DD/YYYY'));
  const [proposedBudget, setProposedBudget] = useState('');

  useEffect(() => {
    if(auth){
      setUserId(auth.id)
    }
  }, [auth])

  const onSubmit = (ev) => {
    ev.preventDefault();
    const address = `${siteAddress}, ${siteCity}, ${siteState}, ${siteZip}`
    const post = new Posts(userId, title, description, industry, address, startDate, endDate, proposedBudget);
    createJobPost(post)
    setTitle('');
    setDescription('');
    setIndustry('');
    setSiteAddress('');
    setSiteCity('');
    setSiteState('');
    setSiteZip('');
    setProposedBudget('');
    setStartDate(moment(new Date()).format('MM/DD/YYYY'));
    setEndDate(moment(new Date()).add(1, 'week').format('MM/DD/YYYY'));
  }
  
  return(
    <div id="PostSearchRoot" className = 'marginHalf columnNW alignCenter maxWidth4'>
      <form onSubmit={onSubmit}>
        <label>Title: <input type='text' placeholder='Job Title' value={ title } onChange={ev => setTitle(ev.target.value)}/></label>
        <br />
        <label>Description: <input type='text' placeholder='Job description' value={ description } onChange={ev => setDescription(ev.target.value)}/></label>
        <br />
        <label>Industry: <input type='text' placeholder='industry' value={ industry } onChange={ev => setIndustry(ev.target.value)}/></label>
        <br />
        <label>Site Address: <input type='text' placeholder='Site address' value={ siteAddress } onChange={ev => setSiteAddress(ev.target.value)}/></label>
        <br />
        <label>City: <input type='text' placeholder='City' value={ siteCity } onChange={ev => setSiteCity(ev.target.value)}/></label>
        <br />
        <label>State: <input type='text' placeholder='State' value={ siteState } onChange={ev => setSiteState(ev.target.value)}/></label>
        <br />
        <label>Zip: <input type='text' placeholder='Zip' value={ siteZip } onChange={ev => setSiteZip(ev.target.value)}/></label>
        <br />
        <label>Start Date: <input type='text' placeholder='start date' value={ startDate } onChange={ev => setStartDate(ev.target.value)}/></label>
        <br />
        <label>End Date: <input type='text' placeholder='end date' value={ endDate } onChange={ev => setEndDate(ev.target.value)}/></label>
        <br />
        <label>Proposed Budget: <input type='text' placeholder='proposed budget' value={ proposedBudget } onChange={ev => setProposedBudget(ev.target.value)}/></label>
        <br />
        <button>Create New Job</button>
      </form>
      <h2 className = 'colorDB '>Posts</h2>
      <ul className = 'widthundred scrollable maxHeight4'>{ 
        posts.map(post => {
          return (
          <li key = { `post${ post.id }` } className = 'colorDB'>
            <h4 className = 'leftMarginHalf'>{ post.title }</h4>
            <div className = 'borderBB bgLB padHalf border10 marginHalf'>
              <div>{ post.description }</div>
              <div className = 'topMarginHalf'>Asking Price: $<span className = 'colorAO font700'>{ post.proposedBudget }</span></div>
            </div>
          </li>
          )
        })
      }</ul>
    </div>
  )
}

export default PostSearch