
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthProvider } from '../../../components/Dashboard-IGPS/context/AuthContext';

export default async function IgpsDashboardLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('igps_token');
    const refresh = cookieStore.get('igps_refresh');

    // Only redirect if BOTH tokens are missing
    // or if the refresh token is missing (session truly dead)
    if ((!token || !token.value) && (!refresh || !refresh.value)) {
        redirect('/igps/login');
    }

    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
