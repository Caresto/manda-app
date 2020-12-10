import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; 

const Login = () => {
  const firstRender = useRef(true)
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

   const goToHome = () => {
    fetch('http://54.166.209.233/_session', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: email['email'],
        password: password['password']
      })
    }).then(response => response.json())
      .then(responseJson => {
      if ('name' in responseJson) {
        Actions.home({user: email['email'], password: password['password']});
      }
    }).catch(error => {
      console.error(error);
    })
   }

   useEffect(() => {
     if (firstRender.current) {
       firstRender.current = false
       return
     }
   }, [password, email])

   return (
        <View style={styles.container}>
          <StatusBar hidden={true}/>
                <Text style={styles.logo}>MandaApp</Text>
                <View style={styles.inputView} >
                  <TextInput  
                    style={styles.inputText}
                    placeholder="Email..." 
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setEmail({email:text.toLowerCase()})}/>
                </View>
                <View style={styles.inputView} >
                  <TextInput  
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..." 
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword({password:text.toLowerCase()})}/>
                </View>
                <TouchableOpacity>
                  <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={goToHome}>
                  <Text style={styles.loginText}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.loginText}>Registrarse</Text>
                </TouchableOpacity>
      </View>
   )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});

export default Login

