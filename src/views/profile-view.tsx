// @ts-nocheck
import React from "react";
import user from '../assets/user.png';
import '../Styles/_profile.scss';


import { Link } from "react-router-dom";

const ProfileView: React.FC = () => {


    return (
        <div className="profileDiv">
            <article className="profileArt">
               <img className="userLogo" src={user} alt="user" />
               <p className="clickable">Pick new profile photo</p>
            </article>
            <section className="profileSect">
                <p>Username:</p>
                <p>Change password: </p>
                <p>Your upcoming activities</p>
                <p>Your topics: </p>
                <p>Add new topic: </p>
            </section>
            <button>Save profile</button>
            <Link to="/">
                <button >Sign out</button>
            </Link>
        </div>
    );
}
export default ProfileView;