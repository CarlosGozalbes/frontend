import { useState, useEffect } from 'react';
import { useToken } from './useToken';
import axios from 'axios';

export const useUser = () => {
    const [token,] = useToken();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const fetchUser = async () => {
            if (!token) {
                
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
               
                const response = await axios.get(import.meta.env.VITE_API_URL +`/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setUser(response.data);
            } catch (err) {
                setError(err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    return { user, loading, error,setUser };
};
