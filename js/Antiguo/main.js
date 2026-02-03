document.addEventListener('DOMContentLoaded', () => {
    const elmentosCarousel = document.querySelectorAll('.carousel');
    M.Carousel.init(elmentosCarousel, {
        duration: 150,
        dist: -100,/*Perpesctiva */
        shift: 5,
        padding: 5,
        numVisible: 3,
        indicators: true,
        noWrap: false /*inicia en la primera imagen pero se pueden ver las demas tambien */
    });
});
$(document).ready(function(){
    $('.materialboxed').materialbox();/*inicializa el zoom */
  });
$(document).ready(function(){/*inicializa el menu lateral */
    $('.sidenav').sidenav();
    M.sidenav.init (ul,{
    });
});
$(document).ready(function(){/*inicializa el comentario de foto*/
    $('.tooltipped').tooltip();
  });
