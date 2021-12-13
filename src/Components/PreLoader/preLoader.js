import { useEffect, useRef, useState } from "react";
import "./_preLoader.scss";

function PreLoader() {
  const isMountedRef = useRef(null)
  const [loading, setloading] = useState(null);
  const [completed, setcompleted] = useState(null);

  useEffect(() => {
    isMountedRef.current = true;
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          if (isMountedRef.current) {
            setloading(true);
            setTimeout(() => {
              setcompleted(true);
            }, 2000);
          }
        });
    }, 2000);

    return () => isMountedRef.current = false;
  }, [loading, completed]);

  return (
    <>
      {!completed ? (
        <>
          {!loading ? (
            <div className="spinner">
              <span className="title title--h1">Loading...</span>
              <div className="spinner__half"></div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default PreLoader;