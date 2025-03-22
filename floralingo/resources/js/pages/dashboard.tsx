import { BarChartComponent } from '@/components/bar-chart';
import { Component as ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table-orders';
import { SectionCards } from '@/components/section-cards';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import data from './data table/data-orders.json';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const isMobile = useIsMobile();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <SectionCards />
                <div className={`grid auto-rows-min gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-5'}`}>
                    <div className={`${isMobile ? '' : 'col-span-3'}`}>
                        <ChartAreaInteractive />
                    </div>
                    <div className={`${isMobile ? '' : 'col-span-2'}`}>
                        <BarChartComponent />
                    </div>
                </div>
                <DataTable data={data} />
            </div>
        </AppLayout>
    );
}
