import { Picker } from "@react-native-picker/picker"
import { useState } from "react";
import { StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e4e8",
    height: 20
    
  },
});

const Selection = ({repoRefetch}) => {
      const [order, setOrder] = useState("CREATED_AT");
      if (order === "CREATED_AT") {
        repoRefetch({ orderBy: "CREATED_AT", orderDirection: "DESC"})
      }
      if (order === "RATING_AVERAGE DESC") {
        repoRefetch({ orderBy: "RATING_AVERAGE", orderDirection: "DESC"})
      }
      if (order === "RATING_AVERAGE ASC") {
        repoRefetch({ orderBy: "RATING_AVERAGE", orderDirection: "ASC"})

      }
    return (
        <View style={styles.container}>
            <Picker
            selectedValue={order}
            onValueChange={(itemValue, itemIndex) =>
            setOrder(itemValue)
            }>
            <Picker.Item label="Latest repositories" value="CREATED_AT" />
            <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE DESC" />
            <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE ASC" />
            </Picker>
        </View>
    )
}
export default Selection;