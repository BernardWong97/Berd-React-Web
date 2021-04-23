import {useState, useEffect} from 'react'

export const ErrorDiv = ({visible, duration, onDurationEnd, children}) => {
    const [isVisible, setVisiblilty] = useState(null)

    useEffect(()=>{
        setVisiblilty(visible)
    }, [visible])

    if(!isVisible)
        return null

    setTimeout(()=>{
        setVisiblilty(true)

        if(onDurationEnd)
            onDurationEnd(false)
    }, duration)
    
    return children
}