// @ts-nocheck
import React from "react";
import errorImg from "../../assets/404.jpg";
import "../../Styles/_not-found.scss";

const NotFound: React.FC = () => {
    return (
        <article className="not-found">
            <h1 className="title title--h1 title--bold">404 Page not found</h1>
            <div className="not-found__image">
                <img src={errorImg} alt="404 error" />
            </div>
            <button className="go-back-btn">Go Back</button>
        </article>
    )
}

export default NotFound;