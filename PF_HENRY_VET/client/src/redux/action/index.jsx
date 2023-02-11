import axios from "axios";
import {
    GET_PRODUCTS,
    GET_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    POST_PRODUCT,
    GET_USER,
    DELETE_USER,
    POST_USER,
    REGISTER_USER,
    SIGNIN_USER,
    SIGNOUT_USER,
    REGISTER_ERRORS,
    SIGNIN_ERRORS,
    CLEAN_MSG_REGISTER_USER,
    UPDATE_USER,
    CREATE_PAGINATION_ARRAY,
    SEARCH,
    FILTERED,
    SORT,
    SEARCH_PRO_DASHBOARD,
    BY_ORDER,
    BY_ORDER_PRICE,
    BY_ORDER_STOCK, 
    GET_FAVORITES,
    UPDATE_FAVORITE,
    SEARCH_USERS_DASHBOARD, 
    GET_USERS, 
    POST_FAVORITES
} from './constants';

/* ruta + endpoints */
const URL = "http://localhost:3001/";
// const URL = import.meta.env.VITE_API_URL

const Endpoints = {
    product: "products/",
    user: "users/",
    carrito: "shoppingCart/",
    detalleCarrito: "shoppingCartDetail/",
    razas: "breed/",
    favoritos: "favorite/"
}

 export function searchDashBoard (data){
    try {
        return function(dispatch){
        dispatch({
           type:SEARCH_PRO_DASHBOARD,
           payload:data, 
        })        
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log(error.message);
        }
        console.log(error.config);
    }
    
 }
/*  export function searchDashBoardUsers (data){
    try {
        return function(dispatch){
        dispatch({
           type:SEARCH_USERS_DASHBOARD,
           payload:data, 
        })        
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log(error.message);
        }
        console.log(error.config);
    }
    
 } */


