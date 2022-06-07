import { CartIcon } from "../icons";
import { useSelector } from "react-redux"; // useSelector is use to get the store values

const Navbar = () => {
  // the useSelector accept a callback func and returns store or state(if u may)
  // and can be use to get the reducer/slice u want and the value of such slice can be destructured
  const { amount } = useSelector((store) => store.cart);
  // const  amount  = useSelector((store) => store.cart.amount); or pass it to a variable

  return (
    <>
      <nav>
        <div className="nav-center">
          <h3>redux toolkit</h3>
          <div className="nav-container">
            <CartIcon />
            <div className="amount-container">
              <p className="total-amount">{amount}</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
