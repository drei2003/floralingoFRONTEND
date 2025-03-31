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
    Loader as LoaderIcon,
    CheckCircle2Icon,
} from 'lucide-react';
import * as React from 'react';
import { JSX } from 'react';
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
import { CircleX } from 'lucide-react';
import { useState } from "react";
import axios from "axios";
import { router } from '@inertiajs/react';  
import { useEffect } from "react";
import { GiftIcon } from 'lucide-react';
import { CakeIcon } from 'lucide-react';
import { Flower2Icon } from 'lucide-react';
import { StarIcon } from 'lucide-react';


export const schema = z.object({
    id: z.number(),
    ProductID: z.number(),
    Price: z.number(),
    ProductName: z.string(),
    Added_at: z.string(),
    Description: z.string(),
    Thumbnail_url: z.string().url().optional(),
    Availability: z.string(),
    Category: z.string()
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

function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this category?")) return;

    axios
        .delete(`http://localhost:8000/products/${id}`)
        .then((response) => {
            alert(response.data.message);
            window.location.reload(); // Refresh page after deletion
        })
        .catch((error) => {
            console.error("Error deleting this Product:", error);
            alert("Failed to delete this Product.");
        });
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
        cell: ({ row }) => <div className="text-left">₱{row.original.Price}</div>,
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
        cell: ({ row }) => (
            <Badge variant="outline" className="text-muted-foreground flex gap-1 px-1.5 [&_svg]:size-3">
                {row.original.Availability === 'Available' ? (
                    <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
                ) : row.original.Availability === 'Unavailable' ? (
                    <CircleX className="text-red-500 dark:text-red-400" />
                ) : (
                    <LoaderIcon />
                )}
                {row.original.Availability}
            </Badge>
        ),
    },
    {
        accessorKey: 'Category',
        header: 'Category',
        cell: ({ row }) => {
            const categoryIcons: Record<string, JSX.Element> = {
                'New Arrival': <CheckCircle2Icon className="text-green-500 dark:text-green-400" />,
                'Unavailable': <CircleX className="text-red-500 dark:text-red-400" />,
                'Best Sellers': <StarIcon className="text-yellow-500 dark:text-yellow-400" />,
                'Bundle': <GiftIcon className="text-purple-500 dark:text-purple-400" />,
                'Birthday': <CakeIcon className="text-pink-500 dark:text-pink-400" />,
                'Floral Tributes': <Flower2Icon className="text-blue-500 dark:text-blue-400" />,
            };
    
            const category = row.original.Category as keyof typeof categoryIcons;
    
            return (
                <Badge variant="outline" className="text-muted-foreground flex gap-1 px-1.5 [&_svg]:size-3">
                    {categoryIcons[category] || <LoaderIcon />}
                    {category}
                </Badge>
            );
        },
    },
    
    
    
    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-muted-foreground flex size-8" size="icon">
                        <MoreVerticalIcon />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                        Delete
                    </DropdownMenuItem>
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

    function handleAddProduct(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // Append a unique product ID
        formData.append('ProductID', Math.floor(Math.random() * 100000).toString());
        console.log('Submitting new Product:', formData);
    
        // Send data (including the image) to Laravel backend
        router.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Required for file uploads
            },
            onSuccess: () => {
                console.log('Product added successfully');
                setAddDialogOpen(false);
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Error adding new product:', errors);
            },
        });
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
                            <Input id="newProductThumbnail" name="Thumbnail_url" type="file" accept="image/*" required />
                        </div>
                        <div>
                            <Label htmlFor="newProductName">Product Name</Label>
                            <Input id="newProductName" name="ProductName" placeholder="Product Name" required />
                        </div>
                        <div>
                            <Label htmlFor="newProductDescription">Description</Label>
                            <Input id="newProductDescription" name="Description" placeholder="Description" required />
                        </div>
                        <div>
                            <Label htmlFor="newProductPrice">Price</Label>
                            <Input id="newProductPrice" name="Price" type="number" placeholder="Price" required />
                        </div>
                        <div>
                            <Label htmlFor="newProductDate">Date Created</Label>
                            <Input id="newProductDate" name="Added_at" type="date" required />
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="Availability">Availability</Label>
                            <Select name="Availability" defaultValue="Available">
                                <SelectTrigger id="Availability" className="w-full">
                                    <SelectValue placeholder="Select Availability" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Available">Available</SelectItem>
                                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="Category">Product Category</Label>
                            <Select name="Category" defaultValue="New Arrival">
                                <SelectTrigger id="Category" className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Best Sellers">Best Sellers</SelectItem>
                                    <SelectItem value="New Arrival">New Arrival</SelectItem>
                                    <SelectItem value="Bundle">Bundle</SelectItem>
                                    <SelectItem value="Birthday">Birthday</SelectItem>
                                    <SelectItem value="Floral Tributes">Floral Tributes</SelectItem>
                                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
    const [productName, setProductName] = useState(item.ProductName);
    const [description, setDescription] = useState(item.Description);
    const [price, setPrice] = useState(item.Price);
    const [addedAt, setAddedAt] = useState(item.Added_at);
    const [availability, setAvailability] = useState(item.Availability);
    const [category, setCategory] = useState(item.Category);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/products/${item.id}`, {
                ProductName: productName,
                Description: description,
                Price: price,
                Added_at: addedAt,
                Availability: availability,
                Category: category,
            });

            alert(response.data.message);
            window.location.reload();
        } catch (error) {
            console.error("Error updating product", error);
            alert("Failed to update product.");
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.ProductID}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-3">
                <SheetHeader>
                    <SheetTitle>Edit Product</SheetTitle>
                    <SheetDescription>Make changes here.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-7 py-4 text-sm">
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="ProductID">Product ID</Label>
                            <div id="ProductID">{item.ProductID}</div>
                            <Separator />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="ProductName">Product Name</Label>
                                <Input
                                    id="ProductName"
                                    className="w-full"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="Description">Description</Label>
                                <Input
                                    id="Description"
                                    className="w-full"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="Price">Total Price</Label>
                                <Input
                                    id="Price"
                                    className="w-full"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="Added_at">Date Created</Label>
                            <Input
                                id="Added_at"
                                type="date"
                                className="w-full"
                                value={addedAt}
                                onChange={(e) => setAddedAt(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="Availability">Status</Label>
                                <Select value={availability} onValueChange={setAvailability}>
                                    <SelectTrigger id="StatusAvailability" className="w-full">
                                        <SelectValue placeholder="Product Availability" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Unavailable">Unavailable</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="Availability">Status</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger id="StatusAvailability" className="w-full">
                                        <SelectValue placeholder="Product Availability" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Best Sellers">Best Sellers</SelectItem>
                                        <SelectItem value="New Arrival">New Arrival</SelectItem>
                                        <SelectItem value="Bundle">Bundle</SelectItem>
                                        <SelectItem value="Birthday">Birthday</SelectItem>
                                        <SelectItem value="Floral Tributes">Floral Tributes</SelectItem>
                                        <SelectItem value="Unavailable">Unavailable</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </div>
                <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                    <Button className="w-full" onClick={handleUpdate}>Submit</Button>
                    <SheetClose asChild>
                        <Button variant="outline" className="w-full">Done</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default TableCellViewer;
