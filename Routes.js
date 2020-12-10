import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './Home.js'
import About from './About.js'
import Login from './Login.js'
import Send from './Send.js'
import Send2 from './Send2.js'
import Confirmation from './Confirmation.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "login" component = {Login} title = "" initial = {true} hideNavBar={1} />
         <Scene key = "home" component = {Home} title = "Home" type="reset" hideNavBar />
         <Scene key = "about" component = {About} title = "About" />
         <Scene key = "send" component = {Send} title = "Send"  hideNavBar />
         <Scene key = "send2" component = {Send2} title = "Send2" hideNavBar />
         <Scene key = "confirmation" component = {Confirmation} title = "Confirmation" hideNavBar type="reset" />
      </Scene>
   </Router>
)

export default Routes