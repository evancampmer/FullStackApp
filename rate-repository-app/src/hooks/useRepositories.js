import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';
import Text from '../components/Text';

const useRepositories = () => {
    const { data, error, isLoading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    })
    
    if(isLoading) {
        return <Text>Loading...</Text>
    }

    if(error) {
        return <Text>an error has occured: {error.message}</Text>
    }

    return {
        repositories: data ? data.repositories : undefined,
        isLoading
    };
};

export default useRepositories;