// @ts-nocheck
import React, { useState } from "react";
import "./_confirm-deletion.scss"
import "../../Styles/_buttons.scss"

type ConfirmProps = {
    setConfirmed: (confirmed: boolean) => void;
    disabled: boolean;
}

const ConfirmDeletetion: React.FC<ConfirmProps> = (props: ConfirmProps) => {
    const [active, setActive] = useState<boolean>(false)
    const [confirmed, setConfirmed] = useState<boolean>(false);

    return (
        <div className="confirm-deletion">
            <button className={props.disabled ? "delete-btn--disabled" : "delete-btn"} disabled={active} onClick={() => setActive(!active)}>Remove</button>
            {active ? (
                <div className="confirm-deletion__content">
                    <h3 className="title title--h3">Confirm Remove</h3>
                    <p className="paragraph">Are you sure you want to remove this activity?</p>
                    <div className="confirm-deletion__buttons">
                    <button
                        className="cancel-btn"
                        onClick={(e) => {
                            e.preventDefault()
                            setActive(!active)
                        }}
                    >
                        Cancel
                    </button>
                    <button 
                        className="delete-btn"
                        onClick={(e) => {
                        e.preventDefault()
                        setConfirmed(false);
                        setActive(!active)
                        props.setConfirmed(confirmed);
                    }}>
                        Delete
                    </button>
                    </div>
                </div>
            ) : null}

        </div>
    )
}

export default ConfirmDeletetion;