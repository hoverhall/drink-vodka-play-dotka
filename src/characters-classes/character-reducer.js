import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => (
    <div className='dinamic-character-content'>
        {props.json.map((item, i) => (
            <div key={i} className="character-dom">
                {item.primary_attr === props.type && (
                    <Link className="character-link" to={`/${item.localized_name}`}>
                        <div className="character-item" id={item.localized_name}>
                            <img className="character-logo" src={`https://api.opendota.com${item.icon}`} alt="logo" />
                            <span className="inner-character-span">{item.localized_name}</span>
                        </div>
                    </Link>
                    
                )}
            </div>
        )
        )}
    </div>
)