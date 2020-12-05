import React, {useEffect} from 'react';

function throttle(func, delay){
  let lastCalled = null; 
  let timeout = null; 
  return function(){
    let context = this;
    let args = arguments; 
    const callFunc = () => {
      func.apply(context, args);
      timeout = null;
    } 
    if(!lastCalled){
      lastCalled = true;
      callFunc();
    }
    if(!timeout){
      timeout = setTimeout(callFunc, delay);
    }
  }
}

function useDetectElement(){
    const ref = useRef(null);
    const [isEntered, setIsEntered] = useState(false);
    const [isExited, setIsExited] = useState(false);
    const [isInViewport, setIsInViewport] = useState(false);

    // check the element is in view port.
    const isNotSeen = (top, bottom) => {
      return top > window.innerHeight || bottom < 0;
    }

    const onScrollHandler = () => {
        let { top, bottom, height } = ref.current.getBoundingClientRect();
        const entered = bottom <= window.innerHeight + height;
        const exited = bottom < height;
        //console.log(top, bottom, height);
        console.log(entered, exited, bottom <= window.innerHeight);
        setIsInViewport(entered && !exited);
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

      const onResizeHandler = () => {
        
      }

    const throttleHandler = throttle(onScrollHandler, 1000);
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

      return [ref, isEntered, isExited, isInViewport];
}

export default useDetectElement;