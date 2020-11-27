import React, {useEffect} from 'react';

function useDetectElement(){
    const ref = useRef(null);
    const [isEntered, setIsEntered] = useState(false);
    const [isExited, setIsExited] = useState(false);
    const [isSeen, setIsSeen] = useState(false);

    const onScrollHandler = () => {
        let { top, bottom, height } = ref.current.getBoundingClientRect();
        const entered = bottom <= window.innerHeight + height;
        const exited = bottom < height;
        //console.log(top, bottom, height);
        console.log(entered, exited, bottom <= window.innerHeight);
        setInProgress(entered && !exited);
        setIsEntered(entered);
        setIsExited(exited);
    
        if (top + height > 0 && entered) {
          // console.log(
          //   "inside view port",
          //   top + height,
          //   bottom <= window.innerHeight + height
          // );
        }
      };


    useEffect(() => {
        if (!ref.current) return;
        console.log("calling use effect inside custom hook");
        onScrollHandler();
        window.addEventListener("scroll", throttleHandler);
        window.addEventListener("resize", onResizeHandler);
        return () => {
          window.removeEventListener("scroll", throttleHandler);
          window.removeEventListener("resize", onResizeHandler);
        };
      }, [ref]);
}

export default useDetectElement;