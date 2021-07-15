import React, { useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const [loading , setloading] = useState(false)
  const [cocktail ,setcocktail] = useState(null)
  const { id } = useParams()
  React.useEffect(()=>{
  setloading(true)
  try {
    async function getcocktail(){
      const response = await fetch (`${url}${id}`)
      const data = await response.json()
      if(data.drinks){
        const {strDrink:name , strInstructions:instruction , strDrinkThumb: image, strCategory:info ,strGlass:glass , strAlcoholic:type , strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5} = data.drinks[0]
        const ingredients = [strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5]
        const newcocktail = {image,name,instruction,info,glass,type,ingredients}
        setcocktail(newcocktail)
      }else{
        setcocktail(null)
      }
      setloading(false)
    }
    getcocktail()

  } catch (error) {
    console.log(error)
    setloading(false)
  }

  },[id])

  if(loading){
    return <Loading/>
  }
  if(!cocktail){
    return <h2 className="section-title">No cocktail to display</h2>
  }
  const {image,name,instruction,info,glass,type,ingredients} = cocktail
  return (
    <section className="section cocktail-section">
      <Link to ='/' className = 'btn btn-primary'>
       back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name}/>
        <div className="drink-info">
          <p>
             <span className='drink-data'>name :</span> {name}
          </p>
           <p>
             <span className='drink-data'>glass :</span> {glass}
          </p>
           <p>
             <span className='drink-data'>type :</span> {type}
          </p>
           <p>
             <span className='drink-data'>info :</span> {info}
          </p>
           <p>
             <span className='drink-data'>instruction :</span> {instruction}
          </p>
           <p>
             <span className='drink-data'>ingredients :</span> {
               ingredients.map((item,index)=>{
                 return item?<span key ={index}>{item}</span>:null
               })
             }
          </p>
           
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
