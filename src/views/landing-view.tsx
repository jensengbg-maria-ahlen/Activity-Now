// @ts-nocheck
import React from "react";
import YourActivity from "../Components/yourActivities"
import FollowedTopics from "../Components/followedTopics";
import HotTopics from "../Components/hotTopics";

import '../Styles/_landing.scss';

const LandingView: React.FC = () => {
    return (
        <>
            <article className="mainLand">
                <YourActivity />
                <FollowedTopics />
                <HotTopics />
            </article>
        </>
    );
}
export default LandingView;