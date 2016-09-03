(function () {
  "use strict";
  $(document).ready(function () {
    var i, index, imgDiv, source = $("#albums-template").html()
      , albums_template = Handlebars.compile(source)
      , html = albums_template(animals_data);
    $('#content').html(html);

    function galleryInit() {
      var gallery = $("#gallery-template").html();
      var gallery_template = Handlebars.compile(gallery);
      var album = gallery_template(animals_data);
      $('#gallery').html(album);
      $("#template").removeClass("temp");
      $("#template").addClass("new");
      $("div.album").find("img").addClass("newImg");
      $("button").removeClass("hidden");
    }

    function reload() {
      $("div.preview").removeClass("hidden");
      $("div.navbar-wrapper").addClass("hidden");
      $("div.gallery").addClass("hidden");
      $("div#temp.col-xs-12").addClass("hidden");
      $("div.template").addClass("hidden");
      $("button").toggleClass("hidden");
      $("div#template.temp").unwrap();
      $("span#category").remove();
      $("div#template.new").remove();
      $("body").scrollTop(0);
    }

    function loadGallery() {
      i = 0;
      $(document).find(".active").removeClass("active");
      i = index + 1;
      $("li:eq(" + i + ")").addClass("active");
      $("div.navbar-wrapper").removeClass("hidden");
      $("#template").find("div.album").find("img");
      $("div.preview").addClass("hidden");
      $("div.gallery").removeClass("hidden");
      $("button").removeClass("hidden");
      $("#template").removeClass("hidden");
      $("#temp").removeClass("hidden");
      $("#template").prepend("<span id='category'>{{#with category.[" + index + "]}}</span>");
      $("#template").wrap('<script id="gallery-template" type="text/x-handlebars-template"></script>');
      setTimeout(galleryInit(), 100);
      $("body").scrollTop(0);
    }

    function seeGallery(index) {
      if (index === 0) {
        loadGallery();
      }
      else if (index === 1) {
        loadGallery();
      }
      else if (index === 2) {
        loadGallery();
      }
    }
    $("div.preview").on("click", function () {
      $
      index = $(this).data("id");
      seeGallery(index);
    });
    $(document).on("click", "#navbar li", function () {
      $(this).html("HERE");
      index = $(this).data("id");
      reload();
      seeGallery(index);
    });
    $(document).on("click", "img.newImg", function () {
      imgDiv = $(this).parent();
      $("div.container").addClass("hidden");
      $("body").append("<h1 class='temporal'>" + $(this).attr("alt") + "</h1><div class='bigImage text-center col-xs-12 temporal'><img src='" + $(this).attr("src") + "' alt='" + $(this).attr("alt") + "' /><button class='close temporal'><i class='glyphicon glyphicon-remove-circle'></i></button></div>");
      $("body").scrollTop(0);
    });
    $(document).on("click", "button.close", function () {
      $(".temporal").remove();
      $("div.container").removeClass("hidden");
      $('html, body').animate({
        scrollTop: imgDiv.offset().top - 50
      }, 'slow');
    });
    $("button.back").on("click", reload);
    $(".navbar").hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.navbar').fadeIn(200);
      }
      else {
        $('.navbar').fadeOut(300);
      }
    });
    $(document).on("click", ".navbar-brand", reload);
  });
}());