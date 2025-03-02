import Text from "./Text";
import { StyleSheet, View } from "react-native";
import { format } from 'date-fns';

const ReviewItem = ({review}) => {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            height: 100,
            backgroundColor: "white"
        },
        ratingContainer: {
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 0,
            width: 28,
            height: 28,
            borderRadius: 14,
            border: "2px solid blue"
        },
        column: {
            flexGrow: 0,
            color: "white",
            justifyContent: "space-around",
            paddingTop: 5,
            paddingLeft: 15
        }
    })
    
    const dateFormatter = (date) => {
        return (format(new Date(date), "dd.MM.yy"))
    }

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={styles.ratingContainer}>
                    <Text color="primary" justifyContent="center">{review.rating}</Text>
                </View>
            </View>
            <View style={styles.column}>
                <Text fontWeight="bold">{review.user.username}</Text>
                <Text>{dateFormatter(review.createdAt)}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
}
export default ReviewItem