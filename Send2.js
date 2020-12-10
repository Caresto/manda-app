import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Button, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import gift_img from './assets/undraw_gift1_sgf8.png'

const Send2 = (props) => {

  const goToHome = () => {
    Actions.home({user: props.user})
  }

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('calendar');
  const [show, setShow] = useState(false);
  const [motiveText, setMotiveText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const continueProcess = () => {
    fetch(`http://54.166.209.233/gifts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: props.userData.name,
        from: props.user,
        motiveText: motiveText['motiveText'],
        descriptionText: descriptionText['descriptionText'],
        deliveryDate: date,
        to_email: props.userData.to_email
      })
    }).then(response => response.json())
      .then(responseJson => {
      Actions.confirmation({user: props.user});
    }).catch(error => {
      console.error(error);
    })
  }

  return (
    <LinearGradient
    colors={['#E26250', '#EECD60']}
    style={{ flex: 1 , alignItems: 'center' }}>
      <StatusBar hidden={true}/>
        <TouchableOpacity style={styles.floatcancelbutton} onPress={goToHome}>
          <Text style={styles.sendText}>X</Text>
         </TouchableOpacity>
      <View style ={{flex:1,marginTop: 80, position:'absolute', alignItems:'center'}}>
        <Text style={{fontSize:30, fontWeight:'800', color:'#ffff'}}>Mandaapp</Text>
        <Text style={{fontSize:16, fontWeight:'300', color:'#ffff'}}>Datos del envío</Text>
      </View>
      <View style ={{flex: 1, width:'95%', marginTop: 160, marginBottom:100, backgroundColor:'#F5FBFF', borderBottomEndRadius: 10, borderBottomStartRadius: 10,  borderTopLeftRadius:10, borderTopRightRadius:10, alignItems:'center'}}>
        <Text style={{fontWeight:'500', fontSize:14, paddingBottom: 15, paddingTop: 20}}>Motivo del envio:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:'90%', borderRadius: 10, color:'#181919', textAlign:'center', fontStyle:'italic'}} placeholder="Regalo de cumpleaños" onChangeText={text => setMotiveText({motiveText:text})}/>
        <Text style={{fontWeight:'700', fontSize:14, paddingTop: 15}}>¿Qué enviarás?</Text>
        <View style={styles.item}>
        <View style ={{width:'35%'}}>
          <Image source={gift_img} style={{ width: 100, height: 50}} /> 
        </View>
        <View style ={{width:'65%' }} >
          <Text style={styles.title}>Para: <Text style={{color:'#279CF5'}}>{props.userData.name}</Text> </Text>
          <TextInput multiline={true} blurOnSubmit={true} 
          onChangeText={text => setDescriptionText({descriptionText:text})}
          style={{ height: 80, borderColor: 'gray', borderWidth: 1, width:'90%', borderRadius: 10, color:'#181919', fontStyle:'italic', textAlign:'center', textAlignVertical:'top'} } placeholder="Escribe una mensaje para quien reciba este envío..."/>
        </View>
      </View>
      <Text style={{fontWeight:'700', fontSize:14, paddingTop: 15}}>¿Cuándo lo enviarás?</Text>
      <Button title="Seleccionar fecha" onPress={showDatepicker} style={{ color:'#E26250'}}/>
      {show && (<DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
          display = 'default'
          style={{width: 320, height:150, backgroundColor: "white"}}/>
          )}
      </View> 
      <TouchableOpacity style={styles.floatbutton} onPress={() => continueProcess()}> 
            <LinearGradient
                  start={[0, 1]}
                  end={[1, 0]}
                  colors={['#E26250', '#E26250']}
                  style={{borderRadius: 20, padding: 4}} >
               <Text style={styles.sendText}> Continuar </Text>
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
  alignItems: 'center',
  justifyContent: 'center'
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

export default Send2