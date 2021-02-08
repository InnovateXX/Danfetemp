
createURL();

function createURL (container) {
    if(container === undefined){
      container = document;
    }
    const windowWidth = $(window).width();
    if ( windowWidth <= 767 ) {
      const lazyImages = $(container).find('[data-mobile-image]');
      lazyImages.each(function (index) {
        if ( $(this).attr('data-mobile-image') !== undefined ) {
          $(this).attr('data-src', $(this).attr('data-mobile-image'));
        }
      });
    }
    else if ( windowWidth > 767 ) {
      const lazyImages = $(container).find('[data-desktop-image]');
      lazyImages.each(function (index) {
        if ( $(this).attr('data-desktop-image') !== undefined ) {
          $(this).attr('data-src', $(this).attr('data-desktop-image'));
        }
      });
    }
  }

  $(function () {
    $('[data-toggle="popover"]').popover({
      'html':true
    });
  })

  $('body').on('click', function (e) {
    $('[data-toggle=popover]').each(function () {
        // hide any open popovers when the anywhere else in the body is clicked
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
  });


$(function() {

  $( ".place-hold" ).each(function( index ) {
    if( $(this).val() )
      $(this).before("<span class='place-hold-text'> "+ $(this).attr('placeholder') +"</span>");
  });

  

});


$(document).ready(function(){

  $(document).on('focus','.place-hold', function(){
    $(this).before("<span class='place-hold-text'> "+ $(this).attr('placeholder') +"</span>");
    $(this).attr('data-placeholder',$(this).attr('placeholder'));
    $(this).attr('placeholder',' ');
    
  });

  $(document).on('blur','.place-hold', function(){
    $(this).prev(".place-hold-text").remove();
    if( !$(this).val() )
      $(this).attr('placeholder',$(this).attr('data-placeholder'));
  });

    $(function() {
        $('.lazy1').Lazy({
            effect: "fadeIn",
            effectTime: 100,
            threshold: 0,
            delay:10,
        } );
    });
    $(function() {
      $('.lazy').Lazy({
          effect: "fadeIn",
          effectTime: 2000,
          threshold: 100,
          visibleOnly:true,
      } );
  });

  const LS_DISPLAY_KEY = $('.top-notification').attr('data');
  if(!localStorage.getItem(LS_DISPLAY_KEY)) {
    $('.top-notification').removeClass('hide');
  }
  $('.top-notification .close-btn').click(function() {
    localStorage.setItem(LS_DISPLAY_KEY, "true");
    $('.top-notification').addClass('hide');
  });


});


$('.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    stagePadding:20,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        370:{
          items:2
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});

//autocomplete for search


$( function() {
  $( ".search-box" ).autocomplete({
    source: function( request, response ) {
      $.ajax( {
        url: '/api/search-api/',
        dataType: "json",
        data: {
          term: request.term,
          brand: ''
        },
        success: function( data ) {
          response( data );
          let eve={term : request.term , results : data.length};
          clevertapSearchEvent(eve);
          
        }
      } );
    },
    minLength: 2,
    select: function( event, ui ) {
      event.preventDefault();
      window.location.href = ui.item.value;
    },
    focus: function(event, ui) { 
      event.preventDefault(); 
      $(".search-box").val(ui.item.label);
    }
    
  } ).autocomplete( "instance" )._renderItem = function( ul, item ) {
    return $( "<li>" )
      .append( "<div>" + item.label + "<span class='auto-brand'>" + item.brand + "</span></div>" )
      .appendTo( ul );
  };
});

$(document).ready(function () {
    
    $('#dismiss, .overlay').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
        $('body').css('overflow','scroll');
    });

    $('#sidebarCollapse').on('click', function () {
        // open sidebar
        $('#sidebar').addClass('active');
        // fade in the overlay
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').css('overflow','hidden');
    });
    $("#sidebar").on('swipeleft',function(){
      $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
        $('body').css('overflow','scroll');
    });
    $(".overlay").on('swipeleft',function(){
      $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
        $('body').css('overflow','scroll');
    });
    $("#sidebar .has-child a").on('click',function(){
      $("#sidebar .collapse").not($(this).next('.collapse')).removeClass('show');
      $('#sidebar a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    
});

$(function() {
  $.get('/carts/items/', function(response) {
    $('.bagCount').html(response.count)
  })
});

function loadRecommentation(url, ctnr) {
    $.get(url, function(response) {
        if(response.length < 500) {
          $("#" + ctnr).parent().find('.hider-heading').addClass('hide');
        }
        $("#" + ctnr).html(response)
        $(`#${ctnr} .owl-carousel`).owlCarousel({
            loop:false,
            dots: false,
            margin:10,
            nav: true,
            navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            stagePadding:40,
            responsive:{
                0:{
                    items:1
                },
                370:{
                  items:2
                },
                600:{
                    items:3
                },
                1000:{
                    items:5
                }
            }
        });
        $(`#${ctnr}`).waypoint(function(direction) {
            $('.lazy1').Lazy({
              effect: "fadeIn",
              effectTime: 100,
              threshold: 0,
              delay:100,
            });
        }, {
            offset: '90%'
        });
       
    });
}


const $dropdown = $(".submenu .dropdown");
const $dropdownToggle = $(".dropdown-toggle");
const $dropdownMenu = $(".dropdown-menu");
const showClass = "show";
 
$(window).on("load resize", function() {
  if (this.matchMedia("(min-width: 768px)").matches) {
    $dropdown.hover(
      function() {
        const $this = $(this);
        $this.addClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "true");
        $this.find($dropdownMenu).addClass(showClass);
      },
      function() {
        const $this = $(this);
        $this.removeClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "false");
        $this.find($dropdownMenu).removeClass(showClass);
      }
    );
  } else {
    $dropdown.off("mouseenter mouseleave");
  }
});

const $dropdown1 = $(".p-hover");
const $dropdownMenu1 = $(".profile-dropdown-wrapper");
 
$(window).on("load resize", function() {
  if (this.matchMedia("(min-width: 768px)").matches) {
    $dropdown1.hover(
      function() {
        const $this = $(this);
        $dropdownMenu1.addClass('show');
      },
      function() {
        const $this = $(this);
        $dropdownMenu1.removeClass('show');
      }
    );

    $dropdownMenu1.hover(
      function() {
        const $this = $(this);
        $dropdownMenu1.addClass('show');
      },
      function() {
        const $this = $(this);
        $dropdownMenu1.removeClass('show');
      }
    );

  } else {
    
  }
});

$('.gamepop-mobile-click').click(function(e){
  e.preventDefault();
  $(this).toggleClass('showpop');
  $('.gamepop-mobile-body').slideToggle();
});
$('.gamepop-desktop-click').click(function(e){
  e.preventDefault();
  $('.gamepop-desktop').toggleClass('gamepop-desktop-popout');
});
