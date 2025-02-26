import { StyleSheet, View, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 100
    },
    containerStats: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 50
      },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    tab: {
        flexGrow: 0,
        color: "white",
        justifyContent: "space-around",
        paddingTop: 5,
        paddingLeft: 15
    },
    languageLogo: {
        height: 30,
        backgroundColor: theme.colors.primary,
        flexShrink: 1,
        padding: 5,
        borderRadius: 10
    },
    tabStats: {
        flexGrow: 1,
        color: 'white',
        justifyContent: 'space-around',
        paddingTop:5,
        paddingLeft: 15
    }
})
const numberModifier = (number) => {
    if (number > 999) {
        return (`${Math.round(number / 100) / 10}k`)
    }
    return `${number}`
}
const Stats = ({name, number}) => {
    return (
        <View style={styles.tabStats}>
            <Text fontWeight='bold'>{numberModifier(number)}</Text>
            <Text>{name}</Text>
        </View>
    )
}
const RepositoryItem = ({repository}) => {
    return (
        <View style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
                <View style={styles.tab}>
                    <Image style={styles.tinyLogo} src={repository.ownerAvatarUrl} />
                </View>
                <View style={styles.tab}>
                    <Text fontWeight="bold" fontSize="subheading">{repository.fullName}</Text>
                    <Text>{repository.description}</Text>
                    <Text color='white' fontWeight='bold' style={styles.languageLogo}>{repository.language}</Text>
                </View>
            </View>
            <View style={styles.containerStats}>
                <Stats number={repository.stargazersCount} name={'stars'}/>
                <Stats number={repository.forksCount} name={'forks'}/>
                <Stats number={repository.ratingAverage} name={'rating'}/>
                <Stats number={repository.reviewCount} name={'reviews'}/>
            </View>
        </View> 
    )
}

export default RepositoryItem;