'use client';

import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chartData = {
    '90d': [
        { browser: 'Bouquet1', soldItems: 275, fill: 'var(--color-Bouquet1)' },
        { browser: 'Bouquet2', soldItems: 200, fill: 'var(--color-Bouquet2)' },
        { browser: 'Bouquet3', soldItems: 187, fill: 'var(--color-Bouquet3)' },
        { browser: 'Bouquet4', soldItems: 173, fill: 'var(--color-Bouquet4)' },
        { browser: 'Bouquet5', soldItems: 90, fill: 'var(--color-Bouquet5)' },
    ],
    '30d': [
        { browser: 'Bouquet1', soldItems: 150, fill: 'var(--color-Bouquet1)' },
        { browser: 'Bouquet2', soldItems: 120, fill: 'var(--color-Bouquet2)' },
        { browser: 'Bouquet3', soldItems: 100, fill: 'var(--color-Bouquet3)' },
        { browser: 'Bouquet4', soldItems: 80, fill: 'var(--color-Bouquet4)' },
        { browser: 'Bouquet5', soldItems: 50, fill: 'var(--color-Bouquet5)' },
    ],
    '7d': [
        { browser: 'Bouquet1', soldItems: 50, fill: 'var(--color-Bouquet1)' },
        { browser: 'Bouquet2', soldItems: 40, fill: 'var(--color-Bouquet2)' },
        { browser: 'Bouquet3', soldItems: 30, fill: 'var(--color-Bouquet3)' },
        { browser: 'Bouquet4', soldItems: 20, fill: 'var(--color-Bouquet4)' },
        { browser: 'Bouquet5', soldItems: 10, fill: 'var(--color-Bouquet5)' },
    ],
};

const chartConfig = {
    SoldItems: {
        label: 'Sold Items',
    },
    Bouquet1: {
        label: 'Bouq. 1',
        color: 'hsl(var(--chart-1))',
    },
    Bouquet2: {
        label: 'Bouq. 2',
        color: 'hsl(var(--chart-2))',
    },
    Bouquet3: {
        label: 'Bouq. 3',
        color: 'hsl(var(--chart-3))',
    },
    Bouquet4: {
        label: 'Bouq. 4',
        color: 'hsl(var(--chart-4))',
    },
    Bouquet5: {
        label: 'Bouq. 5',
        color: 'hsl(var(--chart-5))',
    },
} satisfies ChartConfig;

export function BarChartComponent() {
    const [timeRange, setTimeRange] = useState<'90d' | '30d' | '7d'>('90d');

    return (
        //for responsive desktop container
        <Card className="mx-auto w-full sm:w-4/4 lg:w-2/2">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Top Sold Items</CardTitle>
                    <CardDescription>Showing total sold items for the last 3 months</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={(value) => setTimeRange(value as '90d' | '30d' | '7d')}>
                    <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
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

            <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[265px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            accessibilityLayer
                            data={chartData[timeRange]}
                            layout="vertical"
                            margin={{
                                left: 4,
                            }}
                        >
                            <YAxis
                                dataKey="browser"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label || value}
                            />
                            <XAxis dataKey="soldItems" type="number" hide />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel label="Sold Items" />} />
                            <Bar dataKey="soldItems" layout="vertical" radius={5} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
