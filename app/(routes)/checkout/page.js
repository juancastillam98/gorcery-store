"use client"
import { PayPalButtons} from "@paypal/react-paypal-js";
import {addToOrder, getCartItems} from "@/utils/GlobalAPi";
import {useProducts} from "@/hooks/useProducts";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {idGenerator} from "@/utils/functions";


export default  function Checkout() {
    const {totalCartItems, setTotalCartItems, cartListItem, setCartListItem, calculoSubtotal, subtotal, totalPrice, jwt, userLogged}=useProducts();
    const router = useRouter()
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

/*    const [username, setUsername]=useState("");
    const [email, setEmail]=useState("");
    const [phone, setPhone]=useState("");
    const [zip, setZip]=useState("");
    const [address, setAddress]=useState("");*/


    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        phone: "",
        zip: "",
        address: "",
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
        console.log(userInfo)
    };

    //Paypal
/*    const { paypalScriptOptions, loadingStatus } = usePayPalScriptReducer();
    const [isPayPalReady, setPayPalReady] = useState(false);*/


    useEffect(() => {
        if (!jwt){
            router.push("/sign-in")
        }
        getProductsCart()
    }, []);

    useEffect(() => {
        calculoSubtotal()
    }, [cartListItem]);


    const getProductsCart = async ()=> {
        try {
            const totalProductsCart=await getCartItems(userLogged.id, jwt);
            setCartListItem(totalProductsCart);
            setTotalCartItems(totalProductsCart?.length)
        }catch(e) {
            console.log("Error to list categories")
        }
    }
    //Pyament
    const paymentItems = async ()=> {
        try {
            addToOrder()
        }catch(e){
            console.error("Hubo un error")
        }
    }
    //PAYAL FUNCTIONS
    const createOrder=async (data, actions)=> {
            const order= actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: totalPrice,
                            currency_code: "USD"
                        }
                    }
                ]
            })
            return order;
    }
    const onApprove = async (data) => {
        // Aquí puedes ejecutar acciones después de que el usuario apruebe el pago

        console.log("Contenido de data")
        console.log(data)

        const checkoutInfo = {
            data: {
                paymentId: (data.paymentID).toString(),
                orderId: (data.paymentID).toString(),
                totalOrder: totalPrice,
                username: userInfo.username,
                email: userInfo.email,
                phone: userInfo.phone,
                zip: userInfo.zip,
                address: userInfo.address,
                userId: userLogged.id,
                orderItem: cartListItem
            }
        };
        console.log(checkoutInfo)
    try {
        addToOrder(checkoutInfo, jwt)
        toast("Pago realizado con éxito")
        setShowModal(true); // Muestra el modal después de un pago exitoso
        setTimeout(() => setShowModal(false), 4000); // Oculta el modal después de 4 segundos
    }catch (e) {
        console.log("ha habido un error")
    }
    }



    return (
        <section className="">
            <h2 className={"p-3 bg-primary text-xl font-bold text-center text-white"}>Carrito</h2>

            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¡Pago realizado con éxito!</DialogTitle>
                        <DialogDescription>
                            Tu pago ha sido procesado correctamente.
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"
                                     fill="none" stroke="#03b020" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="lucide lucide-badge-check">
                                    <path
                                        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                                    <path d="m9 12 2 2 4-4"/>
                                </svg>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className={"p-5 px-5 md:px-10 grid grid-cols-1 gap-y-5 md:grid-cols-3 py-8"}
                //onSubmit={handleSubmit}
            >
                <div className="col-span-2 mx-20">
                    <h3 className={"font-bold text-3xl"}>Detalles del pedido</h3>
                    {/*Campos Formulario*/}
                    <div className={"grid grid-cols-2 gap-x-6 mt-10"}>
                        <div className={"mt-2.5"}>
                            <label htmlFor="username"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input type="text" id="username"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Popeye El Marino" required
                                   name="username" value={userInfo.username}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className={"mt-2.5"}>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo
                                electrónico</label>
                            <input type="email" id="email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="john.doe@company.com" required
                                   name="email" value={userInfo.email}
                                   onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-x-6 mt-2.5"}>
                        <div className={"mt-2.5"}>
                            <label htmlFor="phone"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                            <input type="tel" id="phone"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="23123123" required
                                   name="phone" value={userInfo.phone}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className={"mt-2.5"}>
                            <label htmlFor="zip"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip</label>
                            <input type="number" id="zip"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="12123" required
                                   name="zip" value={userInfo.zip}
                                   onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={"mt-2.5"}>
                        <label htmlFor="address"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                        <input type="text" id="address"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Calle Amapola, nº, piso, letra... " required
                               name="address" value={userInfo.address}
                               onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={"mx-10 border"}>
                    <h3 className={"p-3 bg-gray-200 font-bold text-center"}>Total {totalCartItems}</h3>
                    <div className="p-4 flex flex-col gap-4">
                        <h4 className={"font-bold flex justify-between"}>Subtotal <span>{subtotal}$</span></h4>
                        <hr/>
                        <p className={"flex justify-between"}>Envío <span>4.99$</span></p>
                        <hr/>
                        <p className={"font-bold flex justify-between"}>Total <span>{totalPrice}$</span></p>

                        <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={()=>onApprove({paymentID: idGenerator()})}
                        >

                            Pagar {/*<ArrowBigRight/>*/}
                        </button>
                        <PayPalButtons
                            style={{ layout: "horizontal" }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
