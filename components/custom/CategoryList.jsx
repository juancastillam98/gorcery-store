import Image from "next/image";
import Link from "next/link";

export const CategoryList = ({categoriesList, selectedCategory}) => {

    return (
        <div className={"mt-5"}>
            <h3 className={"text-green-600 font-bold text-2xl"}>Categorías</h3>
            <div className={"mt-5 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2"}>
                {categoriesList.map((category, index) =>(
                    <Link href={`/products-category/${category.attributes.name}`}
                     className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200
                     ${selectedCategory==category.attributes.name && "bg-green-500"}
                     `}
                        key={index}>
                        <Image
                            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+ category.attributes.icon.data[0].attributes.formats.thumbnail.url}
                            alt={`Picture of ${category?.attributes?.name}}`}
                            width={50}
                            height={50}
                            className={"group-hover:scale-125 transition-all ease-in"}
                        />
                        <p className={"text-green-800"}>{category.attributes.name}</p>
                    </Link>

                ))}
            </div>
        </div>
    )
}

