// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import {useAuth} from '../../hooks/authentication'
import {logout} from '../../firebase-config'
import userImg from '../../assets/user.png';
import './_profile.scss';

const Profile: React.FC = () => {
    const currentUser = useAuth();
    return (
        <div className="profileDiv">
            <article className="profileArt">
               <img className="userLogo" src={currentUser?.photoURL || userImg } alt="user" />
               <p className="clickable">Pick new profile photo</p>
            </article>
            <section className="profileSect">
                <p>Username: { currentUser?.displayName || currentUser?.email}</p>
                <input type="text" />
                <p>Change password: </p>
                <p>Your upcoming activities</p>
                <p>Your topics: </p>
                <p>Add new topic: </p>
            </section>
            <button>Save profile</button>
            <Link to="/login">
                <button onClick={logout}>Sign out</button>
            </Link>
        </div>
    );
}
export default Profile;