window.onload = function() {

    var clock = {
        modes:{
            time:function() {

                var now = new Date(),
                  time = time = (now.getHours() > 9 ? now.getHours() : '0' + now.getHours()) +
                                 ':' +
                                 (now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes());
                return time;
                
            },
            timeWithSeconds:function() {

                var now = new Date(),
                  time = (now.getHours() > 9 ? now.getHours() : '0' + now.getHours()) +
                                 ':' +
                                 (now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes()) +
                                 ':' +
                                 (now.getSeconds() > 9 ? now.getSeconds() : '0' + now.getSeconds());
                                 
                return time;

            },
            date:function() {

                var now = new Date(),
                  date = (now.getDate() > 9 ? now.getDate() : '0' + now.getDate()) +
                                 '/' +
                                 ((now.getMonth()+1) > 9 ? (now.getMonth() + 1) : "0" + (now.getMonth() + 1)) +
                                 '/' +
                                 now.getFullYear();
                return date;

            }
        },
        currentMode:'time',
        
        showTime:function(){
            document.getElementById('clock').innerHTML = '<h1>' + this.modes[this.currentMode]() + '</h1>';             
        }

    };

    setInterval(function(){
        clock.showTime();
    }, 1000);
    document.getElementById('clock').onclick = function(){
        clock.currentMode = 'timeWithSeconds';

    }
    document.getElementById('clock').oncontextmenu = function(){
        clock.currentMode = 'date';
        return false;
    }

    
        var clockDraggable = document.getElementById('clock');
         
        clockDraggable.onmousedown = function(e) {
          var self = this,
            coords = getCoords(this),
            shiftX = e.pageX - coords.left,
            shiftY = e.pageY - coords.top;

          e = fixEvent(e);
                            
          this.style.position = 'absolute';
          document.body.appendChild(this);
          moveAt(e);
         
          this.style.zIndex = 1000; // над другими элементами
         
          function moveAt(e) {
            self.style.left = e.pageX - shiftX + 'px';
            self.style.top = e.pageY - shiftY+ 'px';
          }
         
          document.onmousemove = function(e) {
            e = fixEvent(e);
            moveAt(e);
          };
         
          this.onmouseup = function() {
            document.onmousemove = self.onmouseup = null;
          };
         
        }
         
        clockDraggable.ondragstart = function() {
          return false;
        };

        function fixEvent(e) {
            // получить объект событие для IE
            e = e || window.event;
         
            // добавить pageX/pageY для IE
            if ( e.pageX == null && e.clientX != null ) {
                var html = document.documentElement,
                  body = document.body;
                e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
                e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
            }
         
            // добавить which для IE
            if (!e.which && e.button) {
                e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );
            }
         
            return e;
        }

        function getCoords(elem) {
            var box = elem.getBoundingClientRect(),
              body = document.body,
              docEl = document.documentElement,
              scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
              scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
              clientTop = docEl.clientTop || body.clientTop || 0,
              clientLeft = docEl.clientLeft || body.clientLeft || 0,
              top  = box.top +  scrollTop - clientTop,
              left = box.left + scrollLeft - clientLeft;
            return { top: Math.round(top), left: Math.round(left) };
        }

    
}