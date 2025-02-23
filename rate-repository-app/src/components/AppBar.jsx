import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import RepositoryList from './RepositoryList';
import Text from './Text';
import theme from '../theme';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    color: 'white',
  },
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal flexDirection="row">
      <Link to="/">
          <Text style={styles.container}>Repositories</Text>
      </Link>
      <Link to="/signin">
          <Text style={styles.container}>Sign in</Text>
      </Link>
    </ScrollView>
  </View>
  )
};

export default AppBar;