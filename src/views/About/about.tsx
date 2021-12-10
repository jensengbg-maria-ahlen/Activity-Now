import React from "react";
import Maria from '../../assets/maria.jpg';
import Matilda from '../../assets/matilda.jpg';
import "./_about.scss";


const About: React.FC = () => {
    return (
        <article className="aboutArt">
            <h1 className="title title--h1 title--bold">Information om ActivityToday</h1>
            <div className="aboutDiv">
                <p className="paragraph paragraph--small">
                Activity Today gjorde vi för vi tyckte det skulle vara en kul idé att ha. Speciellt nu efter corona restriktioner har börjat släppa och man kan börja gå ut och göra saker. Men som många vuxna har problem med så kanske man inte har så många vänner eller inte har så många som vill hitta på nya saker. Så detta blir ett lätt sätt att komma i kontakt med nya människor som kanske har samma intresse som du själv har och man kan komma ut från sitt hem. 
                
                <br/> <br/>
                Vi som gjort appen heter Maria och Matilda! Har du några frågor eller synpunkter får du mer än gärna hör av dig till oss. Du hittar våra kontaktuppgiter längst ner på sidan!
                </p>
            </div>
            <div>
                <img className="usImage" src={Maria} alt="maria" />
                <img className="usImage" src={Matilda} alt="matilda" />
            </div>
        </article>
    )
}

export default About;