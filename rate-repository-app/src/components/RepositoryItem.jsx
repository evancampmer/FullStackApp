import { StyleSheet, View, Image, Pressable, Linking } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

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
const Stats = ({name, number, testID}) => {
    return (
        <View testID={testID} style={styles.tabStats}>
            <Text fontWeight='bold'>{numberModifier(number)}</Text>
            <Text>{name}</Text>
        </View>
    )
}
const RepositoryItem = ({repository, repoID}) => {
    const navigate = useNavigate();
    return (
        <View testID="repositoryItem" style={{backgroundColor: 'white'}}>
            <Pressable onPress={() => {!repoID && navigate(`/repository/${repository.id}`)}}>
                <View style={styles.container}>
                    <View style={styles.tab}>
                        <Image testID="logo" style={styles.tinyLogo} src={repository.ownerAvatarUrl} />
                    </View>
                    <View style={styles.tab}>
                        <Text testID="fullName" fontWeight="bold" fontSize="subheading">{repository.fullName} </Text>
                        <Text testID="description">{repository.description}</Text>
                        <Text testID="language" color='white' fontWeight='bold' style={styles.languageLogo}>{repository.language}</Text>
                    </View>
                </View>
                <View style={styles.containerStats}>
                    <Stats testID="stars" number={repository.stargazersCount} name={'stars'}/>
                    <Stats testID="forks" number={repository.forksCount} name={'forks'}/>
                    <Stats testID="rating" number={repository.ratingAverage} name={'rating'}/>
                    <Stats testID="review" number={repository.reviewCount} name={'reviews'}/>
                </View>
                {repoID &&  (<Pressable onPress={() => Linking.openURL(repository.url)}>
                                <Text style={styles.languageLogo}>Open in GitHub</Text>
                            </Pressable>)}
            </Pressable>
        </View> 
    )
}

export default RepositoryItem;