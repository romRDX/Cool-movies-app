import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const useApolloClient = () => {

    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

    const handleClient = () => {
        if(client){
            return client
        } else {
            const newClient = new ApolloClient({
                cache: new InMemoryCache(),
                uri: '/graphql',
            });

            setClient(newClient);
        }
    }

    return handleClient;
}

export default useApolloClient;