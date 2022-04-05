import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import {isSameDay} from "date-fns"

const getIcon = (icon) => {
  let i = `http://openweathermap.org/img/wn/${icon}@4x.png`
  console.log(i)
  return i
}

export default function CureentWeather({data}) {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  //Recuperer la temperature à l'instant T
  useEffect( () => {
    //filtrer les éléments selon une codition
    const currentW = data.list.filter(forecast => {
      //savoir si la date dans la liste correspond à la date du jour 
      const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
      const forecastDate = new Date(forecast.dt * 1000)
      return isSameDay(today, forecastDate) 
    })
    // recuperer la première prévision 
    setCurrentWeather(currentW[0])
    
    console.log(currentW[0])
  }, [data])

  useEffect(() => {
      if (currentWeather) {
          setIsLoading(false)
      }
  }, [currentWeather])

  if (isLoading) {
    return <Text>is loading</Text> 
  }

  return(
    <View style={styles.container}>
      <Text style={styles.city}>{data?.city?.name} </Text>  
      <Text style={styles.today}>Il fait actuellement</Text> 
      <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)} °C</Text>    

      <View style={{}}>   
      <Image 
      //récuperer les infos du jour et affic her l'icon qui s'y référe 
        source={{ uri: getIcon(currentWeather.weather[0].icon) }}
        style={{height: 150, width: 150}}
        resizeMode={"contain"}
      />
      </View>

      <Text style={styles.description}>{currentWeather?.weather[0].description} </Text>       
    </View>
  )
}

const color = `#54565B`

const styles = StyleSheet.create({
  container : {
    marginTop: 60,
    alignItems: "center",
    height: "35%",
  },

  city: {
    fontSize: 36,
    fontWeight : 500,
    color: color,
  },
  today : {
    fontSize: 15,
    fontWeight: 300,
    color : color, 
  },
  temp : {
    fontSize : 80,
    fontWeight : "bold",
    color : color,
  },

  description : {
    fontSize: 24,
    fontWeight: "bold",
    color: color,
  }

});