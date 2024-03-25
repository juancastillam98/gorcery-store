import Image from 'next/image';
import logo from '/public/logo.webp'
import {LayoutGrid, Search, ShoppingBag} from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const Header = () => {
  return (
    <header className={"p-5 shadow-md flex justify-between"}>
        <div className='flex items-center gap-8'>
            <Image src={logo} alt={"Grocery Store Logo"}
                width={150}
                height={100}
            /> 

              
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>  
                        <p className={"hidden md:flex gap-2 items-center border rounded-md p-2 px-18 bg-slate-100"}>
                            <LayoutGrid className={"h-5 w-5"}/> 
                        Categories
                        </p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            <div className={"hidden md:flex gap-3 items-center border rounded-md py-2 px-5"}>
                <Search/>
                <input type="text" placeholder='Search' className={"outline-none"}/>
            </div>
        </div>
        <div className='flex gap-5 items-center'>
            <p className='flex gap-2 items-center gap-8 text-lg'><ShoppingBag/> </p>
            <Button>Login</Button>
        </div>
    </header>
  )
}
