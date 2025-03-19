'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import * as React from 'react';

export function ProgressChart() {
    const [timeRange, setTimeRange] = React.useState<'90d' | '30d' | '7d'>('90d');
    const isMobile = useIsMobile();

    // Simulated progress values for different time ranges
    const progressData = [
        { label: 'Bouquet 1', values: { '90d': 80, '30d': 60, '7d': 40 }, count: { '90d': '1,43,382', '30d': '95,210', '7d': '47,890' } },
        { label: 'Bouquet 2', values: { '90d': 70, '30d': 50, '7d': 30 }, count: { '90d': '98,765', '30d': '65,432', '7d': '32,100' } },
        { label: 'Bouquet 3', values: { '90d': 90, '30d': 75, '7d': 55 }, count: { '90d': '2,34,567', '30d': '1,56,789', '7d': '78,234' } },
        { label: 'Bouquet 4', values: { '90d': 65, '30d': 45, '7d': 25 }, count: { '90d': '76,432', '30d': '48,910', '7d': '20,345' } },
    ];

    return (
        <Card>
            <CardHeader className="flex flex-col items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Top Sold Items</CardTitle>
                </div>
                <Select value={timeRange} onValueChange={(value) => setTimeRange(value as '90d' | '30d' | '7d')}>
                    <SelectTrigger className="w-full rounded-lg sm:ml-auto sm:w-[160px]" aria-label="Select a time range">
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {progressData.map((item) => (
                    <div key={item.label} className="mb-6">
                        <div className={`flex ${isMobile ? 'flex-col' : 'sm:flex-row'} mb-2 justify-between text-sm font-medium`}>
                            <span>{item.label}</span>
                            <span>{item.count[timeRange]}</span>
                        </div>
                        <Progress value={item.values[timeRange]} className="h-3 sm:h-3" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
