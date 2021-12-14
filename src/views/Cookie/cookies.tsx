// @ts-nocheck
import React from "react";
import "./_cookies.scss";

const Cookies: React.FC = () => {
    return (
        <article className="cookieArt">
            <h1 className="title title--h1 title--bold">Information about cookies</h1>
            <div >
                <h3 className="title title--h3 title--bold">What are cookies cookies?</h3>
                <p className="paragraph paragraph--small"> Cookies are small text files that can be used by sites to give you as a user a personalized and more efficient experience of the site.
                At Activity Today, we use the necessary cookies.
                 Below you can read about necessary cookies and what we use them for.</p>
            </div>
            <br />
            <div>
                <p className="paragraph paragraph--small"><strong> Necessary cookies </strong> 
                are the ones needed for the site to work properly. Without these cookies, basic functions such as page navigation and login option to your user account will not work.
                 We also collect certain information through cookies for analytical purposes to improve our site and provide us with information about the effect of our marketing. In some cases, such cookie data is shared with our partners, for example in affiliate marketing where we share a pseudonymous order number to link sales and returns with traffic from these partners.
                 IP addresses are in some cases shared with such partners to avoid fraud but are not saved longer than necessary. Processing of cookies in this category is based on our legitimate interest in understanding and improving how our site is used and in order to be able to compensate our partners for purchases on our site that have come through their channels.</p>
            </div>
        </article>
    )
}

export default Cookies;