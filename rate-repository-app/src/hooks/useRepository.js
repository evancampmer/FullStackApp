import { useQuery } from '@apollo/client';

import { REPOSITORY } from '../graphql/queries';
import Text from '../components/Text';

const useRepository = ({ id }) => {
    const { data, error, loading, fetchMore, refetch } = useQuery(REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: {repositoryId: id, after: after, first: first}
    })
    
    if(loading) {
        return <Text>Loading...</Text>
    }

    if(error) {
        return <Text>an error has occured: {error.message}</Text>
    }

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.repository.reviews.pageInfo.endCursor,
            ...variables,
          },
        });
      };

    return {
        repository: data ? data.repository : undefined,
        fetchMore: handleFetchMore,
        loading,
        refetch
    };
};

export default useRepository;