import { BarChartComponent } from '@/components/bar-chart';
import { Component as ChartAreaInteractive } from '@/components/chart-area-interactive';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payment Options',
        href: '/payment-options',
    },
];

export default function Dashboard() {
    const isMobile = useIsMobile();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className={`grid auto-rows-min gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-5'}`}>
                    <div className={`${isMobile ? '' : 'col-span-3'}`}>
                        <ChartAreaInteractive />
                    </div>
                    <div className={`${isMobile ? '' : 'col-span-2'}`}>
                        <BarChartComponent />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
