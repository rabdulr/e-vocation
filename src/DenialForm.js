import React from 'react';

const DenialForm = ({ errorMessage, setToggleDenial }) => {
    return (
        <div className = 'columnNW bgAlphaDB frosted z1 widthundred heighthundred'>
            <div className = 'rowNW justifyEnd widthundred'>
                <input type = 'button' onClick = { () => setToggleDenial(false) } className = 'border50 colorAO bgTransparent topMargin2 rightMarginHalf borderAO padQuarter sixteenPoint' value = ' X '/>
            </div>
            <div className = 'centerText bgAlphaDB topPad2 bottomPad2 colorOW topMargin3'>{ errorMessage.text }</div>
        </div>
    )
};

export default DenialForm;