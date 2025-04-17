import { DataTable } from '@/components/data-table-orders';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import rawData from './data table/user_orders.json';

const data = rawData.map(order => ({
    ...order,
    TotalPrice: parseFloat(order.TotalPrice),
}));
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/orders',
    },
];

export default function Orders() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="pt-3 pl-6">
                    <Heading title="Orders" description="Track, manage, and update customer orders" />
                </div>

                <DataTable data={data} />
            </div>
        </AppLayout>
    );
}
