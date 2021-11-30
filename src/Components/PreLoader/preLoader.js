import { useEffect, useState } from "react";
import "./_preLoader.scss";

function PreLoader() {
  const [loading, setloading] = useState(null);
  const [completed, setcompleted] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 1000);
        });
    }, 2000);
  }, []);

  return (
    <>
      {!completed ? (
        <>
          {!loading ? (
            <div className="spinner">
              <span className="title title--h1">Loading...</span>
              <div className="spinner__half"></div>
            </div>
          ) : null }
        </>
      ) : null }
    </>
  );
}

export default PreLoader;