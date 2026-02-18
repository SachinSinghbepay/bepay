
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function IgpsEntryPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('igps_token');

    if (token && token.value) {
        redirect('/igps/dashboard');
    } else {
        redirect('/igps/login');
    }
}
