import {createContext,useState,useEffect, Children}  from "react";

const DataContext = createContext({})

export const  DataProvider = ({Children}) =>{
    return(
        <DataContext.Provider value={{

        }}>
            {Children}
        </DataContext.Provider>
    )
} 

export default DataContext
















/* import { createContext,useState,useEffect, Children } from "react";


const DataContext = createContext({})

export const DataProvider  = ({Children}) =>{
    return(
        <DataContext.Provider value={{
            
        }}>
            {Children}
        </DataContext.Provider>
    )
} */