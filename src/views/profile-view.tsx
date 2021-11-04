
import * as React from "react";
import { Link } from "react-router-dom";
import user from '../assets/user.png';
import '../Styles/_profile.scss';

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
        </div>
    );
}
export default ProfileView;