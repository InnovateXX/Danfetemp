const usplgtm = {};
window.usplgtm = usplgtm;
window.dataLayer = window.dataLayer || [];

usplgtm.viewProductDetails = productDetail => {
  window.dataLayer.push({
    event: "productDetails",
    ecommerce: {
      detail: {
        actionField: { list: "Apparel Gallery" },
        products: [productDetail]
      }
    }
  });
};

usplgtm.checkout = function(productList) {
  dataLayer.push({
    event: "checkout",
    ecommerce: {
      checkout: {
        actionField: { step: 1, option: "Visa" },
        products: productList
      }
    }
  });
};

usplgtm.onCheckoutOption = (checkoutOption, step) => {
  dataLayer.push({
    event: "checkoutOption",
    ecommerce: {
      checkout_option: {
        actionField: {
          step: step,
          option: checkoutOption
        }
      }
    }
  });
};

usplgtm.onPurchases = productList => {
  dataLayer.push({
    event: "purchase",
    ecommerce: {
      purchase: {
        actionField: productList.actionField,
        products: productList.products
      }
    }
  });
};

usplgtm.addToCart = productDetail => {
  dataLayer.push({
    event: "addToCart",
    ecommerce: {
      currencyCode: "INR",
      add: {
        products: [productDetail]
      }
    }
  });
};

$(function() {
  const $addToCart = $("#quickAddToCart");
  $addToCart.on("addedToCart", function() {
    const productDetails = window.analytics.getProductDetails($(this));
    usplgtm.addToCart(productDetails);
  });

  $("#content").on("productDetailsViewed", function(_event, productDetails) {
    usplgtm.viewProductDetails(productDetails);
  });
});
