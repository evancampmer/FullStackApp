import { useApolloClient, useMutation } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations';


const useSignUp = () => {
    const [sign, result] = useMutation(CREATE_USER)
    const apolloClient = useApolloClient();

    const signUp = async ({username, password}) => {
            const data = await sign({variables: {user: {username, password}}});
            apolloClient.resetStore();
            return data
    }
    
    return [signUp, result]
};

export default useSignUp;