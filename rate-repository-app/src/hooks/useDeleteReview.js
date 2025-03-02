import { useApolloClient, useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/mutations';


const useDeleteReview = () => {
    const [deleteReview, result] = useMutation(DELETE_REVIEW)
    const apolloClient = useApolloClient();

    const reviewDelete = async ({id}) => {
            const data = await deleteReview({variables: {id: id}});
            apolloClient.resetStore();
            return data
    }
    
    return [reviewDelete, result]
};

export default useDeleteReview;