export function getAllProducts(name) {
    return async function(dispatch) {
        try {
            //SE UTILIZA EL GET ALL PRODUCTS PARA TRAER TODOS LOS PRODUCTOS O SOLO AQUELLOS QUE CUMPLAN
            //CON CIERTA CONDICION
            //---------------------------------
            const { data } = await axios.get(name ? `${URL + Endpoints.product}get?name=${name}` : `${URL + Endpoints.product}get`);
            dispatch({
                type: GET_PRODUCTS,
                payload: data,
            });
            dispatch(filtered())
            dispatch(createPaginationArray())
            //---------------------------------
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

export function getProduct(productName) {
    return async function(dispatch) {
        try {
            const { data } = await axios.get(`${URL + Endpoints.product}getp/${productName}`);
            dispatch({
                type: GET_PRODUCT,
                payload: data,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

export function deleteProduct(codProduct) {
    return async function(dispatch) {
        try {
            await axios.delete(`${URL + Endpoints.product}unsubscribe/${codProduct}`);
            dispatch({
                type: DELETE_PRODUCT,
                payload: codProduct,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

export function updateProduct(productId, productData) {
    return async function(dispatch) {
        try {
            const { data } = await axios.put(`${URL + Endpoints.product}update/${productId}`, productData);
            dispatch({
                type: UPDATE_PRODUCT,
                payload: data,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

export function postProductos(payload) {
    console.log(payload)
    try {
      return async function (dispatch) {
        var post = await axios.post("http://localhost:3001/products/post", payload);
        return dispatch({
          type: POST_PRODUCT,
          payload: post.data,
        });
      };
    } catch (error) {
      console.log(error + " >>> In actions/ posterRecipes()");
    }
  }

export function postProduct(productData) {
    return async function(dispatch) {
        try {
            const { data } = await axios.post(`${URL + Endpoints.product}post`, productData);
            dispatch({
                type: POST_PRODUCT,
                payload: data,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

 

export function getUser(userId) {
    return async function(dispatch) {
        try {
            const { data } = await axios.get(`${URL + Endpoints.user}get/${userId}`);
            dispatch({
                type: GET_USER,
                payload: data,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

export function registerUser(values){
    return async (dispatch) => {
        try{
            const info = await axios.post(`${URL + Endpoints.user}register`, values);
            dispatch({
                type: REGISTER_USER,
                payload: info
            });
        }catch(err){
            dispatch({
                type: REGISTER_ERRORS,
                payload: err
            });
        }
    }
}
export function signinUser(values){
    return async (dispatch) => {
        try{
            const info = await axios.post(`${URL + Endpoints.user}signin`, values);
            dispatch({
                type: SIGNIN_USER,
                payload: info
            });
        }catch(err){
            dispatch({
                type: SIGNIN_ERRORS,
                payload: err
            });
        }
    }
}
export function signoutUser(){
    return async (dispatch) => {
        try{
            const info = await axios.post(`${URL + Endpoints.user}signout`);
            dispatch({
                type: SIGNOUT_USER,
                payload: info
            });
        }catch(err){
            dispatch({
                type: SIGNIN_ERRORS,
                payload: err
            });
        }
    }
}
export function cleanMsgRegisterUser(){
    return{
        type: CLEAN_MSG_REGISTER_USER
    };
}

export function deleteUser(userId) {
    return async function(dispatch) {
        try {
            await axios.delete(`${URL + Endpoints.user}unsubscribe/${userId}`);
            dispatch({
                type: DELETE_USER,
                payload: userId,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

export function postUser(userData) {
    return async function(dispatch) {
        try {
            const { data } = await axios.post(`${URL + Endpoints.user}post`, userData);
            dispatch({
                type: POST_USER,
                payload: data,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

export function updateUser(userId, userData) {
    return async function(dispatch) {
        try {
            const { data } = await axios.put(`${URL + Endpoints.user}update/${userId}`, userData);
            dispatch({
                type: UPDATE_USER,
                payload: data,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

export function searchByName(name){
    return async function(dispatch){
        try {
            //SE UTILIZA EL GET ALL PRODUCTS PARA TRAER TODOS LOS PRODUCTOS O SOLO AQUELLOS QUE CUMPLAN
            //CON CIERTA CONDICION
            //---------------------------------
            const { data } = await axios.get(`${URL + Endpoints.product}get?name=${name}`);
            console.log(data)
            dispatch({
                type: SEARCH,
                payload: data,
            });
            dispatch(filtered())
            dispatch(createPaginationArray())
            //---------------------------------
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    }
}
export function createPaginationArray(payload){
    return {
        type: CREATE_PAGINATION_ARRAY,
        payload,
    }
}
export function filtered(payload) {
    return {
        type: FILTERED,
        payload
    }
}
export function sort(order) {
    return{
        type: SORT,
        payload: order
    }
}



//*  DASHBOARD byOrderPrice
 
export const byOrder = (payload) => {   
    return {
      type: BY_ORDER,
      payload,
    };
  };
  export const byOrderPrice = (payload) => {   
    return {
      type: BY_ORDER_PRICE,
      payload,
    };
  };
  export const byOrderStock = (payload) => {   
    return {
      type: BY_ORDER_STOCK,
      payload,
    };
  };
  //*_________________________________


export function getFavorites(idUser) {
    return async function(dispatch) {
        try {
            const { data } = await axios.get(`${URL + Endpoints.favoritos}get/${idUser}`);
            if(data.ok) dispatch({
                type: GET_FAVORITES,
                payload: data,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}
//se necesita el id de favorito y el id de usuario
export function updateFavorites(values) {
    return async function(dispatch) {
        try {
            const { data } = await axios.put(`${URL + Endpoints.product}update`, values);
            if(data.ok) dispatch({
                type: UPDATE_FAVORITE,
                payload: data,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}
export function postFavorite(idProduct, url, name, idUser) {
    return async function(dispatch) {
        try {
            const { data } = await axios.post(`${URL + Endpoints.favoritos}post`, idProduct, url, name, idUser);
            if(data.ok) dispatch({
                type: POST_FAVORITES,
                payload: data,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            console.log(error.config);
        }
    };
}

