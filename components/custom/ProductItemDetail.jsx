"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ShoppingBasket} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";
import {addToCart} from "@/utils/GlobalAPi";
import {useProducts} from "@/hooks/useProducts";

export const ProductItemDetail = ({product}) => {

    const [productTotalPrice, setProductTotalPrice] = useState(
        product.attributes.sellingPrice
    )
    const {updateCart, setUpdateCart, jwt, userLogged}=useProducts();

    const router=useRouter();
    const [quantity, setQuantity] = useState(1)
    const addProductToCart = async ()=>{
        if (!jwt){
            router.push("/sign-in")
            return;
        }
        const data={
            data:{
                quantity,
                amount: (quantity*productTotalPrice).toFixed(2),
                products: product.id,
                user_permissions_users: userLogged.id,
                userId: userLogged.id
            }
        }
        try {
            await addToCart(data, jwt);
            setUpdateCart(!updateCart)
            toast("Producto añadido a la cesta")
        }catch (e) {
            toast("No se ha podido añadir")

        }

    }

    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black"}>
            <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+ product.attributes.images.data[0].attributes.url}
                alt={`Picture of ${product?.attributes?.name}}`}
                width={300}
                height={300}
                className={"object-contain rounded-lg bg-slate-300 rounded-lg"}
            />
            <div className={"flex flex-col gap-3"}>
                <div className={"flex flex-col gap-3"}>
                    <h3 className={"text-2xl font-bold"}>{product.attributes.name}</h3>
                    <p className={"text-sm text-gray-500"}>{product.attributes.description}</p>
                    <p className={"font-bold text-3xl"}>{product.attributes.sellingPrice}$</p>
                </div>
                    <h3 className={"font-medium text-lg"}>Cantidad ({product.attributes.mrp})uds</h3>
                <div className={"flex flex-col items-center md:items-baseline gap-3"}>
                    <div className={"flex gap-3 items-center"}>
                        <div className={"p-2 border flex gap-7 items-center px-5"}>
                            <button className={"hover:cursor-pointer"} disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="lucide lucide-minus">
                                    <path d="M5 12h14"/>
                                </svg>
                            </button>
                            <p>{quantity}</p>
                            <button className={"hover:cursor-pointer"} onClick={() => setQuantity(quantity + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="lucide lucide-plus">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5v14"/>
                                </svg>
                            </button>
                        </div>
                        <p className={"font-black text-2xl"}>Total = {(quantity * productTotalPrice).toFixed(2)}$</p>
                    </div>
                    <Button
                        className={"flex gap-3"}
                        onClick={() => addProductToCart()}
                    >
                        <ShoppingBasket/>
                        Add to cart
                    </Button>

                    <h3><span className={"font-bold"}>Categoría: </span>{product.attributes.categories.data[0].attributes.name}</h3>
                </div>
            </div>
        </div>
    )
}