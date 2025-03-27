import { DataTable } from '@/components/data-table-products';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import data from './data table/data-products.json';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Products() {
    const processedData = data.map((item) => ({
        ...item,
        Thumbnail_url: item.Thumbnail_url || undefined,
    }));
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="pt-3 pl-6">
                    <Heading title="Products" description="Manage and track all product listings." />
                </div>
                <DataTable data={processedData} />
            </div>
        </AppLayout>
    );
}
