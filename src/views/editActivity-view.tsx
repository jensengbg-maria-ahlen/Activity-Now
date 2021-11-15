
import * as React from "react";
import '../Styles/_activity.scss';


const EditView: React.FC = () => {


    return (
        <div className="newActivityDiv">
            <section>
                <h2>Edit activity</h2>
            </section>
            <article className="greenArt">
                <h4>Date:</h4>
                <h4>Location:</h4>
                <h4>Topic:</h4>
                <h4>Description:</h4>
                <section className="buttonSection">
                    <button className="cancelBtn">Cancel activity</button>
                    <button className="editBtn">Stop editing</button>
                    <button className="editBtn">Save activity</button>
                </section>
            </article>
        </div>
    );
}
export default EditView;