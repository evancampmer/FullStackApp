import { useApolloClient, useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useReviewForm = () => {
    const [createReview, result] = useMutation(CREATE_REVIEW)
    const apolloClient = useApolloClient();

    const reviewForm = async ({ownerName, rating, repositoryName, text}) => {
            const data = await createReview({variables: {review: {ownerName, rating: Number(rating), repositoryName, text}}});
            apolloClient.resetStore();
            return data
    }
    
    return [reviewForm, result]
};

export default useReviewForm;