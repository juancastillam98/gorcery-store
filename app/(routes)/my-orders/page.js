"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getProdutsOrder} from "@/utils/GlobalAPi";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {OrderItem} from "@/components/custom/OrderItem";
import {useProducts} from "@/hooks/useProducts";


export default function MyOrder() {

    const [orderList, setOrderList]=useState([])
    const {jwt, userLogged}=useProducts();

    const router = useRouter();
    useEffect(() => {
        if (!jwt) {
            router.push("/sign-in")
        }else {
            myOrderList()
        }
    }, []);

    const myOrderList= async ()=>{
        const myOrders = await getProdutsOrder(userLogged.id, jwt)
        setOrderList(myOrders)
    }

    return (
        <section className={""}>
            <h1 className={"p-3 bg-primary text-xl font-bold text-center text-white"}>Mis pedidos</h1>
            <div className={"py-8 mx-7 md:mx-20"}>
                <h2 className={"text-3xl font-bold text-primary"}>Mi historial de pedidos</h2>
                <div>
                    {orderList.map((item, index)=>(
                        <Collapsible
                        key={index}
                        >
                            <CollapsibleTrigger>
                                <div className={"border bg-slate-200  p-2 flex w-full justify-evenly gap-x-24"}>
                                    <h3 className={"text-"}>
                                        Fecha de pedido: <span className={"font-bold"}>{(item?.createdAt).slice(0, 10)}</span>
                                    </h3>
                                    <p>Total: <span className={"font-bold"}> {(item?.totalOrder)} €</span></p>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                {item.orderItem.map((item, i)=>(
                                    <OrderItem
                                        orderItem={item}
                                        key={i}
                                    />
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    ))}

                </div>



            </div>
        </section>
    );
}
