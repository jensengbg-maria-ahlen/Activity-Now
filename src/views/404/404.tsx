// @ts-nocheck
import React from "react";
import { useHistory } from "react-router-dom";
import errorImg from "../../assets/404.jpg";
import "./_not-found.scss";

const NotFound: React.FC = () => {
    const history = useHistory()
    return (
        <article className="not-found">
            <h1 className="title title--h1 title--bold">404 Page not found</h1>
            <div className="not-found__image">
                <img src={errorImg} alt="404 error" />
            </div>
            <button className="go-back-btn" onClick={history.goBack}>Go Back</button>
        </article>
    )
}

export default NotFound;