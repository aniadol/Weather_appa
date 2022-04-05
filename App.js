import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Linking} from 'react-native';
import Constants from 'expo-constants';
import * as Location from "expo-location"; //importer tout depuis la librairie 
import axios from "axios"; 

import Forecasts from "./components/Forecasts"
import CurrentWeather from "./components/CurrentWeather"

//créer une fonction pour récuperer un url avec la kléAPI, en français en métric (C°) et variables lat, lon 
const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=65868f45ea2edeba54db67940ff3f029&lang=fr&units=metric`


export default function App() {

  //1/ recuperer les coordonnées depuis la librairie 

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
 
  React.useEffect( () => {
    const getCoordinates = async () => {
    //Demander la permission avec Pop Up mais on ne peut pas attendre on crée alors une fonction asynchrone
    const { status } = await Location.requestForegroundPermissionsAsync()
    //Verifier si l'autorisation a été donnée par l'utilisateur (cas non autorisé non fait)
    if (status !== "granted"){
      return Linking.openSettings();
    }
   // quand statut=granted : partage ok, on veut alors récuperer les données  
    const userLocation = await Location.getCurrentPositionAsync ()
    getWeather(userLocation)
    }
    getCoordinates()
  }, [] )

  //2/ réaliser la requete pour afficher la ville, la météo, prévisions
const getWeather = async (location) => {
  try {
  const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))
  
  setData(response.data)
  setLoading (false)

  }catch(e) {
    console.log("erreur dans getWeather")
  }
}


//Afficher
  // verifier si location n'est pas null et afficher message 
  if(loading) {
    return <View style={styles.container}>
      <ActivityIndicator />
    </View>
  }
  
  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />  
      <Forecasts data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e2e6e1',
    padding: 8,
  },
});
