import { useIsMobile } from '@/hooks/use-mobile';
import AppLayoutHeader from '@/layouts/app-layout-header';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Landing Page',
        href: '/landingPage',
    },
];

export default function LandingPage() {
    const isMobile = useIsMobile();

    return (
        <AppLayoutHeader breadcrumbs={breadcrumbs}>
            <Head title="landingPage" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"></div>
        </AppLayoutHeader>
    );
}
