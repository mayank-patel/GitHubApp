
var React = require('react-native');
var api = require('../models/api');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} = React;

var Dashboard = React.createClass({
  getInitialState() {
    api.getRepos(this.props.userInfo.login).then((repos)=>this.setState({
      repos: repos
    }));

    return {
      repos: [ 
      ]
    };
  },

  _renderRepo(repo) {
    return (
      <View style={styles.listItem}>
        <Text style={styles.title}>{repo.name}</Text>
      </View>
    );
  },

  render() {
    var list = this.state.repos.map((repo)=>this._renderRepo(repo));

    return (
      <View style={styles.mainContainer}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
        
        <ScrollView 
        style={styles.list}
          showsVerticalScrollIndicator='false'
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'flex-start'
          }}
        >

        {list}
      </ScrollView>
      </View>
    );
  }
})

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'flex-start'
  },
  image: {
     height: 175,
     width: 175,
     alignSelf: 'center',
     borderRadius: 87,
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  listItem: {
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#fff',
    borderBottomWidth: 1
  },
  list: {
    flex: 1,
    marginTop: 0,
    flexDirection: 'column',
  }

});

module.exports = Dashboard;