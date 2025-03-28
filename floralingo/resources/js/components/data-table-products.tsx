'use client';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
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
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ColumnsIcon,
    GripVerticalIcon,
    MoreVerticalIcon,
    PlusIcon,
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

export const schema = z.object({
    id: z.number(),
    ProductID: z.number(),
    Price: z.number(),
    ProductName: z.string(),
    Added_at: z.string(),
    Description: z.string(),
    Thumbnail_url: z.string().url().optional(),
    Availability: z.boolean().default(true),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({ id });
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
        accessorKey: 'thumbnail',
        header: 'Thumbnail',
        cell: ({ row }) => (
            <div>
                {row.original.Thumbnail_url ? (
                    <img src={row.original.Thumbnail_url} alt="Product thumbnail" className="h-16 w-16 rounded-md object-cover" />
                ) : (
                    <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-md">No image</div>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'ProductID',
        header: 'ProductID',
        cell: ({ row }) => {
            return <TableCellViewer item={row.original} />;
        },
        enableHiding: false,
    },
    {
        accessorKey: 'ProductName',
        header: 'Product Name',
        cell: ({ row }) => (
            <div className="w-32">
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {row.original.ProductName}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: 'Description',
        header: 'Description',
        cell: ({ row }) => <div className="w-35 break-words whitespace-normal">{row.original.Description}</div>,
    },
    {
        accessorKey: 'Price',
        header: 'Price',
        cell: ({ row }) => <div className="text-left">{row.original.Price}</div>,
    },
    {
        accessorKey: 'Added_at',
        header: 'Added_at',
        cell: ({ row }) => {
            const date = new Date(row.original.Added_at);
            const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            return <div>{formattedDate}</div>;
        },
    },
    {
        accessorKey: 'Availability',
        header: 'Availability',
        cell: ({ row }) => {
            const [isAvailable, setIsAvailable] = React.useState(row.original.Availability);
            const handleAvailabilityChange = (checked: boolean) => {
                setIsAvailable(checked);
                try {
                    row.original.Availability = checked;
                    console.log('Availability changed:', checked);
                } catch (error) {
                    setIsAvailable(!checked);
                    console.error('Error updating availability:', error);
                }
            };
            return (
                <div className="flex items-center justify-center">
                    <Switch
                        checked={isAvailable}
                        onCheckedChange={handleAvailabilityChange}
                        aria-label="Toggle availability"
                        className={cn('data-[state=checked]:bg-green-500', 'data-[state=unchecked]:bg-red-500')}
                    />
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-muted-foreground data-[state=open]:bg-muted flex size-8" size="icon">
                        <MoreVerticalIcon />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({ id: row.original.id });
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
    const [addDialogOpen, setAddDialogOpen] = React.useState(false); // state for the add product dialog
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

    const [searchColumn, setSearchColumn] = React.useState('ProductID');
    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setColumnFilters([{ id: searchColumn, value }]);
    }

    // Function to call when submitting a new product
    function handleAddProduct(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Retrieve form values and process new product creation logic here
        console.log('Submitting new product');
        // After processing, close the dialog.
        setAddDialogOpen(false);
    }

    return (
        <>
            <Tabs defaultValue="outline" className="flex w-full flex-col justify-start gap-6">
                <div className="flex items-center justify-between px-4 lg:px-6">
                    <Label htmlFor="view-selector" className="sr-only">
                        View
                    </Label>
                    <div className="flex items-center gap-2">
                        <Select value={searchColumn} onValueChange={(value) => setSearchColumn(value)}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Search Column" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ProductID">Product ID</SelectItem>
                                <SelectItem value="ProductName">Product Name</SelectItem>
                                <SelectItem value="Price">Price</SelectItem>
                                <SelectItem value="Added_at">Added_at</SelectItem>
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
                    <div>
                        <Button variant="outline" size="sm" onClick={() => setAddDialogOpen(true)}>
                            <PlusIcon />
                            <span className="hidden lg:inline">Add New Product</span>
                            <span className="lg:hidden">Add</span>
                        </Button>
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
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(header.column.columnDef.header, header.getContext())}
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

            {/* Add New Product Dialog using Dialog */}
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>Enter the details for your new product.</DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-4" onSubmit={handleAddProduct}>
                        <div>
                            <Label htmlFor="newProductThumbnail">Thumbnail</Label>
                            <Input id="newProductThumbnail" type="file" />
                        </div>
                        <div>
                            <Label htmlFor="newProductName">Product Name</Label>
                            <Input id="newProductName" placeholder="Product Name" required />
                        </div>
                        <div>
                            <Label htmlFor="newProductDescription">Description</Label>
                            <Input id="newProductDescription" placeholder="Description" />
                        </div>
                        <div>
                            <Label htmlFor="newProductPrice">Price</Label>
                            <Input id="newProductPrice" type="number" placeholder="Price" required />
                        </div>
                        <div>
                            <Label htmlFor="newProductDate">Date Created</Label>
                            <Input id="newProductDate" type="date" required />
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="newProductAvailability">Availability</Label>
                            <Switch id="newProductAvailability" defaultChecked />
                        </div>

                        {/* Add additional fields as needed */}
                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
    const isMobile = useIsMobile();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.ProductID}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-3">
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>Make changes here.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-7 py-4 text-sm">
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="header">Product ID</Label>
                            <div id="header">{item.ProductID}</div>
                            <Separator />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="ProductName">Product Name</Label>
                                <Input
                                    id="ProductName"
                                    className="w-full"
                                    defaultValue={item.ProductName}
                                    onChange={(e) => {
                                        item.ProductName = e.target.value;
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="ProductDescription">Description</Label>
                                <p className="w-full rounded-md border px-3 py-2 text-sm">{item.Description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="TotalPrice">TotalPrice</Label>
                                <Input id="TotalPrice" defaultValue={item.Price} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="dateCreated">Date Created</Label>
                            <Input
                                id="dateCreated"
                                type="date"
                                defaultValue={item.Added_at}
                                onChange={(e) => {
                                    item.Added_at = e.target.value;
                                }}
                            />
                        </div>
                    </form>
                </div>
                <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                    <Button className="w-full">Submit</Button>
                    <SheetClose asChild>
                        <Button variant="outline" className="w-full">
                            Done
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
