// @ts-nocheck
import React, { useState }  from "react";
import infoImg from '../../assets/info.png';
import "./_toggle-info.scss";

type ToggleProps = {
    toggleText: string
}

const ToggleInfo: React.FC<ToggleProps> = (props: ToggleProps) => {
    const [isShown, setIsShown] = useState(false);

    return (
        <div className="toggle-info"
            onClick={() => setIsShown(!isShown)}
        >
            <img className="toggle-info__info-img" src={infoImg} alt="info" />
            {isShown && (
                <div className="toggle-info__info-text">
                    <p className="caption caption--bold">
                        {props.toggleText}
                    </p>
                </div>
            )}
        </div>
    )
}

export default ToggleInfo;