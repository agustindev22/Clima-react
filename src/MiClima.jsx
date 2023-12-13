import { useState } from "react"

export const MiClima = () => {
  const urlBase='https://api.openweathermap.org/data/2.5/weather'
  //?q={city name}&appid={API key}
  const API_KEY ='5ff8e1b1890a409d33bc44c90cb08ae8'
  const difKelvin= 273.15
 const [ ciudad, setCiudad] = useState('')
 const [dataClima,setDataClima]=useState(null)
 const handleCambioCiudad=(e)=>{
  setCiudad(e.target.value)
 }
 const handleSubmit=(e)=>{
  e.preventDefault()
  if (ciudad.length > 0) fetchClima()
 }

const fetchClima = async() => {
  try {
    const response = await fetch(`${urlBase}?q=${ciudad} &appid=${API_KEY}`)
    const data = await response.json()
    setDataClima(data)
  } catch (error){
    console.error('Ocurrio un problema:', error)

  }
}




  return (
    <section className='contenedor-clima'>
      <h1>Meteorologo</h1>

    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      value={ciudad}
      onChange={handleCambioCiudad}
      className="buscador"    
      />
     <button className="btn" type="submit">Buscar</button>
    </form>
    {
      dataClima && (
        <article>
          <h2 className="ciudades"> { dataClima.name} </h2>
          <p className="temp-con">Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°Grados </p>
          <p className="temp-con"> Condicion: { dataClima.weather[0].description}</p>
          <img className="icon" src={  ` https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="clima" />
        </article>
      )
    }


    </section>
  )
}
