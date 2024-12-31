t = 53;
p = 0;
pm = $('.cards_inner__card').length;

$('.cards_inner__card').mousedown(function(){
  var ct = $(this).css('transform');
  var cts = ct.split(',')
  ctse = (cts[cts.length - 2] + 'px')
})

function on(){
  $('.cards_inner__card').draggable({
    start: function( event, ui ) {
      startPosition = ui.position.left;
    },
    drag:function(e, ui){
      if(ui.position.left > startPosition){
        ui.position.left = startPosition;
      }
      if(ui.position.left < -250){
        ui.position.left = -250;
      }
      x = ui.position.left;
      $(this).css('transform',' rotate(' + x/36 + 'deg)')
    },
    revert:function(valid) {
      if(x > 60 || x < - 60) {
        el = $(this)
        setTimeout(function(){
          el_class = el.attr('class').split(' ');
          el_class_end = el_class[1]
          el.addClass('invalid')
          if(p < 3){
            $('.points').find('.active').removeClass('active').next().addClass('active') 
            p++
          } else {
            $('.points').find('.active').removeClass('active')
            $('.points').find('.first').addClass('active') 
            p=0
          }
        },10)
        setTimeout(function(){
          $('.cards_inner__card').each(function(){
            $(this).addClass('animate');
            var ct = $(this).css('transform');
            var cts = ct.split(',')
            ctse = (parseInt(cts[cts.length - 2]) + 60 + 'px')
            $(this).css('transform','translateZ(' + ctse + ')');
          });
          $('.cards_inner .wrap').prepend('<div class="cards_inner__card ' + el_class_end + ' card_in"><div class="logo"></div></div>')
          el.remove();
          $('.cards_inner__card').removeClass('animate');
          on();
        },160);
        setTimeout(function(){
          $('.card_in').removeClass('card_in')
        },500);
      } else {
        $(this).css('transform','rotate(0deg)')
        return !valid;
      }
    },
    axis:'x',
    containment:'.cards_inner'
  });
  $('.cards_inner__card:nth-of-type(1)').draggable( 'disable' )
  $('.cards_inner__card:nth-of-type(2)').draggable( 'disable' )
  $('.cards_inner__card:nth-of-type(3)').draggable( 'disable' )
  $('.cards_inner__card:nth-of-type(4)').draggable( 'enable' )
}
on();
