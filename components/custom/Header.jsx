"use client"
import {useEffect, useState} from "react";
import {deleteCartItem, getCartItems, getCategories} from "@/utils/GlobalAPi";
import {useProducts} from "@/hooks/useProducs";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Image from 'next/image';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {CartItemList} from "@/components/custom/CartItemList";

import logo from '/public/logo.webp'
import {LayoutGrid, Search, ShoppingBag} from 'lucide-react';
import {toast} from "sonner";

export const Header = () => {

    const [categories, setCategories]=useState([]);
    const router = useRouter()
    const {updateCart, cartListItem, setCartListItem, setSubtotal, subtotal, setTotalCartItems, totalCartItems, calculoSubtotal} = useProducts();
    const jwt=sessionStorage.getItem("jwt")
    const userLogged=jwt?JSON.parse( sessionStorage.getItem("user")):"";

    useEffect(()=> {
        listCategories();
    }, [])
    useEffect(()=> {
        getProductsCart();
    }, [updateCart]);

    useEffect(() => {
        calculoSubtotal()
    }, [cartListItem]);



    const listCategories=async()=> {
        try {
            const cat=await getCategories();
            setCategories(cat)
        }catch(e) {
            console.log("Error to list categories")
        }
    };

    const getProductsCart = async ()=> {
        console.log("llamado")
        try {
            const totalProductsCart=await getCartItems(userLogged.id, jwt);
            setCartListItem(totalProductsCart);
            setTotalCartItems(totalProductsCart?.length)
        }catch(e) {
            console.log("Error to list categories")
        }
    }

    const deleteItemFromCart=async (productId) => {
        try {
            await deleteCartItem(productId, jwt)
            toast("Producto eliminado")
            getProductsCart()
        } catch (e) {
            console.error("Error deleting product from cart")
        }
    }

    const signOut = ()=> {
        sessionStorage.clear();
        router.push("/sign-in")
    }

  return (
    <header className={"p-5 shadow-md "}>
        <nav className={"flex justify-between max-w-screen-2xl mx-auto"}>
            <div className='flex items-center gap-8'>
                <Link href={"/"}>
                    <Image src={logo}
                           alt={"Grocery Store Logo"}
                           width={150}
                           height={100}
                    />
                </Link>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <p className={"hidden md:flex gap-2 items-center border rounded-md p-2 px-18 bg-slate-100 cursor-pointer"}>
                            <LayoutGrid className={"h-5 w-5"}/>
                            Buscar Categorias
                        </p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        {categories.map((category, index) => (
                            <Link href={`/products-category/${category.attributes.name}`}
                                  key={index}
                            >
                                <DropdownMenuItem
                                    className={"flex gap-4 items-center cursor-pointer"}
                                >
                                    <Image
                                        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.attributes.icon.data[0].attributes.formats.thumbnail.url}
                                        alt={`Picture of ${category?.attributes?.name}}`}
                                        width={28}
                                        height={28}
                                    />
                                    <p className={"text-lg"}>{category?.attributes?.name}</p>
                                </DropdownMenuItem>
                            </Link>


                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className={"hidden md:flex gap-3 items-center border rounded-md py-2 px-5"}>
                    <Search/>
                    <input type="text" placeholder='Search' className={"outline-none"}/>
                </div>
            </div>
            <div className='flex gap-5 items-center'>

                <Sheet>
                    <SheetTrigger>
                        <p className='flex gap-2 items-center gap-8 text-lg'>
                            <ShoppingBag/>
                            <span>{totalCartItems}</span>
                        </p>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className={"bg-primary text-white font-bold text-lg p-2"}>Mi Carrito</SheetTitle>
                            <SheetDescription>
                                <CartItemList
                                    cartListItem={cartListItem}
                                    deleteItemFromCart={deleteItemFromCart}
                                />
                            </SheetDescription>
                        </SheetHeader>
                        <SheetClose asChild>
                            <div className={"absolute w-[90%] bottom-6 flex flex-col"}>
                                <h3 className={'text-lg font-bold flex justify-between'}>
                                    Subtotal = <span>{subtotal}$</span>
                                </h3>
                                <Button type="button" onClick={() => router.push('/checkout')}>Carrito</Button>
                            </div>
                        </SheetClose>
                    </SheetContent>
                </Sheet>


                {jwt ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={"hover:scale-105 hover:drop-shadow-md"}>{userLogged.username}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>My Orders</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href={"/sign-in"}>
                        <Button>Login</Button>
                    </Link>
                )}

            </div>
        </nav>

    </header>
  )
}
