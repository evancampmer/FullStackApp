import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';
import Text from '../components/Text';

const useRepositories = () => {
    const { data, error, loading, fetchMore, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {orderBy: orderBy, orderDirection: orderDirection, searchKeyword: searchKeyword, first: first, after: after}
    })
    
    if(isLoading) {
        return <Text>Loading...</Text>
    }

    if(error) {
        return <Text>an error has occured: {error.message}</Text>
    }

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.repositories.pageInfo.endCursor,
            ...variables,
          },
        });
      };

    return {
        repositories: data ? data.repositories : undefined,
        fetchMore: handleFetchMore,
        loading,
        refetch
    };
};

export default useRepositories;