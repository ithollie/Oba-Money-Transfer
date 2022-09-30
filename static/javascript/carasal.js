
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
      });

      // Or with jQuery

      $(document).ready(function(){
        $('.modal').modal();
      });

      var instance = M.Modal.getInstance(true);
      
      
    
    



    
      var instance = M.Carousel.init({
        fullWidth: true,
        indicators: true
      });

      // Or with jQuery

      $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      });
