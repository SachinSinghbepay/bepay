
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthProvider } from '../../../components/Dashboard-IGPS/context/AuthContext';

export default async function IgpsOnboardingLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('igps_token');

    if (!token || !token.value) {
        redirect('/igps/login');
    }

    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
