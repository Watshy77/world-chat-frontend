// libs/auth.ts

import { useCallback, useEffect, useState } from 'react';

export type AuthUser = {
    token: string;
};

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
    }, []);

    return { user, loading, logout };
}
