import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Selection from './Selection';
import SearchBar from './SearchBar';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, repoRefetch, onEndReach }) => {
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];


  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
      <>
      <SearchBar repoRefetch={repoRefetch}/>
      <Selection repoRefetch={repoRefetch}/>
      </>}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem repository={item} repoID={null}/>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
}

const RepositoryList = () => {
  const { repositories, refetch, fetchMore } = useRepositories({
    first: 8
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer repositories={repositories} repoRefetch={refetch} onEndReach={onEndReach}/>
  )
};

export default RepositoryList;