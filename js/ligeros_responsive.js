document.addEventListener('DOMContentLoaded', function() {
    // Carousel
    var elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems, {
        fullWidth: false,
        indicators: true,
        duration: 200
    });

    // Materialbox (zoom imágenes)
    var images = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(images);

    // Sidenav
    var sidenavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavs);
});
