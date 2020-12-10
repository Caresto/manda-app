import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet,VirtualizedList, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from 'react-native-elements';
import { getUsersWApp } from './services/get_user_w_app'

const getItem = (list, index) => {
  return {
    id: list[index]._id,
    to_email: list[index].name,
    name: list[index].full_name,
    phone: list[index].phone,
  };
};

const getItemCount = list => {
  return list.length
};

const Send = (props) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [list, setList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);

  useEffect(() => {
    let mounted = true;
    getUsersWApp()
      .then(items => {
        if(mounted) {
          setFilteredDataSource(items);
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])

  const gotoTab = (index, name, phone, to_email) => {
    setSelectedIndex({id: index, name: name, phone: phone, to_email: to_email, from_email: props.user})
  }

  const Item = ({ name, phone, index, to_email }) => {
    return (
      <TouchableOpacity onPress={() => gotoTab(index, name, phone, to_email)}>
      <View style={styles.item}>
        <View style ={{width:'25%'}}>
        <Image style={styles.tinyLogo} source={{
               uri: 'https://avatars0.githubusercontent.com/u/18432556?s=460&u=0ec91019f622d96b1eae693dca671d1819be7122&v=4',
             }}/>
        </View>
        <View style ={{width:'75%'}}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );};

  const searchFilterFunction = (text) => {
   if (text) {
     const newData = list.filter(function (item) {
       const itemData = item.full_name
         ? item.full_name.toUpperCase()
         : ''.toUpperCase();
       const textData = text.toUpperCase();
       return itemData.indexOf(textData) > -1;
     });
     setFilteredDataSource(newData);
     setSearch(text);
   } else {
     setFilteredDataSource(list);
     setSearch(text);
   }
 };

   const goToHome = () => {
      Actions.home({user: props.user})
   }

   const continueProcess = () => {
      Actions.send2({userData: selectedIndex, user: props.user})
  };

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
      <View style ={{flex: 1, width:'95%', marginTop: 160, marginBottom:100, backgroundColor:'#F5FBFF', borderBottomEndRadius: 10, borderBottomStartRadius: 10,  borderTopLeftRadius:10, borderTopRightRadius:10 }}>
        <SearchBar round searchIcon={{ size: 24 }}
          placeholder ="Intenta buscando: Juan Pérez"
          lightTheme = {true}
          inputStyle={{fontStyle: 'italic', backgroundColor: '#F5FBFF'}}
          containerStyle={{backgroundColor: '#F5FBFF', borderTopLeftRadius:10, borderTopRightRadius:10}}
          inputContainerStyle={{backgroundColor: '#F5FBFF', borderWidth: 0}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}></SearchBar>
         <VirtualizedList
           data={filteredDataSource}
           initialNumToRender={4}
           renderItem={({ item }) => <Item name={item.name} phone={item.phone} index ={item.id} to_email={item.to_email}/>}
           keyExtractor={item => item.id}
           getItemCount={getItemCount}
           getItem={getItem}
         />
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
    backgroundColor: '#003f5c',
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
  backgroundColor: '#F5FBFF',
  height: 80,
  justifyContent: 'center',
  marginVertical: 12,
  marginHorizontal: 16,
  padding: 20,
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start' 
},
title: {
  fontSize: 20,
  fontWeight: '500'
},
phone: {
  fontSize: 14,
  fontWeight:'300'
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

export default Send