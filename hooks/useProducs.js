import {useContext} from "react";
import {ProductsContext} from "@/contextAPI/ProductsProvider";
export const useProducts=()=>{
    return useContext(ProductsContext)
}