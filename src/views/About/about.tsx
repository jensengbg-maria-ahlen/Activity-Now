// @ts-nocheck
import React from "react";
import Maria from '../../assets/maria.jpg';
import Matilda from '../../assets/matilda.jpg';
import "./_about.scss";


const About: React.FC = () => {
    return (
        <article className="aboutArt">
            <h1 className="title title--h1 title--bold">Information om ActivityToday</h1>
            <div className="aboutDiv">
                <p className="paragraph paragraph--small">
                Activity Today we did because we thought it would be a fun idea to have. Especially now after corona restrictions have started to drop and one can start going out and doing things. But as many adults have problems with, you may not have as many friends or not so many who want to invent new things. So this will be an easy way to get in touch with new people who may have the same interest as you and you can get out of your home.
                
                <br/> <br/>
                We who made the application are called Maria and Matilda! If you have any questions or comments, you are more than welcome to contact us. You will find our contact details at the bottom of the page!
                </p>
            </div>
            <div>
                <img className="usImage" src={Maria} alt="maria" />
                <img className="usImage" src={Matilda} alt="matilda" />
            </div>
        </article>
    )
}

export default About;