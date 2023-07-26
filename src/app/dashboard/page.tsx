"use client"

import React, {useEffect, useState} from "react";
import RequireAuth from "@/components/RequireAuth";
import PersistLogin from "@/components/PersistLogin";
import {Button} from "@/components/ui/button";
import useLogout from "@/lib/hooks/useLogout";
import DataTable from "@/components/DataTable";
import {getAllProducts} from "@/services/api";
import {ColumnDef} from "@tanstack/table-core";
import {DropdownMenu, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import {DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel} from "@/components/ui/dropdown-menu";
import {AlertDialog, AlertDialogTrigger} from "@radix-ui/react-alert-dialog";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import AddProductDialog from "@/components/AddProductDialog";
import useAxiosAdminPrivate from "@/lib/hooks/useAxiosAdminPrivate";

const Dashboard: React.FC = () => {
    const adminLogout = useLogout();
    const axiosAdminPrivate = useAxiosAdminPrivate();

    const [products, setProducts] = useState<APIv1.Product[]>([]);

    useEffect(() => {
        let cancel = false;
        getAllProducts().then((res) => {
            if (!cancel) setProducts(res.data);
        }).catch((err) => {
            console.log(err);
        })

        return () => {
            cancel = true
        };
    }, []);

    const handleDeleteProduct = (productId: string) => {
        axiosAdminPrivate.delete(`/api/v1/products/${productId}`, {withCredentials: true}).then((res) => {
            const filteredProducts = products.filter((product) => product._id != productId);
            setProducts(filteredProducts);
        }).catch((err) => {
            console.log(err);
        })
    }

    const columns: ColumnDef<APIv1.Product>[] = [
        {
            accessorKey: "_id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "description",
            header: "Product Description",
        },
        {
            accessorKey: "price",
            header: "Selling Price",
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
        },
        {
            accessorKey: "disabled",
            header: "Disabled",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({row}) => {
                const product = row.original

                return (
                    <AlertDialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreHorizontal className="h-4 w-4"/>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Actions
                                </DropdownMenuLabel>

                                <DropdownMenuItem>
                                    Edit product
                                </DropdownMenuItem>

                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem>
                                        Delete product
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>

                            </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Confirm the deletion of product?
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>

                                <AlertDialogAction onClick={() => handleDeleteProduct(product._id)}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )
            }
        },
    ]

    return (
        <PersistLogin>
            <RequireAuth>
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col gap-8">
                        <AddProductDialog setProducts={setProducts}/>

                        <DataTable data={products} columns={columns}/>

                        <Button className="w-32" onClick={() => adminLogout()}>
                            LOGOUT
                        </Button>
                    </div>
                </div>
            </RequireAuth>
        </PersistLogin>
    )
}

export default Dashboard;