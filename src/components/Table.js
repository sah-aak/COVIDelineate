import React from 'react'
import './Table.css';
import numeral from 'numeral';

function Table({countries,caseType}) {
    return (
        <div class="table">
            {countries.map((country)=>(
               <tr>
                    <td>{country.country}</td>
                    <td><strong>{numeral(country[caseType]).format("0,0")}</strong></td>
               </tr> 
            ))}
        </div>
    )
}

export default Table
