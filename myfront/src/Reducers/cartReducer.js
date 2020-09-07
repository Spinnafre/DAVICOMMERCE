import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART_ITEM,
  REMOVE_CART_ITEM,
} from "../constants/cartConstants";
import {
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/ShippingConstants";

function CartReducer(state = { carts: [], shipping: {}, payment: {} }, action) {
  switch (action.type) {
    case ADD_TO_CART_ITEM:
      const newProduct = action.payload;

      // Estou verificando se o item que estou passando ao carrinho está
      // incluso no meu ARRAY de item do carrinho (Estado)
      const productRepeat = state.carts.find(
        (prod) => prod.id === newProduct.id
      );
      // Se tiver um produto já no estado
      if (productRepeat) {
        //Percorro o meu array de carts verificando se o produto que está
        // no carrinho é igual ao produto que estou  passando
        return {
          carts: state.carts.map((pcart) => {
            return pcart === productRepeat ? newProduct : pcart;
          }),
        };
      }
      // Caso não tenha items repetidos, irá adicionar o novo item no estado
      return {
        carts: [...state.carts, newProduct],
      };
    case REMOVE_CART_ITEM:
      return {
        carts: [...state.carts.filter((p) => p.id !== action.payload)],
      };

    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    default:
      return state;
  }
}

export { CartReducer };
