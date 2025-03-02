import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import { FlatList, View, StyleSheet } from "react-native"
import Text from "./Text"
import ReviewItem from "./ReviewItem"
import useRepository from "../hooks/useRepository"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
    const { id } = useParams()
    console.log(id)
    const { data, loading, fetchMore } = useRepository({id})
    if(loading) {
        return <Text>Loading...</Text>
    }
    console.log(data)

    const reviews = data.repository.reviews
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];

    const onEndReach = () => {
      fetchMore();
    };

    
    return (
        <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <RepositoryItem repository={data.repository} repoID={id}/>}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        />
    )
}

export default Repository