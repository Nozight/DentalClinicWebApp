import React,{ useCallback,useState } from "react";

export function useToggle(initValue=false) { //De esta forma la funcion pude llamarse con argumento o sin argumento(siendo por default el declarado) useToggle() o useToggle(true)
    const [state,setState]=useState(initValue);
    const toggleState = useCallback(()=>{setState(state => !state)},[state])
    return [state,toggleState]
}