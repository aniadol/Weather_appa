import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native'
import {format} from "date-fns"
import { fr } from "date-fns/locale"

import Weather from "./Weather"

export default function Forecasts( {data}) {

const [forecasts, setForecasts] = useState([])

useEffect(() => {
//crer un tableau depuis la liste des données recuperées 
const forecastsData = data.list.map(f => {
  const dt = new Date(f.dt * 1000)
  return ({
    date: dt, 
    hour: dt.getHours(),
    temp: Math.round(f.main.temp),
    icon: f.weather[0].icon,
    name: format(dt, "EEE", {locale: fr})
  })
} )
//Regrouper les jours identique en 1

setForecasts(forecastsData)
}, [data])

  return (
    <ScrollView 
    horizontal
    showsHorizontalScrollIndicator={false}>
    styles={styles.scroll}
      {forecasts.map(f => (
      <View>
        <Text>{f.name}</Text>
        <Weather forecast={f}/>
      </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    height: "35%",
  },

})