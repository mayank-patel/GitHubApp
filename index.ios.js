/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./app/components/main');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var Github = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        barTintColor='#283593'
        titleTextColor='#fff'
        itemWrapperStyle={styles.screen}
        style={styles.container}
        initialRoute={{
          title: 'Github',
          component: Main 
        }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  screen: {
    backgroundColor: '#3F51B5'
  },
});

AppRegistry.registerComponent('Github', () => Github);
