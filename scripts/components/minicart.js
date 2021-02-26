import React from "react";
const closeIcon = "../../assets/close.svg";

const getCartData = async () => {
  const data = await fetch("/cart.js");
  return await data.json();
};

class Minicart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInCart: [],
      totalPrice: 0
    };
  }

  componentDidMount() {
    console.log("res", app);
    getCartData().then(({ items, total_price }) => {
      let itemsInCart = items.map((element, index) => {
        console.log("res", element);
        return (
          <React.Fragment key={index}>
            <div className="minicart__product">
              <div className="minicart__image">
                <img src={element.image} />
              </div>

              <div className="minicart__description">
                <h3 className="title">{element.product_title}</h3>
                <h3 className="size">{element.variant_title}</h3>

                <div className="minicart__form">
                  <form>
                    <input type="text" value={element.quantity} />
                    <p>${element.line_price / 100.0}</p>
                  </form>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      });

      this.setState({
        itemsInCart: itemsInCart,
        totalPrice: total_price
      });
    });
  }

  render() {
    return (
      <>
        <header>
          <h2>Cart</h2>
          <button type="button" data-minicart-close>
            <img src={closeIcon} />
          </button>
        </header>

        <div className="minicart__items">{this.state.itemsInCart}</div>

        <div className="minicart__note">
          <h4>Order Note</h4>
          <div className="minicart__form--note">
            <form>
              <textarea placeholder="Eg: Thank you"></textarea>
            </form>
          </div>
        </div>

        <div className="minicart__checkout">
          <div className="minicart__subtotal">
            <h4>Subtotal</h4>
            <span>${this.state.totalPrice / 100.0}</span>
          </div>
          <p>Shipping, taxes, and discounts codes calculated at checkout.</p>
          <button type="button">Check out</button>
        </div>
      </>
    );
  }
}

export default Minicart;
