import React from "react";
import { Link } from "react-router-dom";
import '../../styles/PersonalTextComponent.css';

function PersonalTextitems(props) {
    return (
            <Link to={props.path} className="card">
                <img src={props.img} alt={props.alt} className="cardimg"/>
                    <div className="cardbody">
                        <h2 className="cardtitle">{props.title}</h2>
                        <p className="cardcontent1">{props.content1}</p>
                        <p className="cardcontent2">{props.content2}</p>


                    </div>
            </Link>
    );
}

export default PersonalTextitems;
