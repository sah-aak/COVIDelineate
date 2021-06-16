import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import './Infobox.css';

function Infobox({title, cases, total, ...props}) {
    return (
        <Card className="infoBox" onClick={props.onClick} >
            <CardContent>
                <Typography color="textSecondary" className="infoBox_title">
                    {title}
                </Typography>

                <h2 className="infoBox_cases">{cases}</h2>

                <Typography color="textSecondary" className="infoBox_total">
                    {total}   total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default Infobox
