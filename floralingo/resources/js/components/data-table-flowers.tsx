'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
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
import { Separator } from '@radix-ui/react-separator';
import {
    ColumnDef,
    ColumnFiltersState,
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
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';

export const schema = z.object({
    id: z.number(),
    flower_id: z.string(),
    flower_name: z.string(),
    added_at: z.string(),
    description: z.string(),
    pronunciation: z.string(),
    scientific_name: z.string(),
    Thumbnail_url: z.string().url().optional(),
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
        .delete(`http://localhost:8000/flowers/${id}`)
        .then((response) => {
            alert(response.data.message);
            window.location.reload(); // Refresh page after deletion
        })
        .catch((error) => {
            console.error("Error deleting this Flower:", error);
            alert("Failed to delete this Flower.");
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
                    <img src={row.original.Thumbnail_url} alt="Flower thumbnail" className="h-16 w-16 rounded-md object-cover" />
                ) : (
                    <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-md">No image</div>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'flower_id',
        header: 'FlowerID',
        cell: ({ row }) => <TableCellViewer item={row.original} />,
        enableHiding: false,
    },
    {
        accessorKey: 'flower_name',
        header: 'Flower Name',
        cell: ({ row }) => (
            <div className="w-32">
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {row.original.flower_name}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <div className="w-35 break-words whitespace-normal">{row.original.description}</div>,
    },
    {
        accessorKey: 'scientific_name',
        header: 'Scientific Name',
        cell: ({ row }) => <div className="w-35 break-words whitespace-normal">{row.original.scientific_name}</div>,
    },
    {
        accessorKey: 'pronunciation',
        header: 'Pronunciation',
        cell: ({ row }) => <div className="w-35 break-words whitespace-normal">{row.original.pronunciation}</div>,
    },
    {
        accessorKey: 'added_at',
        header: 'added_at',
        cell: ({ row }) => {
            const date = new Date(row.original.added_at);
            const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            return <div>{formattedDate}</div>;
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

function DraggableRow({ row }: { row: any }) {
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
            {row.getVisibleCells().map((cell: any) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
        </TableRow>
    );
}

export function DataTable({ data: initialData }: { data: z.infer<typeof schema>[] }) {
    const [data, setData] = React.useState(() => initialData);
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
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
        state: { sorting, columnVisibility, rowSelection, columnFilters, pagination },
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
    const [searchColumn, setSearchColumn] = React.useState('flower_id');

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setColumnFilters([{ id: searchColumn, value }]);
    }

    function handleAddFlower(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        // Create a new FormData object
        const formData = new FormData(event.currentTarget);
    
        // Append additional data
        formData.append('flower_id', Math.floor(Math.random() * 100000).toString());
    
        console.log('Submitting new Flower:', formData);
    
        // Send data (including the image) to Laravel backend
        router.post('/flowers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Required for file uploads
            },
            onSuccess: () => {
                console.log('Flower added successfully');
                setAddDialogOpen(false);
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Error adding new flower:', errors);
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
                                <SelectItem value="flower_id">Flower ID</SelectItem>
                                <SelectItem value="flower_name">Flower Name</SelectItem>
                                <SelectItem value="description">Description</SelectItem>
                                <SelectItem value="scientific_name">Scientific Name</SelectItem>
                                <SelectItem value="pronunciation">Pronunciation</SelectItem>
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
                                    .map((column) => (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <Button variant="outline" size="sm" onClick={() => setAddDialogOpen(true)}>
                            <PlusIcon />
                            <span className="hidden lg:inline">Add New Flower</span>
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
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))}
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
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Flower</DialogTitle>
                        <DialogDescription>Enter details for the new flower.</DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-4" onSubmit={handleAddFlower}>
                        <div>
                            <Label htmlFor="newFlowerThumbnail">Thumbnail</Label>
                            <Input id="newFlowerThumbnail" name="Thumbnail_url" type="file" accept="image/*" required />
                        </div>
                        <div>
                            <Label htmlFor="newFlowerName">Flower Name</Label>
                            <Input id="newFlowerName" name="flower_name" placeholder="Flower Name" required />
                        </div>
                        <div>
                            <Label htmlFor="newFlowerDesc">Description</Label>
                            <Input id="newFlowerDesc" name="description" placeholder="Description" required />
                        </div>
                        <div>
                            <Label htmlFor="newFlowerScientific">Scientific Name</Label>
                            <Input id="newFlowerScientific" name="scientific_name" placeholder="Scientific Name" required />
                        </div>
                        <div>
                            <Label htmlFor="newFlowerPronunciation">Pronunciation</Label>
                            <Input id="newFlowerPronunciation" name="pronunciation" placeholder="Pronunciation" required />
                        </div>
                        <div>
                            <Label htmlFor="newFlowerDate">Date Added</Label>
                            <Input id="newFlowerDate" name="added_at" type="date" required />
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
    const [flowerName, setFlowerName] = useState(item.flower_name);
    const [description, setDescription] = useState(item.description);
    const [scientificName, setScientificName] = useState(item.scientific_name);
    const [pronunciation, setPronunciation] = useState(item.pronunciation);
    const [addedAt, setAddedAt] = useState(item.added_at);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/flowers/${item.id}`, {
                flower_name: flowerName,
                description: description,
                scientific_name: scientificName,
                pronunciation: pronunciation,
                added_at: addedAt,
            });

            alert(response.data.message);
            window.location.reload();
        } catch (error) {
            console.error("Error updating flower", error);
            alert("Failed to update flower.");
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.flower_id}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-3">
                <SheetHeader>
                    <SheetTitle>Edit Flower</SheetTitle>
                    <SheetDescription>Make changes here.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-7 py-4 text-sm">
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="flower_id">Flower ID</Label>
                            <div id="flower_id">{item.flower_id}</div>
                            <Separator />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="flower_name">Flower Name</Label>
                                <Input
                                    id="flower_name"
                                    className="w-full"
                                    value={flowerName}
                                    onChange={(e) => setFlowerName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    className="w-full resize-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="scientific_name">Scientific Name</Label>
                                <Input
                                    id="scientific_name"
                                    className="w-full"
                                    value={scientificName}
                                    onChange={(e) => setScientificName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="pronunciation">Pronunciation</Label>
                                <Input
                                    id="pronunciation"
                                    className="w-full"
                                    value={pronunciation}
                                    onChange={(e) => setPronunciation(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="added_at">Added At</Label>
                                <Input
                                    id="added_at"
                                    type="date"
                                    className="w-full"
                                    value={addedAt}
                                    onChange={(e) => setAddedAt(e.target.value)}
                                />
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

