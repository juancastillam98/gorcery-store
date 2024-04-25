import Image from "next/image";
import {useEffect} from "react";
import {useProducts} from "@/hooks/useProducs";
import {Button} from "@/components/ui/button";
import {LucideTrash} from "lucide-react";

export const CartItemList = ({cartListItem, deleteItemFromCart}) => {
    const {subtotal, setSubtotal}=useProducts();
    useEffect(() => {
        calculoSubtotal()
    }, [cartListItem]);

    const calculoSubtotal=()=>{
        let total=0;
        {cartListItem.forEach(element =>{
            total+=element.amount;
        })}
        setSubtotal(total.toFixed(2))
    }



    return (
        <section>
            <div className="h-[800px] overflow-auto">
                {cartListItem?.map((cartItem, index)=>(
                    <div
                        className="flex justify-between items-center p-2 mb-5"
                         key={index}
                    >
                        <div className="flex gap-5 items-center">
                            <Image
                                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cartItem.image}
                                alt={cartItem.name}
                                width={70}
                                height={70}
                                className={"border p-2"}
                            />
                            <div>
                                <h4 className={"font-bold"}>{cartItem.name}</h4>
                                <p>Cantidad {cartItem.quantity}</p>
                                <p>Subtotal: {cartItem.amount}$</p>
                            </div>
                        </div>
                        <LucideTrash
                            className={"cursor-pointer"}
                            onClick={()=>deleteItemFromCart(cartItem.id)}
                        />
                    </div>
                ))}
            </div>
            <div className={"absolute w-[90%] bottom-6 flex flex-col"}>
                <h3 className={'text-lg font-bold flex justify-between'}>Subtotal = <span>{subtotal}$</span></h3>
                <Button>View Cart</Button>
            </div>
        </section>
    )
}