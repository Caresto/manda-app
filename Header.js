import React ,{ useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { getUserInfo } from './services/get_user_info'

const Header = (props) => {

  const [list, setList] = useState([]);

  useEffect(() => {
    getUserInfo(props.user)
      .then(response => {
      setList(response)
      })
    return () => mounted = false;
  }, [])
  
  return (
    <View style ={{ backgroundColor:'#18191A', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 ,width:'100%', height:'23%'}}>
      <View style ={{alignItems: 'center', paddingTop: 40, width:'100%'} }>
         <Image style={styles.tinyLogo} source={{
             uri: 'https://avatars0.githubusercontent.com/u/18432556?s=460&u=0ec91019f622d96b1eae693dca671d1819be7122&v=4',
           }}/>
         <Text style={{color: '#EBF1F5', fontWeight: 'bold', paddingTop: 5}}> {list['full_name']} </Text>
         <Text style={{color: '#EBF1F5', fontWeight: 'bold' ,paddingTop: 3, width:'75%'}}>  <Entypo name="direction" size={16} color="orange" /> Praderas de San Antonio, Calle 1ra Urraca, Casa #43 </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
  }
});

export default Header