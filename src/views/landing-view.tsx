
import * as React from "react";
import YourActivity from "../Components/yourActivities"
import '../Styles/_landing.scss';
import FollowedTopics from "../Components/followedTopics";
import HotTopics from "../Components/hotTopics";

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