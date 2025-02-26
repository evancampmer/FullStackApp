import { useApolloClient, useMutation } from '@apollo/client';

import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';


const useSignIn = () => {
    const [authenticate, result] = useMutation(AUTHENTICATE)
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signIn = async ({username, password}) => {
            const data = await authenticate({variables: {credentials: {username, password}}});
            await authStorage.setAccessToken(data.data.authenticate.accessToken);
            apolloClient.resetStore();
            const token = await authStorage.getAccessToken();
            console.log(token)
            return data
    }
    
    return [signIn, result]
};

export default useSignIn;