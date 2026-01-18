"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  ChevronsUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Order = {
  id: string;
  orderNumber: number;
  customer: string;
  foods: { name: string; image: string; quantity: number }[];
  date: string;
  total: number;
  deliveryAddress: string;
  status: "Pending" | "Delivered" | "Cancelled";
};

const generatePlaceholderOrders = (): Order[] => {
  const statuses: Order["status"][] = ["Pending", "Delivered", "Cancelled"];
  const orders: Order[] = [];

  for (let i = 1; i <= 32; i++) {
    const statusIndex = i <= 3 ? 0 : i <= 7 ? 1 : 2;

    orders.push({
      id: String(i),
      orderNumber: 1,
      customer: "Test@gamil.com",
      foods: [
        {
          name: "Sunshine Stackers",
          image: "/foods/pancakes.jpg",
          quantity: 1,
        },
        { name: "Burger Deluxe", image: "/foods/burger.jpg", quantity: 1 },
      ],
      date: "2024/12/20",
      total: 26.97,
      deliveryAddress:
        "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
      status: statuses[statusIndex],
    });
  }

  return orders;
};

const placeholderOrders = generatePlaceholderOrders();

const StatusBadge = ({
  status,
  onChange,
}: {
  status: Order["status"];
  onChange: (value: Order["status"]) => void;
}) => {
  const statusStyles = {
    Pending: "border-red-400 text-red-600",
    Delivered: "border-green-400 text-green-600",
    Cancelled: "border-gray-200 text-gray-400",
  };

  return (
    <Select value={status} onValueChange={onChange}>
      <SelectTrigger
        className={`w-28 h-8 text-sm bg-white border rounded-full ${statusStyles[status]}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Delivered">Delivered</SelectItem>
        <SelectItem value="Cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
};

const FoodCell = ({ foods }: { foods: Order["foods"] }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (foods.length === 1) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={foods[0].image}
          alt={foods[0].name}
          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <span className="text-sm">{foods[0].name}</span>
        <span className="text-sm text-gray-400">x {foods[0].quantity}</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">{foods.length} foods</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-48">
          {foods.map((food, index) => (
            <div key={index} className="flex items-center gap-3 py-2">
              <img
                src={food.image}
                alt={food.name}
                className="w-8 h-8 rounded-lg object-cover bg-gray-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-sm">{food.name}</span>
              <span className="text-sm text-gray-400">x {food.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export function OrderTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [orders, setOrders] = React.useState<Order[]>(placeholderOrders);

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const columns: ColumnDef<Order>[] = [
    {
      id: "select",
      size: 40,
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-gray-300"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-gray-300"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderNumber",
      size: 50,
      header: "№",
      cell: ({ row }) => (
        <div className="text-gray-900">{row.getValue("orderNumber")}</div>
      ),
    },
    {
      accessorKey: "customer",
      size: 140,
      header: "Customer",
      cell: ({ row }) => (
        <div className="text-gray-900">{row.getValue("customer")}</div>
      ),
    },
    {
      accessorKey: "foods",
      size: 180,
      header: "Food",
      cell: ({ row }) => <FoodCell foods={row.getValue("foods")} />,
    },
    {
      accessorKey: "date",
      size: 120,
      header: ({ column }) => (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Date</span>
          <ChevronsUpDown className="h-4 w-4 text-gray-400" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-900">{row.getValue("date")}</div>
      ),
    },
    {
      accessorKey: "total",
      size: 80,
      header: "Total",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-gray-900">{formatted}</div>;
      },
    },
    {
      accessorKey: "deliveryAddress",
      size: 200,
      header: "Delivery Address",
      cell: ({ row }) => (
        <div
          className="text-gray-900 text-sm leading-5 pr-4"
          title={row.getValue("deliveryAddress")}
        >
          {row.getValue("deliveryAddress")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      size: 140,
      header: ({ column }) => (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Delivery state</span>
          <ChevronsUpDown className="h-4 w-4 text-gray-400" />
        </div>
      ),
      cell: ({ row }) => (
        <StatusBadge
          status={row.getValue("status")}
          onChange={(value) => handleStatusChange(row.original.id, value)}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const totalItems = orders.length;
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(pageCount);
    }

    return pages;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500">{totalItems} items</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 h-10 px-4 border-gray-200 rounded-full"
          >
            <Calendar className="h-4 w-4" />
            <span className="text-sm">13 June 2023 - 14 July 2023</span>
          </Button>
          <Button className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 rounded-full">
            Change delivery state
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-gray-200 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-gray-400 font-normal text-sm h-12 px-4"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-b border-gray-100 last:border-b-0 hover:bg-transparent"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-5 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center gap-2 mt-8 pb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-8 w-8 text-gray-300 hover:text-gray-500 hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPaginationNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-1 text-gray-400 text-sm">...</span>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => table.setPageIndex((page as number) - 1)}
                className={`h-8 w-8 text-sm rounded-lg ${
                  currentPage === page
                    ? "bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="h-8 w-8 text-gray-300 hover:text-gray-500 hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
