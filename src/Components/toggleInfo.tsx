// @ts-nocheck
import React from "react";
import { useState }  from "react";
import infoImg from '../assets/info.png';
import "../Styles/_toggle-info.scss";


const ToggleInfo = ({toggleText} : {toggleText: any}) => {
    const [isShown, setIsShown] = useState(false);

    return (
        <div className="toggle-info"
            onClick={() => setIsShown(!isShown)}
        >
            <img className="toggle-info__info-img" src={infoImg} alt="info" />
            {isShown && (
                <div className="toggle-info__info-text">
                    <p className=".caption caption--bold">
                        {toggleText}
                    </p>
                </div>
            )}
        </div>
    )
}

export default ToggleInfo;