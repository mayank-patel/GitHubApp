
var React = require('react-native');
var FloatingLabel = require('react-native-floating-labels')
var api = require('../models/api');
var Dashboard = require('./dashboard');

var {
  StyleSheet,
  Text,
  NavigatorIOS,
  ActivityIndicatorIOS,
  View,
  TouchableHighlight,
} = React;

var Main = React.createClass({
  getInitialState() {
    return {
      isLoading: false,
      error: false,
      username: ''
    };
  },
  handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    })
  },
  handleSubmit() {
    api.getUserInfo(this.state.username)
      .then((res) => {
        if(res.message === 'Not Found'){
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: Dashboard,
            passProps: {userInfo: res}
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      });
  },

  render() {
    var showErr = (
      this.state.error ? <Text style={styles.err}> {this.state.error} </Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
        <FloatingLabel 
            labelStyle={styles.labelInput}
            inputStyle={styles.inputField}
            onChange={this.handleChange.bind(this)}
            value={this.state.username}
            style={styles.formField}        
            onBlur={this.onBlur}
          >Enter Your GitHub UserName</FloatingLabel>
          
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#66BB6A">
          <Text style={styles.buttonText}> Search </Text>
        </TouchableHighlight>
        {showErr}        
      </View>
    );
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  formField: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 3,
    borderColor: '#EC407A',
  },
  inputField: {
    borderWidth: 0,
    color: '#fff'
  },
  labelInput: {
    color: '#fff'
  },
  title: {
    color: '#000',
    marginTop: 20,
    fontSize: 24,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#81C784',
    borderWidth: 0,
    borderRadius: 8,
    margin: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  err: {
    color: 'red', 
    fontSize: 24,
    marginLeft: 20,
    marginRight: 20
  }

});

module.exports = Main;