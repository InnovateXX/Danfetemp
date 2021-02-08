const LS_CT_LOGIN = 'ct_login';
const LS_CT_EVENT_DATA = 'ct_event_data';
const LS_CT_EVENT_METHOD = 'ct_event_method';
const urlPath = window.location.pathname;
const url = window.location.href;
const userEmailId = window.userEmail;
const userMobileNumber = window.userMobileNumber;
const userId = userEmailId ? userEmailId : 'guest user'
const userMobile = userMobileNumber ? userMobileNumber : ''
const firstName = window.first_name ? window.first_name : ''
const lastName = window.last_name ? window.last_name : ''
const gender = window.gender;
const brand = window.brandName;
const mustHaves = "Home page Must Haves Section";
const homePage = "Home Page Section1";

$(document).ready(function () {
    if (typeof clevertap === "undefined") return;

    const pages = [
        "",
        "/cart/",
        "/return/",
        "/cancel/",
        "/offers/",
        "/orders/",
        "/payment/",
        '/contact-us/',
        '/faq/',
        '/shipping/',
        '/store/findourstore/',
        '/saved-addresses/',
    ];

     // Pushing logged in user data to clevertap
     $('.loginButton').click(function() {
        let loginData = {
            "User Email": userEmailId, 
            "User Mobile":  '+91' + userMobile,
            "Name": firstName + ' ' + lastName,
            "Gender": gender in [0,1] ? "M" : "F"
        };
        const data = {
            "Site": Object.assign({
                "Identity": "4R6-6W7-Z65Z",
            }, loginData)
        };
        clevertap.onUserLogin.push(data);
        clevertap.profile.push(data);
    });

    const isListPage = urlPath.includes("/products/");
    const isbrandPage = brand && brand.length;
    // const loginData = localStorage.getItem(LS_CT_LOGIN);
    // const eventData = localStorage.getItem(LS_CT_EVENT_DATA);
    // const cleverTapIdentity = localStorage.getItem('clevertap_id');
    // if (loginData) {
    //     const data = {
    //         "Site": Object.assign({
    //             "Identity": cleverTapIdentity,
    //         }, JSON.parse(loginData))
    //     };
    //     localStorage.removeItem(LS_CT_LOGIN)
    //     localStorage.removeItem('clevertap_id');
    //     clevertap.onUserLogin.push(data);
    // }

    // if (eventData) {
    //     const method = localStorage.getItem(LS_CT_EVENT_METHOD);
    //     localStorage.removeItem(LS_CT_EVENT_DATA)
    //     localStorage.removeItem(LS_CT_EVENT_METHOD)
    //     clevertap.event.push(method, JSON.parse(eventData));
    // }
    
    if (pages.includes(urlPath) || isListPage) {
        let pageName = urlPath.slice(1, -1);
        if (isListPage) {
            pageName = 'product list page'
        }
        clevertap.event.push("page view", {
            'page name': `${pageName} page`,
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    }

    if (isListPage) {
        const category = urlPath.split('/products/')[1].split('/')[0];
        clevertap.event.push("category view", {
            'category': category,
            'brand': brand,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'page URL': url,
        });
    }

    if (urlPath === '/wishlist/') {
        const wishListLength = $('.wishlist-item').length;
        clevertap.event.push("page view", {
            'page name': 'wishlist page',
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
        clevertap.event.push("wishlist view", {
            'source': 'profile page',
            'no of items': wishListLength,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    }

    if (urlPath === '/checkout/') {
        const cartSize = $('.cart-size').html();
        const cartTotal = $('.cart-total').html();
        clevertap.event.push("page view", {
            'page name': 'checkout page',
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
        clevertap.event.push("checkout initiated", {
            'cart size': cartSize,
            'cart total': cartTotal,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    }

    if (urlPath === '/payment/') {
        const cartSize = $('.cart-size').html();
        const cartTotal = $('.cart-total').html();
        clevertap.event.push("page view", {
            'page name': 'payment page',
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
        clevertap.event.push("payment initiated", {
            'cart size': cartSize,
            'cart total': cartTotal,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    }

    if (isbrandPage) {
        clevertap.event.push("brand view", {
            'brand name': isbrandPage,
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    }

    $('.pd-size-item').click(function (event) {
        if (isListPage) {
            const category = urlPath.split('/products/')[1].split('/')[0];
            const productName = $('.product-name').html();
            const mrp = $('.product-mrp').html();
            const sp = $('.product-price').html();
            const discount = $('.product-discount').html();
            const data = {
                name: productName,
                mrp: mrp,
                price: sp,
                discount: discount,
                category: category
            }
            sendClevertapAddToCart(data)
        }
    });

    $('#find_location').keypress(function (e) {
        const location = $('.store-location').html();
        clevertap.event.push("find store", {
            'location': location,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    });

    $('.faq').click(function (e) {
        const faq = $(this).attr('data-faq');
        clevertap.event.push("visit faq", {
            'faq selected': faq,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    });

    $(document).on('click', '.doWishlist', function (event) {
        if (userId === "guest user") return;
        const productName = $('.product-name').html();
        const mrp = $('.product-mrp').html();
        const sp = $('.product-price').html();
        const discount = $('.product-discount').html();
        if (urlPath.includes('products'))
            var category = urlPath.split('/products/')[1].split('/')[0];
        else if (urlPath.includes('product'))
            var category = window.productCategory;
        clevertap.event.push("add to wishlist", {
            'product name': productName,
            'mrp': mrp,
            'sp': sp,
            'discount': discount,
            'page URL': url,
            'category': category,
            'sub category': "",
            'brand': brand,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'product details page'
        });
    });

    $(document).on('click', '.wishlisted', function (event) {
        if (userId === "guest user") return;
        const productName = $('.product-name').html();
        const mrp = $('.product-mrp').html();
        const sp = $('.product-price').html();
        const discount = $('.product-discount').html();
        if (urlPath.includes('products'))
            var category = urlPath.split('/products/')[1].split('/')[0];
        else if (urlPath.includes('product'))
            var category = window.productCategory;
        clevertap.event.push("remove from wishlist", {
            'product name': productName,
            'mrp': mrp,
            'sp': sp,
            'discount': discount,
            'page URL': url,
            'category': category,
            'sub category': "",
            'brand': brand,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'product details page'
        });
    });

    $('.remove-cart-item').click(function () {
        clevertap.event.push("remove from cart", {
            'source': 'cart page',
            'brand': $('.product-brand').html(),
            'product name': $('.prod-name').html(),
            'mrp': $('.product-mrp').html(),
            'sp': $('.product-price').html(),
            'discount': $('.product-discount').html(),
            'page URL': url,
            'size': $('.cart_item_size option:selected').html(),
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    }); 

    $('.move-to-wishlist').click(function () {
        clevertap.event.push("move to wishlist from cart", {
            'source': 'cart page',
            'brand': $('.product-brand').html(),
            'product name': $('.prod-name').html(),
            'mrp': $('.product-mrp').html(),
            'sp': $('.product-price').html(),
            'discount': $('.product-discount').html(),
            'page URL': url,
            'size': $('.cart_item_size option:selected').html(),
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    });

    $('#quickBuyNow').click(function () {
        const sizeElement = $('.size-available').html();
        if (sizeElement == undefined || sizeElement.length == 0) return;
        const size =sizeElement;
        const productName = $('.product-name').html();
        const price = $('.product-price').html();
        const mrp = $('.product-mrp').html();
        const discount = $('.product-discount').html();
        const category = window.productCategory;

        clevertap.event.push("buy now", {
            'source': 'product details page',
            'product name': productName,
            'mrp': mrp,
            'sp': price,
            'discount': discount,
            'page URL': url,
            'category': category,
            'sub category': category,
            'brand': brand,
            'size': size,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    });

    $('.size-chart-trigger').click(function () {
        clevertap.event.push("size chart clicks", {
            'brand': brand,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    })

    $('.quickView'). click(function (e) {
        const category = urlPath.split('/products/')[1].split('/')[0];
        clevertap.event.push("quick view", {
            'product name': $('.product-name').html(),
            'mrp': $('.product-mrp').html(),
            'sp': $('.product-price').html(),
            'page URL': url,
            'category': category,
            'sub category': "",
            'brand': brand,
             'user id': userId,
             'mobile number': userMobile,
            'platform': 'web',
        });
    });

    $('#send-email').click(function () {
        const formData = $('.contactus_form').serializeArray();
        clevertap.event.push("contact us", {
            'type': 'support',
            'first name': formData[1].value,
            'last name': formData[2].value,
            'email': formData[3].value,
            'phone': formData[4].value,
            'subj': formData[5].value,
            'message': formData[6].value,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    });

    $('.filt-display li').change(function() {
        const filterApplied = $(this).find('label').attr('title');
        clevertap.event.push("Filter selection", {
            'brand': brand,
            'filter selected': filterApplied,
            'page URL': window.location.href,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    });
    
    $('#whatsapp-share').click(function() {
        clevertap.event.push("whatsapp share", {
            'brand': brand,
            'category': window.productCategory,
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    });

    $('.sort-desk-item').click(function () {
        const selectedText = $(this).attr('data-sort');
        onSort(selectedText);
    });

    $('.sort-input').click(function () {
        const selectedText = $(this).attr('data-sort-mobile');
        onSort(selectedText);
    });

    function onSort(selectedText) {
        const category = urlPath.split('/products/')[1].split('/')[0];
        clevertap.event.push("sort", {
            'sort selected': selectedText,
            'category': category,
            'brand': brand,
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web'
        });
    }

    $('.order-cancel').click(function () {
        Date.prototype.toShortFormat = function() {
            var month_names =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            var day = this.getDate();
            var month_index = this.getMonth();
            var year = this.getFullYear();
            return "" + day + "-" + month_names[month_index] + "-" + year;
        }
        let products = []
        const orderId = $(this).attr('data-order');
        const reason = $('#cancel-reason-'+orderId).val();
        const itemsCount = $('#items-count-'+orderId).html();
        const cancelledDate = new Date();
        for (let i=1; i<=itemsCount; i++) {
            var productDetails = $('#prod-'+i+'-'+orderId).attr('data-product');
            products[i] = JSON.parse(productDetails);
        }
        let cancelData={
            'cancellation reason': reason,
            'order id': orderId,
            'total items': itemsCount,
            'cancelled on': cancelledDate.toShortFormat(),
            'placed on': cancelledDate.toShortFormat(),
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        }
        for (let i=1;i<=itemsCount;i++) {
            let productName = 'product'+i+' name';
            let productBrand = 'product'+i+' brand';
            let productMrp = 'product' + i + 'mrp';
            let productSp = 'product' + i + ' sp';
            let productDiscount = 'product' + i + ' discount';
            let productSize = 'product' + i + 'size';
            let productPageUrl = 'product' + i + ' page URL';
            cancelData[productName]=products[i].name;
            cancelData[productBrand]=products[i].brand;
            cancelData[productMrp] = products[i].mrp;
            cancelData[productSp] = products[i].sp;
            cancelData[productDiscount] = products[i].discount;
            cancelData[productSize] = products[i].size;
            cancelData[productPageUrl] = products[i].product_url;
        }
        clevertap.event.push("order-cancellation", cancelData);
    });

    $('#add-address-button').click(function () {
        const formData = $('#addressForm').serializeArray();
        clevertap.event.push("Add Address",{
            'pincode': formData[4].value,
            'city':formData[7].value,
            'state': formData[8].value,
            'type': formData[9].value,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    });

    $('.homepage-section1-banner1').click(function(){
        const urlPath = $(this).attr('data-section1-banner1');
        const currentUrl = window.location.href;
        const url = currentUrl.slice(0, -1) + urlPath;
        const imageURL = $(this).children('img').attr('src');
        clevertap.event.push(homePage + " Banner1 Clicks", {
            'Landing page URL': url,
            'image URL': imageURL,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.homepage-section1-banner2').click(function(){
        const urlPath = $(this).attr('data-section1-banner2');
        const currentUrl = window.location.href;
        const url = currentUrl.slice(0, -1) + urlPath;
        const imageURL = $(this).children('img').attr('src');
        clevertap.event.push(homePage + " Banner2 Clicks", {
            'Landing page URL': url,
            'image URL': imageURL,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.homepage-section1-banner3').click(function(){
        const urlPath = $(this).attr('data-section1-banner3');
        const currentUrl = window.location.href;
        const url = currentUrl.slice(0, -1) + urlPath;
        const imageURL = $(this).children('img').attr('src');
        clevertap.event.push(homePage + " Banner3 Clicks", {
            'Landing page URL': url,
            'image URL': imageURL,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.brand-banner').click(function(){
        let urlPath = $(this).attr('data-url');
        const imageUrl = $(this).children('img').attr('src');
        const url = window.location.href + urlPath.split("/")[2] + "/" + urlPath.split("/")[3] + "/";
        clevertap.event.push(brand + " page section1 banner clicks", {
            'brand': brand,
            'image URL': imageUrl,
            'landing page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.category-name').click(function(){
        let urlPath = $(this).attr('data-category');
        const category_name = $(this).attr('data-category-name');
        const imageUrl = $(this).children('img').attr('src');
        const url = window.location.href + urlPath.split("/")[2] + "/" + urlPath.split("/")[3] + "/";
        clevertap.event.push(brand + " page top categories section banner clicks", {
            'brand': brand,
            'image URL': imageUrl,
            'landing page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'category': category_name,
            'banner title name': 'Top Categories',
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.section2-banner').click(function(){
        let urlPath = $(this).attr('data-section2');
        const dataBannerName = $(this).attr('data-banner-name');
        const imageUrl = $(this).children('img').attr('src');
        const url = window.location.href + urlPath.split("/")[2] + "/" + urlPath.split("/")[3] + "/";
        clevertap.event.push(brand + " page section2 banner clicks", {
            'brand': brand,
            'banner title name': dataBannerName, 
            'image URL': imageUrl,
            'landing page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.section3-banner').click(function(){
        let urlPath = $(this).attr('data-section3');
        const dataBannerName = $(this).attr('data-section3-name');
        const imageUrl = $(this).children('img').attr('src');
        const url = window.location.href + urlPath.split("/")[2] + "/" + urlPath.split("/")[3] + "/";
        clevertap.event.push(brand + " page section3 banner clicks", {
            'brand': brand,
            'banner title name': dataBannerName, 
            'image URL': imageUrl,
            'landing page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.brand-video').click(function(){
        const dataBannerName = $('.why-brand-title').html();
        const videoUrl = $(this).attr('data-video');
        const imageUrl = $(this).attr('data-img');
        clevertap.event.push(brand + " page video section clicks", {
            'brand': brand,
            'banner title name': dataBannerName, 
            'banner video URL': videoUrl,
            'image URL': imageUrl,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.wrogn-tribe').click(function() {
        const bannerName = 'WROGN Tribe';
        const urlPath = $(this).attr('data-url');
        const imageUrl = $(this).children('img').attr('src');
        const url = window.location.href + urlPath.split("/")[2];
        clevertap.event.push("Wrogn Tribe Banner Clicks", {
            'brand': brand,
            'banner title name': bannerName, 
            'landing page url': url,
            'image URL': imageUrl,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.shop-collection').click(function() {
        const urlPath = $(this).attr('data-url');
        const url = window.location.href + urlPath.split("/")[2] + "/" + urlPath.split("/")[3] + "/";
        clevertap.event.push(brand + " page Shop Collection Link", {
            'brand': brand,
            'landing page url': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.must-have-tshirt').click(function() {
        const urlPath = $(this).attr('data-url');
        const url = window.location.href + urlPath;
        const imageUrl = $(this).children('img').attr('src');
        clevertap.event.push(mustHaves + " - T Shirts Clicks", {
            'landing page url': url,
            'brand': 'wrogn',
            'image URL': imageUrl,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.must-have-sweatshirt').click(function() {
        const urlPath = $(this).attr('data-url');
        const url = window.location.href + urlPath;
        const imageUrl = $(this).children('img').attr('src');
        clevertap.event.push(mustHaves + " - Sweat Shirts Clicks", {
            'landing page url': url,
            'brand': 'wrogn',
            'image URL': imageUrl,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.must-have-kurtas').click(function() {
        const urlPath = $(this).attr('data-url');
        const url = window.location.href + urlPath;
        const imageUrl = $(this).children('img').attr('src');
        clevertap.event.push(mustHaves + " - Kurtas & Kurtis Clicks", {
            'landing page url': url,
            'brand': 'imara',
            'image URL': imageUrl,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.must-have-churidar').click(function() {
        const urlPath = $(this).attr('data-url');
        const url = window.location.href + urlPath;
        const imageUrl = $(this).children('img').attr('src');
        clevertap.event.push(mustHaves + " - Churidar Set Clicks", {
            'landing page url': url,
            'brand': 'imara',
            'image URL': imageUrl,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.wrogn-section3-brands').click(function() {
        const urlPath = $(this).attr('data-wrogn-section3');
        const url = window.location.href + urlPath;
        const imageUrl = $(this).children('img').attr('src');
        clevertap.event.push( "Home Page Section3 Brands - Wrogn Clicks", {
            'landing page url': url,
            'brand': 'wrogn',
            'image URL': imageUrl,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.imara-section3-brands').click(function() {
        const urlPath = $(this).attr('data-imara-section3');
        const url = window.location.href + urlPath;
        const imageUrl = $(this).children('img').attr('src');
        clevertap.event.push( "Home Page Section3 Brands - Imara Clicks", {
            'landing page url': url,
            'brand': 'imara',
            'image URL': imageUrl,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('#bestoffers-banner-1').click(function() {
        const bannerTitle = $('#bestoffers-title-1').html();
        const bannerDetail = $('#bestoffers-detail-1').html();
        const bannerName = bannerTitle + " " +bannerDetail;
        let urlPath = $(this).attr('data-bestoffers');
        urlPath = urlPath.slice(1);
        const url = window.location.href + urlPath;
        clevertap.event.push( "Home Page Section2 - Best Offers Banner1", {
            'landing page url': url,
            'banner Name': bannerName,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('#bestoffers-banner-2').click(function() {
        const bannerTitle = $('#bestoffers-title-2').html();
        const bannerDetail = $('#bestoffers-detail-2').html();
        const bannerName = bannerTitle + " " +bannerDetail;
        let urlPath = $(this).attr('data-bestoffers');
        urlPath = urlPath.slice(1);
        const url = window.location.href + urlPath;
        clevertap.event.push( "Home Page Section2 - Best Offers Banner2", {
            'landing page url': url,
            'banner Name': bannerName,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('#bestoffers-banner-3').click(function() {
        const bannerTitle = $('#bestoffers-title-3').html();
        const bannerDetail = $('#bestoffers-detail-3').html();
        const bannerName = bannerTitle + " " +bannerDetail;
        let urlPath = $(this).attr('data-bestoffers');
        urlPath = urlPath.slice(1);
        const url = window.location.href + urlPath;
        clevertap.event.push( "Home Page Section2 - Best Offers Banner3", {
            'landing page url': url,
            'banner Name': bannerName,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.cod-payment').click(function() {
        const amount = $(this).attr('data-cod-amount');
        clevertap.event.push( "Payment Type Clicks - COD", {
            'payment type': 'Cash on Delivery',
            'payment amount': amount,
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.prepaid-payment').click(function() {
        const amount = $(this).attr('data-prepaid-amount');
        clevertap.event.push( "Payment Type Clicks - prepaid", {
            'payment type': 'Prepaid',
            'payment amount': amount,
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    });

    $('.storie').click(function() {
        let storyImage = $(this).attr('data-storyimage');
        let storyCategory = $(this).attr('data-storycategory');
        $('.story-item').click(function () { 
            let storyItem = $('.story-name').html();
            clevertap.event.push(brand + " Flash Sale - " + storyCategory + " " + storyItem + " clicks", {
                'user id': userId,
                'mobile number': userMobile,
                'category': storyCategory,
                'category Image URL': storyImage,
                'category Item': storyItem,
                'item landing page URL': url,
                'platform': 'web',
            });
        });
    });

    $('.game-click').click(function() {
        clevertap.event.push( "Game Clicks", {
            'page URL': url,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
            'source': 'home page',
        });
    })

    $('.apply-new-coupon').click(function(){
        const couponApplied = $(this).attr('data-value');
        clevertap.event.push("Apply coupon", {
           'coupon code': couponApplied,
            'user id': userId,
            'mobile number': userMobile,
            'platform': 'web',
        });
    });
});
const onCleverTapLogin = (event, data) => {
    const userData = data.data.user_details;
    const profileData = {
        "Name": userData.first_name && userData.first_name + ' ' + userData.last_name ,
        "Email": userData.email,
        "Phone": userData.mobile_number && '+91' + userData.mobile_number,
        "Gender": userData.gender in [0,1] ? 'M' : 'F',
    };
    Object.keys(profileData).forEach((key) => (profileData[key] == null) && delete profileData[key]);
    localStorage.setItem(LS_CT_LOGIN, JSON.stringify(profileData))

    let type = localStorage.getItem('sign_in_method') || '';
    let method = '';
    if (type.includes('Sign Up')) {
        method = 'Sign Up';
    } else {
        method = 'Sign In';
    }

    localStorage.setItem(LS_CT_EVENT_METHOD, method);
    localStorage.setItem(LS_CT_EVENT_DATA, JSON.stringify({
        'source': 'Sign In Page - Pop Up',
        'type': type,
        'user id': userData.email,
        'platform': 'web',
    }));
}

$(function() {
    if (typeof(clevertap) === "undefined") return;
    $(".loginButton").on("loggedIn", onCleverTapLogin);
    $("#content").on("productDetailsViewed", function(_event, productDetails) {
        sendClevertapPDPView(productDetails);
    });
    const $addToCart = $("#quickAddToCart");
    $addToCart.on("addedToCart", function() {
        const productDetails = window.analytics.getProductDetails($(this));
        sendClevertapAddToCart(productDetails);
    });
})

function sendClevertapPDPView(productDetails) {
    // const userEmailId = localStorage.getItem('customer_emailid');
    // const userId = userEmailId ? userEmailId : 'guest user'
    const url = window.location.href;
    clevertap.event.push("product view", {
        'Product name': productDetails.name,
        'mrp': productDetails.mrp,
        'sp': productDetails.price,
        'discount': productDetails.mrp - productDetails.price,
        'page URL': url,
        'category': productDetails.category,
        'brand': productDetails.brand,
        'color': 'white',
        'user id': userId,
        'mobile number': userMobile,
        'platform': 'web',
        'source': 'product list page'
    });
    clevertap.event.push("page view", {
        'page name': 'product details page',
        'page URL': url,
        'user id': userId,
        'mobile number': userMobile,
        'platform': 'web',
    });
}

function sendClevertapAddToCart(data) {
    clevertap.event.push("add to cart", {
        'Product name': data.name,
        'mrp': data.mrp,
        'sp': data.price,
        'discount': data.discount,
        'page URL': url,
        'category': data.category,
        'sub category': "",
        'brand': brand,
        'color': 'white',
        'quantity': 1,
        'user id': userId,
        'mobile number': userMobile,
        'platform': 'web',
        'source': 'product list page'
    });
}


//nezil added
function clevertapSearchEvent(data)
{
    clevertap.event.push("search", {
        'text': data.term,
        'user id': userId,
        'mobile number': userMobile,
        'search results': data.results,
        'filter selected': "",
        'platform': 'web',
    });
}