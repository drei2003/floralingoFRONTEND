import { DataTable } from '@/components/data-table-category';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import data from './data table/data-category.json';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

export default function Category() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="pt-3 pl-6">
                    <Heading title="Category" description="Organize and manage product categories efficiently." />
                </div>

                <DataTable data={data} />
            </div>
        </AppLayout>
    );
}
