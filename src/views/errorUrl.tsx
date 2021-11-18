import React from "react";
import errorImg from "../assets/404.jpg";
import "../Styles/_error-url.scss";

const ErrorUrl = () => {
    return (
        <article className="error-url">
            <h1 className="title title--h1 title--bold">404 Page not found</h1>
            <div className="error-url__image">
                <img src={errorImg} alt="404 error" />
            </div>
            <button className="go-back-btn">Go Back</button>
        </article>
    )
}

export default ErrorUrl;