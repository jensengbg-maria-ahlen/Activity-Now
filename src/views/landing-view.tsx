// @ts-nocheck
import React from "react";
import YourActivity from "../Components/yourActivities"
import FollowedTopics from "../Components/followedTopics";
import HotTopics from "../Components/hotTopics";
import {useAuth} from '../hooks/authentication'

import '../Styles/_landing.scss';

const LandingView: React.FC = () => {
    const currentUser = useAuth();
    return (
        <>
            <h3>Welcome, { currentUser?.email }</h3>
            <article className="mainLand">
               
                <YourActivity />
                <FollowedTopics />
                <HotTopics />
            </article>
        </>
    );
}
export default LandingView;