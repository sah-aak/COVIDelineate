import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import './Infobox.css';

function Infobox({title, cases, isRed, isBlack , isGreen , active, total, ...props}) {
    return (
        <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${isBlack && "infoBox--black"} ${isGreen && "infoBox--green"}`} onClick={props.onClick} >
            <CardContent>
                <Typography color="textSecondary" className="infoBox_title">
                    {title}
                </Typography>

                <h2 className={`infoBox_cases ${isRed && "infoBox--red"} ${isBlack && "infoBox--black"} ${isGreen && "infoBox--green"}`}>{cases}</h2>

                <Typography color="textSecondary" className="infoBox_total">
                    {total}   total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default Infobox
