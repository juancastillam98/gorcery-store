import {getAllProducts, getCategories, getSliders} from "@/utils/GlobalAPi";
import {Sliders} from "@/components/custom/Sliders";
import {CategoryList} from "@/components/custom/CategoryList";
import {ProductList} from "@/components/custom/ProductList";

export default async function Home() {
    const categoriesList = await getCategories();
    const slidersList = await getSliders();
    const productsList = await getAllProducts();
    return (
        <main className={"p-10 px-16 max-w-screen-2xl mx-auto"}>
            <Sliders slidersList={slidersList}/>
            <CategoryList categoriesList={categoriesList}/>
            <ProductList productsList={productsList}/>
        </main>
    );
}
