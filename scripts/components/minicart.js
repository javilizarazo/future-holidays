import React from "react";

const getCartData = async () => {
  const data = await fetch("/cart.js");
  return await data.json();
};

class Minicart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsInCart: [],
      totalPrice: 0,
      shop: {},
    };
  }

  componentDidMount() {
    this.cartData();
  }

  cartData = () => {
    getCartData().then(({ items, total_price }) => {
      let itemsInCart = items.map((element, index) => {
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
                    <input
                      type="number"
                      defaultValue={element.quantity}
                      key={element.quantity}
                      onBlur={(e) => this.updateAmount(index, e.target.value)}
                    />
                    <p>${this.itemValue(element.line_price)}</p>
                  </form>
                </div>
              </div>

              <button type="button" onClick={() => this.removeFromCart(index)}>
                X
              </button>
            </div>
          </React.Fragment>
        );
      });

      
      this.setState({
        itemsInCart: itemsInCart,
        totalPrice: total_price,
      });
    });
  };

  itemValue = (value) => {
    return (value / 100).toLocaleString();
  }

  removeFromCart = async (index) => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
      },
      body: JSON.stringify({
        line: index + 1,
        quantity: 0,
      }),
    };

    await fetch("/cart/change.js", request).then(() => {
      this.cartData();
    });
  };

  updateAmount = async (index, value) => {
    var request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
      },
      body: JSON.stringify({
        line: index + 1,
        quantity: value,
      }),
    };

    fetch("/cart/change.js", request).then(() => {
      this.cartData();
    });
  };

  closeMiniCart = () => {
    document.querySelector(".minicart").classList.remove("visible");
    document.querySelector('.bg-drop').classList.remove('visible');
    document.body.classList.remove("minicart-open");
  };

  render() {
    return (
      <>
        <header>
          <h2>{theme.strings.cartTitle}</h2>
          <button
            type="button"
            onClick={() => {
              this.closeMiniCart();
            }}
          >
            <img src={theme.closeIcon} />
          </button>
        </header>

        <div className="minicart__items">
          {this.state.itemsInCart.length ? (
            this.state.itemsInCart
          ) : (
            <p className="minicart__empty">Your cart is empty.</p>
          )}
        </div>

        <div className="minicart__note">
          <h4>{theme.strings.cartNote}</h4>
          <div className="minicart__form--note">
            <form>
              <textarea placeholder={theme.strings.orderNoteExample}></textarea>
            </form>
          </div>
        </div>

        <div className="minicart__checkout">
          <div className="minicart__subtotal">
            <h4>{theme.strings.cartSubtotal}</h4>
            <span>${this.itemValue(this.state.totalPrice)}</span>
          </div>
          <p>{theme.strings.taxesAndShipping}</p>
          <button type="button">{theme.strings.cardCheckout}</button>
        </div>
      </>
    );
  }
}

export default Minicart;
