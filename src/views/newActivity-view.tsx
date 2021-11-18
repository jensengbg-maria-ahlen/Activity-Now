// @ts-nocheck
import React from "react";
import '../Styles/_activity.scss';
import { getFirestore  } from "firebase/firestore"


const NewActivityView: React.FC = () => {

    return (
        <div className="newActivityDiv">
            <section>
                <h2>Create new activity</h2>
            </section>
            <article className="greenArt">
                <h4>Date:</h4>
                <h4>Location:</h4>
                <h4>Topic:</h4>
                <h4>Description:</h4>
                <button className="createBtn">Create activity</button>
            </article>
        </div>
    );
}
export default NewActivityView;