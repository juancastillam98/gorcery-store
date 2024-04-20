import {getCategories, getProductsByCategory} from "@/utils/GlobalAPi";
import {ProductList} from "@/components/custom/ProductList";
import {CategoryList} from "@/components/custom/CategoryList";

export default async function ProductCategory({params}) {
    const categoryName = decodeURIComponent(params.categoryName).replace(/%20/g, " ");//tengo que decodificar los datos de lar url para que me detecte las tildes
    const productsList = await getProductsByCategory(params.categoryName);
    const categoriesList = await getCategories();

    return (
        <section className={""}>
            <h2 className={"p-4 bg-primary text-white font-bold text-3xl text-center"}>{categoryName}</h2>
            <div className={"max-w-screen-2xl mx-auto"}>
                <CategoryList categoriesList={categoriesList} selectedCategory={categoryName}/>
                <div className={"p-5 md:p-10"}>
                    <ProductList productsList={productsList}/>
                </div>
            </div>

        </section>
    )
}