import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading , setloading] = useState(false)
  const [searchTerm , setsearchTerm] = useState('a')
  const [cocktails ,setcocktails] = useState([])
  const fetchdrink = useCallback(async()=>{
    setloading(true)
   try {
     const response = await fetch(`${url}${searchTerm}`)
     const data = await response.json()
     const {drinks} = data
     if(drinks){
      const newcocktails = drinks.map((drink)=>{
        const {idDrink,strDrink,strAlcoholic,strGlass,strDrinkThumb} = drink
        return{id:idDrink , name: strDrink , type: strAlcoholic ,glass :strGlass , image: strDrinkThumb}
      })
      setcocktails(newcocktails)
     }else{
      setcocktails([])
    }
     setloading(false)
   } catch (error) {
     console.log(error)
     setloading(false)
   }
  },[searchTerm])
  useEffect(()=>{
    fetchdrink()
  },[searchTerm,fetchdrink])
  return <AppContext.Provider value = {{loading,cocktails,setsearchTerm}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
