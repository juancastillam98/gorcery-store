import Image from "next/image";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ProductItemDetail} from "@/components/custom/ProductItemDetail";


export const ProductItem = ({product}) => {
    return (
        <div className={"p-2 md:p-2.5 lg:p-3 xl:p-5 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-110 hover:shadow-lg transition-all ease-in-out cursor-pointer"}>
            <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+ product.attributes.images.data[0].attributes.url}
                alt={`Picture of ${product?.attributes?.name}}`}
                width={500}
                height={200}
                className={"h-full w-auto object-cover rounded-lg"}
            />
            <p className={"font-bold text-lg "}>{product.attributes.name}</p>
            <p className={"font-bold text-lg"}>{product.attributes.sellingPrice}€</p>
            <Dialog>
                <DialogTrigger asChild >
                    <Button variant={"outline"} className={"text-primary hover:text-white hover:bg-primary"}>Añadir al carrito</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <ProductItemDetail product={product}/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}