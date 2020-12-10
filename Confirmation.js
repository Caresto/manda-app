import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { LinearGradient } from 'expo-linear-gradient';
import logo from './assets/undraw_On_the_way_re_swjt.png'



const Confirmation = (props) => {
  const goToHome = () => {
    Actions.home({user: props.user})
  }

  return (
    <LinearGradient
    colors={['#E26250', '#EECD60']}
    style={{ flex: 1 , alignItems: 'center' }}>
      <StatusBar hidden={true}/>
        <TouchableOpacity style={styles.floatcancelbutton} onPress={goToHome}>
          <Text style={styles.sendText}>X</Text>
         </TouchableOpacity>
      <View style ={{flex:1, marginTop: 80, position:'absolute', alignItems:'center'}}>
        <Text style={{fontSize:30, fontWeight:'800', color:'#ffff'}}>Mandaapp</Text>
        <Text style={{fontSize:16, fontWeight:'300', color:'#ffff'}}>Datos del envío</Text>
      </View>
      <View style ={{flex: 1, width:'95%', marginTop: "50%", marginBottom:'70%', backgroundColor:'#F5FBFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10,  borderTopLeftRadius:10, borderTopRightRadius:10, alignItems:'center'}}>
        <Image source={logo} style={{ width: 305, height: 175, borderBottomRightRadius: 10, borderBottomLeftRadius:10}} /> 
        <Text style={{fontWeight:'700', fontSize:28, paddingBottom: 5, paddingTop: 20}}>Vamos en camino</Text>
        <Text style={{fontWeight:'500', fontSize:14 }}>a buscar tu envío. </Text>
        <Text style={{fontWeight:'300', fontSize:14, paddingTop: 35}}>Muy pronto tocaremos a tu puerta.</Text>
      </View> 
      <TouchableOpacity style={styles.floatbutton} onPress={() => goToHome()}> 
            <LinearGradient
                  start={[0, 1]}
                  end={[1, 0]}
                  colors={['#E26250', '#E26250']}
                  style={{borderRadius: 20, padding: 4}} >
               <Text style={styles.sendText}> ¡Listo! </Text>
            </LinearGradient>
         </TouchableOpacity>
    </LinearGradient>
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatcancelbutton: {
    position: 'absolute',
    width: "80%",
    marginTop: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    flex: 1
 },
 sendText: {
  marginTop: 5,
  marginBottom: 5,
  marginStart: 50,
  marginEnd: 50,
  color:"white",
  fontSize: 20,
  fontWeight: '400'
},
item: {
  backgroundColor: '#FFFFFF',
  height: 180,
  justifyContent: 'center',
  marginVertical: 12,
  marginHorizontal: 16,
  padding: 20,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center' 
},
title: {
  fontSize: 16,
  fontWeight: '400',
  marginBottom: 17
},
tinyLogo: {
  width: 50,
  height: 50,
  borderRadius: 50/2,
},
floatbutton: {
  position: 'absolute',
  width: "80%",
  height: 60,
  alignItems: 'center',
  justifyContent: 'center',
  right: 30,
  bottom: 60,
  flex: 1
},
})

export default Confirmation