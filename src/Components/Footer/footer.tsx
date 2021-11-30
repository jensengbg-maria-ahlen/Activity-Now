// @ts-nocheck
import React from "react"
import "./_footer.scss"

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer__content">
                <h3 className="title title--h3 title--bold title--no-spacing">Help</h3>
                <div>
                    <p className="paragraph paragraph--small paragraph--no-spacing">Cookies</p>
                    <p className="paragraph paragraph--small paragraph--no-spacing">Contact us</p>
                </div>
            </div>
            <div className="footer__content">
                <h3 className="title title--h3 title--bold title--no-spacing">Information</h3>
                <div>
                    <p className="paragraph paragraph--small paragraph--no-spacing">About us</p>
                </div>
            </div>
            <div className="footer__content">
                <h3 className="title title--h3 title--bold title--no-spacing">Follow us</h3>
                <div>
                    <p className="paragraph paragraph--small paragraph--no-spacing">instagram</p>
                    <p className="paragraph paragraph--small paragraph--no-spacing">Facebook</p>
                </div>
            </div>
        </div>
    )
}

export default Footer