import { useContext } from "react";

import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import cartContext from "../../store/cart-context";

const Cart = props => {
    const cartCtx = useContext(cartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    };

    const cartItems =
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map(item => {
                return (<CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />);
            })}
        </ul>;

    return (
        <Modal onCartToggle={props.onCartToggle}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onCartToggle}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;