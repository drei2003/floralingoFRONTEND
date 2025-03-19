import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SectionCards() {
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <Card className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CardHeader className="relative">
                    <CardDescription>Total Orders</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">₱12,426</CardTitle>
                    <div className="absolute top-4 right-4 pt-4">
                        <Badge className="flex gap-1 rounded-lg bg-green-500/10 text-xs">
                            <TrendingUpIcon className="size-3 stroke-green-500" />
                            <p className="text-green-500">+36%</p>
                        </Badge>
                    </div>
                </CardHeader>
            </Card>
            <Card className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CardHeader className="relative">
                    <CardDescription>Total Cancelled Orders</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">₱2,890</CardTitle>
                    <div className="absolute top-4 right-4 pt-4">
                        <Badge className="flex gap-1 rounded-lg bg-red-500/10 text-xs">
                            <TrendingDownIcon className="size-3 stroke-red-500" />
                            <p className="text-red-500">-20%</p>
                        </Badge>
                    </div>
                </CardHeader>
            </Card>
            <Card className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CardHeader className="relative">
                    <CardDescription>Total Pending Orderss</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">45,678</CardTitle>
                    <div className="absolute top-4 right-4 pt-4">
                        <Badge className="flex gap-1 rounded-lg bg-green-500/10 text-xs">
                            <TrendingUpIcon className="size-3 stroke-green-500" />
                            <p className="text-green-500">+12.5%</p>
                        </Badge>
                    </div>
                </CardHeader>
            </Card>
            <Card className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CardHeader className="relative">
                    <CardDescription>Total Orders</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">33,493</CardTitle>
                    <div className="absolute top-4 right-4 pt-4">
                        <Badge className="flex gap-1 rounded-lg bg-green-500/10 text-xs">
                            <TrendingUpIcon className="size-3 stroke-green-600" />
                            <p className="text-green-500">+36%</p>
                        </Badge>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
