import { useRef } from "react";

function Videos(){
      
    const videoRef =  useRef(null);
    
    function playVideo(){
        videoRef.current.play();
    }

    function pauseVideo(){
        videoRef.current.pause();
    }

    function resetVideo(){
        videoRef.current.currentTime = 0;
    }

    function forwardVideo(){
        videoRef.current.currentTime+=5;
    }

    return(
        <>
        <video ref={videoRef} src="/thunder.mp4" height={"600px"} width={"1200px"} controls></video>
        <div>
            <button onClick={playVideo}>Play</button>
            <button onClick={pauseVideo}>Pause</button>
            <button onClick={resetVideo}>Reset</button>
            <button onClick={forwardVideo}>Forward</button>
            <button>Backward</button>
        </div>
        </>
    )

}

export default Videos;