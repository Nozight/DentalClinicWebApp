import React,{ useCallback,useState } from "react";

export function useDeleteByEnrollment(initValue) { //De esta forma la funcion pude llamarse con argumento o sin argumento(siendo por default el declarado) useToggle() o useToggle(true)
    const [enrollment,setEnrollment]=useState(initValue);
    const toggleState = useCallback(()=>{setState(state => !state)},[state])
    return [state,toggleState]
}