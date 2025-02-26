import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import RepositoryList from './RepositoryList';
import Text from './Text';
import theme from '../theme';
import SignIn from './SignIn';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data, loading } = useQuery(ME)

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/"); 
  }

  if(loading) {
    return <Text>Loading</Text>
  }

  return (
  <View style={styles.container}>
    <ScrollView horizontal flexDirection="row">
      <Link to="/">
          <Text style={styles.container}>Repositories</Text>
      </Link>
      {data?.me === null && <Link to="/signin">
          <Text style={styles.container}>Sign in</Text>
      </Link>}
      {data?.me && <Pressable onPress={signOut}>
        <Text style={styles.container}>Sign out</Text>
        </Pressable>
      }
    </ScrollView>
  </View>
  )
};

export default AppBar;