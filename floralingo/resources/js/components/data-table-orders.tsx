'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleX, ClipboardList, House, Package, Truck } from 'lucide-react';

import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
    type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    CheckCircle2Icon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ColumnsIcon,
    GripVerticalIcon,
    LoaderIcon,
    MoreVerticalIcon,
} from 'lucide-react';
import * as React from 'react';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@radix-ui/react-separator';
import { useState } from 'react';
import axios from 'axios';
export const schema = z.object({
    id: z.number(),
    OrderID: z.string(),
    status: z.string(),
    TotalPrice: z.number(),
    Name: z.string(),
    orderedProducts: z.string(),
    deliveryDate: z.string(),
    deliveryTime: z.string(),
    paymentMethod: z.string(),
    shippingAdd: z.string(),
    numItems: z.number(),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({
        id,
    });

    return (
        <Button {...attributes} {...listeners} variant="ghost" size="icon" className="text-muted-foreground size-7 hover:bg-transparent">
            <GripVerticalIcon className="text-muted-foreground size-3" />
            <span className="sr-only">Drag to reorder</span>
        </Button>
    );
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
        id: 'drag',
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
        accessorKey: 'OrderID',
        header: 'OrderID',
        cell: ({ row }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <TableCellViewer item={row.original} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="space-y-1">
                            <p>
                                <div className="font-bold">Shipping address:</div> {row.original.shippingAdd}
                            </p>
                           
                            <p>
                                <div className="font-bold">Number of items </div> {row.original.numItems}
                            </p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            );
        },
        enableHiding: false,
    },
    {
        accessorKey: 'Name', // Updated to match the SelectItem value
        header: 'Name',
        cell: ({ row }) => (
            <div className="w-32">
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {row.original.Name}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: 'orderedProducts', // Updated to match the SelectItem value
        header: 'Ordered Products',
        cell: ({ row }) => (
            <div className="max-w-xs break-words">
                <Badge variant="outline" className="text-muted-foreground px-1.5 whitespace-normal break-words">
                    {row.original.orderedProducts}
                </Badge>
            </div>

        ),
    },
    {
        accessorKey: 'shippingAdd', // Updated to match the SelectItem value
        header: 'Shipping Address',
        cell: ({ row }) => (
            <div className="max-w-xs break-words">
                <Badge variant="outline" className="text-muted-foreground px-1.5 whitespace-normal break-words">
                    {row.original.shippingAdd}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: 'numItems', // Updated to match the SelectItem value
        header: 'Items',
        cell: ({ row }) => {
            return <div>{row.original.numItems}</div>;
        }
    },
    {
        accessorKey: 'paymentMethod', // Updated to match the SelectItem value
        header: 'Payment Method',
        cell: ({ row }) => (
            <div className="w-32">
                <Badge variant="secondary" className="text-muted-foreground px-1.5">
                    {row.original.paymentMethod}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <Badge variant="outline" className="text-muted-foreground flex gap-1 px-1.5 [&_svg]:size-3">
                {row.original.status === 'Done' ? (
                    <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
                ) : row.original.status === 'Cancelled' ? (
                    <CircleX className="text-red-500 dark:text-red-400" />
                ) : row.original.status === 'Pending' ? (
                    <ClipboardList className="text-blue-500 dark:text-blue-400" />
                ) : row.original.status === 'Packed' ? (
                    <Package className="text-yellow-500 dark:text-yellow-400" />
                ) : row.original.status === 'Cancelled' ? (
                    <Truck className="text-orange-500 dark:text-orange-400" />
                ) : row.original.status === 'Delivered' ? (
                    <House className="text-green-500 dark:text-green-400" />
                ) : (
                    <LoaderIcon />
                )}
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: 'TotalPrice',
        header: 'Total Price',
        cell: ({ row }) => <div className="text-left">{row.original.TotalPrice}</div>,
    },

    {
        accessorKey: 'deliveryDate', // Updated to match the SelectItem value
        header: 'Delivery Date',
        cell: ({ row }) => {
            const date = new Date(row.original.deliveryDate);
            const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

            return <div>{formattedDate}</div>;
        },
        },
        {
        accessorKey: 'deliveryTime', // Updated to match the SelectItem value
        header: 'Delivery Time',
        cell: ({ row }) => {
            const time = new Date(`1970-01-01T${row.original.deliveryTime}`);
            const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            return <div>{formattedTime}</div>;
        },
        },

    //     {
    //     id: 'actions',
    //     cell: ({ row }) => (
    //         <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //                 <Button variant="ghost" className="text-muted-foreground data-[state=open]:bg-muted flex size-8" size="icon">
    //                     <MoreVerticalIcon />
    //                     <span className="sr-only">Open menu</span>
    //                 </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent align="end" className="w-32">
    //                 <DropdownMenuItem>Delete</DropdownMenuItem>
    //             </DropdownMenuContent>
    //         </DropdownMenu>
    //     ),
    // },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    });

    return (
        <TableRow
            data-state={row.getIsSelected() && 'selected'}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
        </TableRow>
    );
}

export function DataTable({ data: initialData }: { data: z.infer<typeof schema>[] }) {
    const [data, setData] = React.useState(() => initialData);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const sortableId = React.useId();
    const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

    const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id);
                const newIndex = dataIds.indexOf(over.id);
                return arrayMove(data, oldIndex, newIndex);
            });
        }
    }
    const [searchColumn, setSearchColumn] = React.useState('OrderID');

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setColumnFilters([{ id: searchColumn, value }]);
    }

    return (
        <Tabs defaultValue="outline" className="flex w-full flex-col justify-start gap-6">
            <div className="flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-2">
                    <Select value={searchColumn} onValueChange={(value) => setSearchColumn(value)}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Search Column" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="OrderID">Order ID</SelectItem>
                            <SelectItem value="Name">Name</SelectItem>
                            <SelectItem value="orderedProducts">Products Ordered</SelectItem>
                            <SelectItem value="paymentMethod">Payment Method</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                            <SelectItem value="deliveryDate">Delivery Date</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input type="text" placeholder={`Search by ${searchColumn}`} onChange={handleSearch} className="w-64" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <ColumnsIcon />
                                <span className="hidden lg:inline">Customize Columns</span>
                                <span className="lg:hidden">Columns</span>
                                <ChevronDownIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                <div className="overflow-hidden rounded-lg border">
                    <DndContext
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                        id={sortableId}
                    >
                        <Table>
                            <TableHeader className="bg-muted sticky top-0 z-10">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody className="**:data-[slot=table-cell]:first:w-8">
                                {table.getRowModel().rows?.length ? (
                                    <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                                        {table.getRowModel().rows.map((row) => (
                                            <DraggableRow key={row.id} row={row} />
                                        ))}
                                    </SortableContext>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </DndContext>
                </div>
                <div className="flex items-center justify-between px-4">
                    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex"></div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label htmlFor="rows-per-page" className="text-sm font-medium">
                                Rows per page
                            </Label>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="w-20" id="rows-per-page">
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to first page</span>
                                <ChevronsLeftIcon />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeftIcon />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRightIcon />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden size-8 lg:flex"
                                size="icon"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <ChevronsRightIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="past-performance" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
                    <div className="flex h-full items-center justify-center">
                        <p className="text-muted-foreground">No data available</p>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
                    <div className="flex h-full items-center justify-center">
                        <p className="text-muted-foreground">No data available</p>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
                    <div className="flex h-full items-center justify-center">
                        <p className="text-muted-foreground">No data available</p>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
}

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
    // State to manage the status
    const [status, setStatus] = useState(item.status);

    // Handle status change
    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
    };

    // Handle status update submission
    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/orders/${item.OrderID}`, {
                status: status,
            });

            alert(response.data.message);
            window.location.reload(); // Reload to see the updated status
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status.');
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.OrderID}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-3">
                <SheetHeader>
                    <SheetTitle>Edit Order Status</SheetTitle>
                    <SheetDescription>Make changes here..</SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-7 py-4 text-sm">
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="header">Order ID</Label>
                            <div id="header">{item.OrderID}</div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="Name">Name</Label>
                                <div>{item.Name}</div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="orderedProducts">Products Ordered</Label>
                                <div className="max-w-xs break-words">{item.orderedProducts}</div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="Payment method">Payment method</Label>
                                <div>{item.paymentMethod}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="Status">Status</Label>
                                <Select value={status} onValueChange={handleStatusChange}>
                                    <SelectTrigger id="Status" className="w-full">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Packed">Packed</SelectItem>
                                        <SelectItem value="Delivered">Delivered</SelectItem>
                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="TotalPrice">Total Price</Label>
                                <div>{item.TotalPrice}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="deliveryDate">Delivery Date</Label>
                            <div>{item.deliveryDate}</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="deliveryTime">Delivery Time</Label>
                            <div>{item.deliveryTime}</div>
                        </div>
                    </form>
                </div>
                <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                    <Button className="w-full" onClick={handleSubmit}>Submit</Button>
                    <SheetClose asChild>
                        <Button variant="outline" className="w-full">Done</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default TableCellViewer;