import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native'

const getIcon = (icon) => {
  let i = `http://openweathermap.org/img/wn/${icon}@2x.png`
  console.log(i)
  return i
}

export default function Weather( {forecast}) {
  return(
    <View style={style.container}>
      <Text>{forecast.hour}h</Text>
      <Image 
      //récuperer les infos du jour et affic her l'icon qui s'y référe 
        source={{ uri: getIcon(forecast?.icon) }}
        resizeMode={"contain"}
      />
      <Text style={style.temp}>{forecast.temp}°C</Text>
    </View>)
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 140,
    width: 75,
    paddingVertical: 6,
    justifyContent:"center",
    alignItems:"center",
    marginRight: 10,
    borderRadius: 50
  },

  temp: {
    fontSize: 16,
    fontWeight: "bold",
  }
})