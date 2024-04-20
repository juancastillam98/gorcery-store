import Image from "next/image";

export const OrderItem = ({orderItem}) => {
    console.log(orderItem);
    const {id, product, quantity, sellingPrice} = orderItem;
    console.log("product");
    console.log(product);
    console.log("data");
    const {name, images} =product.data.attributes;
    console.log(name);
    return (
        <article className={"w-[60%]"}>
            <div className="grid grid-cols-5 mt-3 items-center">
                <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + images.data[0].attributes.url}
                    alt={`imagen de ${name}`}
                    width={100}
                    height={100}
                    className={"bg-gray-200 p-1 rounded-xl"}
                />
                <div className={"col-span-2"}>
                    <p>Nombre: {name}</p>
                    <p>Precio: {sellingPrice}</p>
                </div>
                <p className={""}>Cantidad: {quantity}</p>
                <p className={""}>Total: {parseFloat(sellingPrice * quantity).toFixed(2)}</p>
            </div>
            <hr className={"mt-3"}/>
        </article>


    )
}