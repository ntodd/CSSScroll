// ==================================
// = WARNING: Sunday Afternoon Code =
// ==================================

$(document).ready(function() {
  var contentDiv = document.getElementById('content');

  // Generate content in JS because it's easier
  var fragment = document.createDocumentFragment();
  for (var row = 0; row < 8; row++) {
  	for (var col = 0; col < 20; col++) {
  		element = document.createElement('div');
      element.className = 'block';
  		element.innerHTML = row + ',' + col;
  		fragment.appendChild(element);
  	}
  }
  contentDiv.appendChild(fragment);
  
  var content = {
    x : 0,
    y : 0,
    move : function (x, y, inertial) {
      if (inertial) {
        $('#content').css('-webkit-transition', '-webkit-transform .7s cubic-bezier(0,0,0.15,1.0)');
        $('#content').css('-webkit-transform', 'translate3d(' + x + 'px,' + y + 'px, 0) perspective(500px) rotateX(0) rotateY(0)');
      } else {
        // Cool drag effect
        var coefficient = 10;
        var rotateX = (mouse.vY / coefficient) * -1;
        var rotateY = mouse.vX / coefficient;

        // Override silly drag effect – it ain't ready yet.
        rotateY = rotateX = 0;

        $('#content').css('-webkit-transition', 'none');
        $('#content').css('-webkit-transform', 'translate3d(' + x + 'px,' + y + 'px, 0) perspective(500px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)');
      };
    }
  };
  
  var mouse = {
    x : 0,
    y : 0,
    vX : 0,
    vY : 0,
    startX : 0,
    startY : 0,
    active : false
  };

  $('#container').mousedown(function(e) {
    mouse.active = true;
    mouse.startX = e.pageX;
    mouse.startY = e.pageY;
    
    // Reset mouse velocity in case there is no move
    mouse.vX = mouse.vY = 0;
    
    // Note content coords to use as offset
    content.x = $('#content').position().left;
    content.y = $('#content').position().top;
  });

  $('#container').mouseup(function(e) {
    mouse.active = false;
    
    // Inertial scrolling calculation
    var coefficient = 5;
    var offsetX = e.pageX + (mouse.vX * coefficient) - mouse.startX + content.x;
    var offsetY = e.pageY + (mouse.vY * coefficient) - mouse.startY + content.y;

    // Fire off final inertial move
    content.move(offsetX, offsetY, true);    
  });

  $('#container').mousemove(function(e) {
    if (mouse.active) {
      
      // Calculate mouse velocity
      mouse.vX = e.pageX - mouse.x;
      mouse.vY = e.pageY - mouse.y;

      // Update mouse coords
      mouse.x = e.pageX;
      mouse.y = e.pageY;

      // Move content within container
      var offsetX = e.pageX - mouse.startX + content.x;
      var offsetY = e.pageY - mouse.startY + content.y;
      content.move(offsetX, offsetY, false);
    };
  });

});