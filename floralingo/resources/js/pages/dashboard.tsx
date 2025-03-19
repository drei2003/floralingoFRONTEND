import CardStat1 from '@/components/CardSat1';
import CardStat2 from '@/components/cardSat2';
import CardStat3 from '@/components/cardStat3';
import CardStat4 from '@/components/cardStat4';

import { Component as ChartAreaInteractive } from '@/components/chart-area-interactive';
import { ProgressChart } from '@/components/progresschart';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <CardStat1 />

                    <CardStat2 />

                    <CardStat3 />

                    <CardStat4 />
                </div>
                <div className={`grid auto-rows-min gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-5'}`}>
                    <div className={`${isMobile ? '' : 'col-span-3'}`}>
                        <ChartAreaInteractive />
                    </div>
                    <div className={`${isMobile ? '' : 'col-span-2'}`}>
                        <ProgressChart />
                    </div>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
