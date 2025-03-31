import { DataTable } from '@/components/data-table-flowers';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import data from './data table/data-flower.json';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flowers',
        href: '/flowers',
    },
];

export default function Flowers() {
    const processedData = data.map((item) => ({
        ...item,
        Thumbnail_url: item.Thumbnail_url || undefined,
        ProductName: item.flower_name,
        added_at: item.added_at,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="pt-3 pl-6">
                    <Heading title="Flowers" description="Explore and manage flower listings with detailed insights." />
                </div>
                <DataTable data={processedData} />
            </div>
        </AppLayout>
    );
}

