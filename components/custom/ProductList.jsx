import {ProductItem} from "@/components/custom/ProductItem";

export const ProductList = ({productsList}) => {
    return (
        <section className={"mt-10"}>
            <h2 className={"text-green-600 font-bold text-2xl"}>
                Nuestros productos
            </h2>
            <div className={"mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"}>
                {productsList.map((product, index) =>(
                    <ProductItem
                        key={index}
                        product={product}
                    />
                ))}
            </div>
        </section>
    )
}
