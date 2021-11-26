import { useEffect } from "react";
import UpdateProfile from "../../hooks/addToStorage";
import "./_progressBar.scss";

const ProgressBar = ({file, setCurrentImg}) => {
    const { progress, imgUrl} = UpdateProfile(file);

    useEffect(() => {
        if (imgUrl) {
            setCurrentImg(imgUrl)
            
        } 
    }, [imgUrl, setCurrentImg])

    if (progress < 100) {
        return <div className="progress-bar" style={{ width: progress + "%"}}></div>
    } else {
        return <div></div>
    }
}

export default ProgressBar;