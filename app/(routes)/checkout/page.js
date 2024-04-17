"use client"
import { PayPalButtons} from "@paypal/react-paypal-js";
import {addToOrder, getCartItems} from "@/utils/GlobalAPi";
import {useProducts} from "@/hooks/useProducs";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {ArrowBigRight} from "lucide-react";


export default  function Checkout() {
    const {totalCartItems, setTotalCartItems, cartListItem, setCartListItem, calculoSubtotal, subtotal, totalPrice}=useProducts();
    const router = useRouter()

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

    const jwt=sessionStorage.getItem("jwt")
    const userLogged=jwt?JSON.parse( sessionStorage.getItem("user")):"";

    useEffect(() => {
        if (!jwt){
            router.push("/sign-in")
        }
        getProductsCart()
    }, []);

    useEffect(() => {
        calculoSubtotal()
    }, [cartListItem]);

    const handleSubmit=(e)=> {
        e.preventDefault();
        console.log(userInfo)
        /*onApprove({paymentId: "123"})*/
    }

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
        console.log("Contenido de checkout info")
        console.log(checkoutInfo)
        console.log("Contenido de infouser")
        console.log(userInfo)
        toast("Pago realizado con éxito")

    try {
        addToOrder(checkoutInfo, jwt)
        toast("Pago realizado con éxito")
    }catch (e) {
        console.log("ha habido un error")
    }


    }



    return (
        <section className="">
            <h2 className={"p-3 bg-primary text-xl font-bold text-center text-white"}>Carrito</h2>
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
                                onClick={()=>onApprove({paymentID: 123})}
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
