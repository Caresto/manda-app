import { StatusBar } from 'expo-status-bar';
import React ,{ useEffect, useState } from 'react'
import { TouchableOpacity, Text,SafeAreaView, View, VirtualizedList, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from 'react-native-elements';
import Header from './Header';
import { getListAsync } from './services/get_my_gifts'
import { Feather,Ionicons, FontAwesome } from '@expo/vector-icons';

const getItem = (list, index) => {
  return {
    id: list[index].id,
    title: list[index].title,
  };
};

const getItemCount = list => {
  return list.length
};

const getDate = ()=>{
  var date = new Date()
  var new_date = date.toLocaleString('es', { month: 'long', day: 'numeric' });
  return new_date
}
const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );};


const MyGifts = (props) => {
   const goToAbout = () => {
      Actions.about()
   }
   const goToSend = () => {
     Actions.send({user: props.user, password: props.password})
   }
   const [search, setSearch] = useState('');
   const [filteredDataSource, setFilteredDataSource] = useState([]);
   const [list, setList] = useState([]);

   useEffect(() => {
     let mounted = true;
     getListAsync()
       .then(items => {
         if(mounted) {
            setFilteredDataSource(items);
           setList(items)
         }
       })
     return () => mounted = false;
   }, [])

   const searchFilterFunction = (text) => {
    if (text) {
      const newData = list.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
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

  const Tab = createMaterialTopTabNavigator();
    
   return (
       <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header/>
      <LinearGradient colors ={['#EBF1F5', '#EBF1F5', '#EBF1F5']} style= {{flex: 1}}>
      <View style= {{alignItems: 'center' }}>
      <Text style={{color:'#279CF5', fontWeight: 'bold', fontSize:18, paddingBottom: 12, paddingTop: 7}}><Feather name="box" size={24} color="#279CF5" /> Para ti</Text>
      <View style={{ borderColor: '#279CF5', borderBottomWidth: StyleSheet.hairlineWidth, borderWidth: 2, alignSelf: 'center', paddingHorizontal: 150/2}}/>
      <View style={{ borderBottomColor: '#D3D8DB', borderBottomWidth: StyleSheet.hairlineWidth , }}/>
      </View>
      <SearchBar round searchIcon={{ size: 24 }}
      placeholder ="Intenta buscando: Dulces"
      lightTheme = {true}
      inputStyle={{fontStyle: 'italic', backgroundColor: '#fff'}}
      containerStyle={{backgroundColor: '#fff'}}
      inputContainerStyle={{backgroundColor: '#fff'}}
      onChangeText={(text) => searchFilterFunction(text)}
      onClear={(text) => searchFilterFunction('')}
      value={search}
      ></SearchBar>
    <Tab.Navigator>
      <Tab.Screen name="MyGifts" component={Send} />
      <Tab.Screen name="Settings" component={Confirmation} />
    </Tab.Navigator>
      <Text style={{color: '#181919', textAlign: 'left', fontSize: 24, paddingTop: 9.29, paddingBottom: 9.7, marginLeft: 10.97 }}>Llegará hoy, <Text style={{fontWeight:'bold'}}>{`${getDate()}`}.</Text> </Text>
       <VirtualizedList
         data={filteredDataSource}
         initialNumToRender={4}
         renderItem={({ item }) => <Item title={item.title} />}
         keyExtractor={item => item.id}
         getItemCount={getItemCount}
         getItem={getItem}
       />
         <TouchableOpacity style={styles.floatbutton} onPress={goToSend}>
            <LinearGradient
                  start={[0, 1]}
                  end={[1, 0]}
                  colors={['#E26250', '#EECD60']}
                  style={{borderRadius: 25, padding: 4}} >
               <Text style={styles.sendText}> Manda <Ionicons name="md-send-outline" size={24} color="white" /></Text>
            </LinearGradient>
         </TouchableOpacity>
      </LinearGradient>
     </View>
   )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#EBF1F5',
     flexWrap: 'wrap'
   },
   item: {
     backgroundColor: '#ffff',
     height: 150,
     justifyContent: 'center',
     marginVertical: 12,
     marginHorizontal: 16,
     padding: 20,
   },
   title: {
     fontSize: 32,
   },
   floatbutton: {
      position: 'absolute',
      width: "80%",
      marginTop: 40,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
      flex: 1
   },
   sendText: {
      marginTop: 5,
      marginBottom: 5,
      marginStart: 50,
      marginEnd: 50,
      color:"white",
      fontSize: 20,
   }
 });
export default MyGifts