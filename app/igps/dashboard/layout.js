import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function IgpsDashboardLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('igps_token');
    const refresh = cookieStore.get('igps_refresh');

    if ((!token || !token.value) && (!refresh || !refresh.value)) {
        redirect('/igps/login');
    }

    return <>{children}</>;
}
