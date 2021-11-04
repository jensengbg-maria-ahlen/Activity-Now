
import * as React from "react";
import { Link } from "react-router-dom";
import '../Styles/_landing.scss';

const LandingView: React.FC = () => {
//Make each of the 3 main divs to components?
    return (
        <>
            <article className="mainLand">
                <div>
                    <h3 className="orangeHeader">Your activities</h3>
                    <div className="greenDiv">
                        <article className="landingArt">
                            <h4>11/11</h4>
                            <p className="activity">Tea-party!</p>
                        </article>
                    </div>
                </div>
                <div>
                    <h3 className="greenHeader">Topics you follow</h3>
                    <div className="midDiv">
                        <article className="landingArt">
                            <h4 className="redHeader">11/11</h4>
                            <p className="activity">Tea-party!</p>
                        </article>
                    </div>
                </div>
                <div>
                    <h3 className="orangeHeader">Hot topics</h3>
                    <div className="greenDiv">
                        <article className="landingArt">
                            <h4>11/11</h4>
                            <p className="activity">Tea-party!</p>
                        </article>
                    </div>
                </div>
            </article>
        </>
    );
}
export default LandingView;