function sendMSDItemClick(event) {
  let userId = window.userEmail;
  let vendor = window.brandName;
  let data = this.dataset;
  let posOfReco = data.id;
  let widgetType = data.type;
  let sourceProdID = window.location.pathname
    .split("/")[4]
    .split("-")[0]
    .toUpperCase();
  MSDtrack({
    event: "carouselClick",
    userID: userId,
    pageType: "Product details page",
    sourceProdID: sourceProdID,
    sourceCatgID: window.productCategory,
    prodPrice: data["price"],
    destProdID: data["sku"],
    destCategID: window.brandName,
    posOfReco: posOfReco,
    widgetID: widgetType === "similar" ? 0 : 8,
    currency: "INR",
    vendor: vendor
  });
}

window.sendMSDItemClick = sendMSDItemClick;

$(function() {
  if (typeof MSDtrack === "undefined") return;
  let isOtherPage = false;
  let isHomePage = false;
  let isPdpPage = false;
  let urlPath = window.location.pathname;
  let homePages = ["/wrogn/", "/imara/", "/mstaken/", ""];
  let otherPages = [
    "/wishlist/",
    "/cart/",
    "/checkout/",
    "/return/",
    "/cancel/",
    "/offers/",
    "/orders/",
    "/payment/"
  ];
  let pdpPages = ["/product/details/", "/product/quickview/"];
  let userId = window.userEmail || "guest";
  let vendor = urlPath.split("/")[1];

  isHomePage = homePages.includes(urlPath);
  isOtherPage = otherPages.includes(urlPath) || urlPath.includes("/products/");
  isPdpPage = pdpPages.some(str => urlPath.includes(str));

  if (isHomePage) {
    MSDtrack({
      event: "pageView",
      pageType: urlPath.substr(1).slice(0, -1) + " home page",
      userID: userId,
      vendor: vendor
    });
  } else if (isPdpPage) {
    let sourceProdID = urlPath
      .split("/")[4]
      .split("-")[0]
      .toUpperCase();
    const sourceCategID = window.productCategory;
    if (!$("#quickAddToCart").length) return;
    const productDetails = window.analytics.getProductDetails(
      $("#quickAddToCart")
    );

    MSDtrack({
      event: "pageView",
      pageType: urlPath.substr(1).slice(0, -1) + " -PDP Page",
      userID: userId,
      sourceProdID: sourceProdID,
      sourceCatgID: sourceCategID,
      prodPrice: productDetails.price,
      vendor: vendor
    });
  } else if (isOtherPage) {
    MSDtrack({
      event: "pageView",
      pageType: urlPath.substr(1).slice(0, -1),
      userID: userId,
      vendor: ""
    });
  }
});

function msdAddtoCart(productDetails) {
  MSDtrack({
    event: "addToCart",
    pageType: "details",
    userID: userId,
    sourceProdID: productDetails.id,
    sourceCategID: window.productCategory,
    prodPrice: productDetails.price,
    vendor: brand
  });
}

$(function() {
  const $addToCart = $("#quickAddToCart");
  $addToCart.on("addedToCart", function() {
    const productDetails = window.analytics.getProductDetails($(this));
    msdAddtoCart(productDetails);
  });
});
