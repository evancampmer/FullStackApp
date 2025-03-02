import { useQuery } from "@apollo/client"
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import useDeleteReview from "../hooks/useDeleteReview";
import { ME } from "../graphql/queries";
import Text from "./Text";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Reviews = () => {
    const { data, loading } = useQuery(ME,
        {variables: {includeReviews: true}}
    )
    if(loading) {
        return <Text>Loading...</Text>
    }
    console.log(data)
    const reviews = data.me.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

    const ReviewItemActions = ({review}) => {
        const [deleteReview] = useDeleteReview()
        const navigate = useNavigate()
        const reviewId = review.id;

        const deleteAlert = () =>
            Alert.alert(
                "Delete review",
                "Are you sure you want to delete this review?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        type: "cancel"
                    },
                    { text: "OK", onPress: () => deleteReview({reviewId})}
                ]
            )
        return (
            <>
            <ReviewItem review={review} />
            <Pressable onPress={() => navigate(`/repository/${review.repository.id}`)}>
                <Text>show repository</Text>
            </Pressable>
            <Pressable onPress={() => deleteAlert()}>
                <Text>Delete review</Text>
            </Pressable>
            </>
        )
    }
    return (
        <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItemActions review={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparator}
        />
    )

}

export default Reviews