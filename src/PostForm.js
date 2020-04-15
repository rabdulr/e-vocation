import React, { useState, useEffect } from 'react';
import moment from 'moment';

const PostForm = ({ auth, createJobPost, userId, setUserId, togglePost }) => {
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

    const onSubmit = (ev) => {
        ev.preventDefault();
        const address = `${siteAddress}, ${siteCity}, ${siteState}, ${siteZip}`

        //This seems to cause a bug with headers, but it also works. on front end and commits to db as intended
        const post = { userId, title, description, industry, address, startDate, endDate, proposedBudget };
        createJobPost(post);

        togglePost();
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
    };
    
    return(
        <div className = 'z1 columnNW alignCenter widthundred heighthundred frosted bgAlphaDB topPad1'>
            <div className = 'rowNW justifyEnd widthundred'>
                <input type = 'button' onClick = { () => togglePost() } className = 'border50 colorAO bgTransparent topMargin2 rightMarginHalf borderAO padQuarter sixteenPoint' value = ' X '/>
            </div>
            <div className = 'columnNW bgDB bottomLeft5 bottomRight5 topLeft10 topRight10 marginHalf maxWidth5'>
                <h2 className = 'widthundred centerText colorOW padQuarter'>New Post</h2>
                <form onSubmit={onSubmit} className = 'columnNW bgLB border5 pad1'>
                    <div className = 'rowNW spaceBetweenRow'>
                        <div className = 'colorDB'>Title: </div>
                        <input type='text' placeholder='Job Title' value={ title } onChange={ev => setTitle(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <div className = 'rowNW spaceBetweenRow topMarginHalf'>
                        <div className = 'colorDB'>Description: </div>
                        <input type='text' placeholder='Job description' value={ description } onChange={ev => setDescription(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <div className = 'rowNW spaceBetweenRow topMarginHalf'>
                        <div className = 'colorDB'>Industry: </div>
                        <input type='text' placeholder='industry' value={ industry } onChange={ev => setIndustry(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <div className = 'rowNW spaceBetweenRow topMarginHalf'>
                        <div className = 'colorDB'>Site Address: </div>
                        <input type='text' placeholder='Site address' value={ siteAddress } onChange={ev => setSiteAddress(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <div className = 'rowNW spaceBetweenRow topMarginHalf'>
                        <div className = 'colorDB'>City: </div>
                        <input type='text' placeholder='City' value={ siteCity } onChange={ev => setSiteCity(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <div className = 'rowNW spaceBetweenRow topMarginHalf'>
                        <div className = 'colorDB'>State: </div>
                        <input type='text' placeholder='State' value={ siteState } onChange={ev => setSiteState(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <div className = 'rowNW spaceBetweenRow topMarginHalf'>
                        <div className = 'colorDB'>Zip: </div>
                        <input type='text' placeholder='Zip' value={ siteZip } onChange={ev => setSiteZip(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <div className = 'rowNW spaceBetweenRow topMarginHalf'>
                        <div className = 'colorDB'>Start Date: </div>
                        <input type='text' placeholder='start date' value={ startDate } onChange={ev => setStartDate(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <div className = 'rowNW spaceBetweenRow topMarginHalf'>
                        <div className = 'colorDB'>End Date: </div>
                        <input type='text' placeholder='end date' value={ endDate } onChange={ev => setEndDate(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <div className = 'rowNW spaceBetweenRow topMarginHalf'>
                        <div className = 'colorDB'>Proposed Budget: </div>
                        <input type='text' placeholder='proposed budget' value={ proposedBudget } onChange={ev => setProposedBudget(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
                    </div>
                    <input type = 'submit' className = 'bgBB colorDB borderDB topMarginHalf' value = 'Create New Job' />
                </form>  
            </div>    
        </div>
        
    )
};

export default PostForm;