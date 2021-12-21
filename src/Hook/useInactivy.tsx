import { useEffect, useState } from "react";

export default function useInactivy() {

    const [inactivy] = useState(180);
    const [activy, setActivy] = useState(0);
    const [isVideoPlay, setIsVideoPlay] = useState(false);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setActivy(activy + 1);
            checkTime()
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [inactivy, activy])


    useEffect(() => {
        window.onclick = () => {
            setActivy(0);
            setIsVideoPlay(false)
        };
    }, [])


    function checkTime() {
        if (activy >= inactivy) {
            setIsVideoPlay(true)
            setActivy(0);
        }
    }


    return {isVideoPlay, setIsVideoPlay}
}
