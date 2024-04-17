import axios from "axios";
import { toast } from "sonner"

export const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`
});

export async function getCategories() {
    const {data} = await axiosClient.get("/api/categories?populate=*")
    return data.data;
}
export async function getSliders()  {
    const {data} = await axiosClient.get("/api/sliders?populate=*");
    return data.data;
};
export async function getAllProducts()  {
    const {data} = await axiosClient.get("/api/products?populate=*");
    return data.data;
};
//http://localhost:1337/api/products?filters[categories][name][$in]=Fruta
export async function getProductsByCategory(category)  {
    const {data} = await axiosClient.post(`/api/products?filters[categories][name][$in]=${category}&populate=*`);
    return data.data;
};


export async function registerNewUser(username, email, password) {
    try {
        const response= await axiosClient.post('/api/auth/local/register', {
            username: username,
            email: email,
            password: password,
        });
        sessionStorage.setItem("user", JSON.stringify(response.data.user))
        sessionStorage.setItem("jwt", response.data.jwt)
        toast("Usuario creado con éxito")
    } catch (error) {
        toast("El usuario no ha podido registrarse", error)
    }
}

/*Iniciar sesión usuario*/
export function signInUser(email, password) {
     axiosClient.post('/api/auth/local', {
        identifier: email,
        password: password,
    }).then(response => {
         sessionStorage.setItem("user", JSON.stringify(response.data.user))
         sessionStorage.setItem("jwt", response.data.jwt)
     }).catch(error => {
         console.log('An error occurred:', error.response);
     });
}

export function addToCart(data, jwt) {
    axiosClient.post('/api/user-carts', data, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
        },
    });
}
/*lit products from cart*/
export async function getCartItems(userId, jwt) {
    try {
        const {data}= await axiosClient.get(`/api/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url=*`, {
            headers: {
                Authorization:
                    `Bearer ${jwt}`,
            },
        });
        const cartItemsList = data.data.map((item)=> ({
            id: item.id,
            name: item.attributes.products?.data[0].attributes.name,
            quantity: item.attributes.quantity,
            amount: item.attributes.amount,
            image: item.attributes.products?.data[0].attributes.images.data[0].attributes.formats.thumbnail.url,
            sellingPrice: item.attributes.products?.data[0].attributes.sellingPrice,
            //product:  item.attributes.products?.data[0].attributes.name,
            product: item.attributes.products?.data[0].id
        }))
        return cartItemsList;
    }catch (e){
        console.log('There was an error', e)
    }

}

/*delete products from cart*/
export function deleteCartItem(id, jwt) {
    axiosClient.delete(`/api/user-carts/${id}`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
        },
    });
}
//Add a new order into database


export function addToOrder(checkoutInfo, jwt) {
    axiosClient.post('/api/orders', checkoutInfo, {
            headers: {
                Authorization:
                    `Bearer ${jwt}`,
            },
        })
}

