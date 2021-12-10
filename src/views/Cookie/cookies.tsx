import React from "react";
import "./_cookies.scss";

const Cookies: React.FC = () => {
    return (
        <article className="cookieArt">
            <h1 className="title title--h1 title--bold">Information om kakor</h1>
            <div >
                <h3 className="title title--h3 title--bold">Vad är Cookies?</h3>
                <p className="paragraph paragraph--small"> Cookies är små textfiler som kan användas av sajter för att ge dig som användare en personligt anpassad och mer effektiv upplevelse av sajten.
                 På Activity Today använder vi oss av nödvändiga cookies. 
                 Nedan kan du läsa om nödvändiga cookies och vad vi använder dem till.</p>
            </div>
            <br />
            <div>
                <p className="paragraph paragraph--small"><strong> Nödvändiga cookies </strong> 
                är de som behövs för att sajten ska fungera korrekt. Utan dessa cookies fungerar inte grundläggande funktioner såsom sidnavigering och inloggningsmöjlighet till ditt användarkonto.
                 Vi samlar även in viss information genom cookies i analytiskt syfte för att förbättra vår sajt och ge oss information om effekten av vår marknadsföring. I vissa fall delas sådan cookiedata med våra partners, exempelvis vid affiliate-marknadsföring där vi delar ett pseudonymiserat ordernummer för att koppla ihop försäljning och returer med trafik från dessa partners.
                 IP-adresser delas i vissa fall med sådana partners för att undvika bedrägerier men sparas inte längre än nödvändigt. Behandling av cookies i denna kategori baseras på vårt berättigade intresse att förstå och förbättra hur våran sajt används och för att kunna ersätta våra partners för köp på vår sajt som kommit via deras kanaler.</p>
            </div>
        </article>
    )
}

export default Cookies;