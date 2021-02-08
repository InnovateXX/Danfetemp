$(function() {
  if (typeof fbq !== "undefined" && fbq) return;
  const $addToCart = $("#quickAddToCart");
  $addToCart.on("addedToCart", function() {
    const productDetails = window.analytics.getProductDetails($(this));
    fbq("track", "AddToCart", {
      content_ids: [productDetails.sku],
      content_type: "product",
      value: productDetails.price,
      currency: "INR"
    });
  });
});
