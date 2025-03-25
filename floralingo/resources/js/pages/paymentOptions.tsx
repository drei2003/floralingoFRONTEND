import { DataTable } from '@/components/data-table-payment';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import data from './data table/data-payment.json';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payment Options',
        href: '/paymentOptions',
    },
];

export default function PaymentOptions() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="pt-3 pl-6">
                    <Heading title="Payment Options" description="Track, manage, and update customer orders" />
                </div>

                <DataTable data={data} />
            </div>
        </AppLayout>
    );
}
