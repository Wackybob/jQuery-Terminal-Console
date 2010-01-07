(function() {
var TerminalVersion = "3.2";
  if (window.__jQuery_Terminal__) {

    window.__jQuery_Terminal__.toggle();

  } else {
    
    function init($) {
      
      function HistoryManager() {
        this.curr     = -1;
        this.entries  = [];
      };

      HistoryManager.prototype = {
        push: function(item) {
          if (this.entries.length && this.entries[0] == item) return;
          if (item.match(/^\s*$/)) return;
          this.entries.unshift(item);
          this.curr = -1;
        },
        scroll: function(direction) {
          var moveTo = this.curr + (direction == 'prev' ? 1 : -1);
          if (moveTo >= 0 && moveTo < this.entries.length) {
            this.curr = moveTo;
            return this.entries[this.curr];
          } else if (moveTo == -1) {
            this.curr = moveTo;
            return '';
          } else {
            return null;
          }
        }
      };
      
      var context = {},
          history = new HistoryManager(),
		  $dragtitle   = $('<div/>').css({backgroundColor: '#e0e0e0', border: '1px solid #a0a0a0', fontSize: '11px', fontFamily: 'sans-serif', lineHeight: 1, padding: '5px', marginBottom: '7px', cursor: 'move'}).html('<b>The jQuery Terminal Console   |  </b><a style="color: #b00; font-size: 11pt; font-weight: bold; text-decoration: none;" href="javascript:void(0);">jQTerminal </a><sup style="color: #999;">v' + TerminalVersion + '</sup> <div style="textAlign:right;" id="helpBtnBox"><img id="helpBtn" src="data:image/png;base64,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" style="cursor: pointer;" onClick=\'jQuery(document).trigger("help.terminal")\' /></div>'),
		  $drag   = $('<div/>').css({backgroundColor: '#e0e0e0', border: '1px solid #a0a0a0', fontSize: '11px', fontFamily: 'sans-serif', lineHeight: 1, padding: '5px', marginBottom: '7px', cursor: 'move', textAlign: 'left'}).html('<div/>').css({textAlign: 'right'}).html($('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjIyt5EXfQAAAlRJREFUOE990GtP01AcBvCjb9X4dUz8APoJzIYZbVzDLjJgJOCLObaJQQ1Gs0CGJLzgogwGhQEbDgE1xphoYsA4L8PNgZy1tRu1BXdhMXk8K4nywtjkl/P0nP+Tk/ZEuVzG4Zcs+TE9S36V9sj/npNnTpOzFy+QU+fPEaJtvkOuJwTtzQaMTB7G59y/sTN9I42cPwg5vgiS9fVAnk9BSa5DXlo7srh6LDfej/aVRGNmHVueTpCMy8OKTyDFEib6KA6FFQtTiyhML0GaSZrM3JgRU8j6Q8eK7JBOLuDnDkW9WoXCbqCTcVT1fZMkLjOPIc2tIOcLgrx1uMyNxg3SwgpqlQrq9ToO2VrZ08zcsBOdRz4UhvRwDmlfAGTVLkCKLoBOzOLbWAwZMY4K+9O1Wu2P15ERvLe0IGdtQ97SipeCG0TkeMijk6Aj48wYdodGoMkyyuWKydB1ZLw+UGsrJK4DKrNmd4CM2mxQ2DAdfAAaGYZKKdSShpKmQ5EVFFkufldR8vVB5zww7B1IXBFABqwWKP33Qe/0Y7uvH5n0R1BWeHFvEE/bu7C9S5Fntn29rNiGfVaMcRxI+LIVarAXhUAIW+5rSPJOrN8N45PVhUKTB8+6/Vjuug6p2Q1D6MCB4MUMz4MMuxzYcXeBurvxwerF5iUv0pY2fGVZtnmhNbdDZQzeC505EDoRYZ9HXokixnkbSq1uqAEn5BtOqDed0PqcMJjybcdft1xIXeWRGh4CKRaLeD4xgQE7j2mBR1TgEG3hMMXWmKMZMy1HRJYjTTaz1Oj8Blk+PRnXmCYlAAAAAElFTkSuQmCC" style="cursor: pointer;" id="closeBtn" />').click(function() { window.__jQuery_Terminal__.hide(); })),
          $log    = $('<div/>').css({fontSize: '11px', fontFamily: 'monospace', background: '#000', color: '#0f0', marginBottom: '7px', overflow: 'auto', height: '120px', border: '1px solid #a0a0a0', padding: '5px', textAlign: 'left'}),
          $input  = $('<input type="text" />').css({border: '1px solid #a0a0a0', padding: '3px', width: '444px', fontSize: '11px', background: '#000', color: '#0f0'}),
          $dummy  = $('<div/>');
      
      function evalIt(cmd) {
        window.__jQuery_Terminal__.appendTo($dummy);
        var result;
        try {
          if (cmd == 'reset!') {
            context = {};
            result  = true;
		  } else if (cmd == 'help' || cmd == 'Help') {
			append('>>> Help Contents:');
			append('>> Up/Down Arrow Keys : Scroll Through Command History', '#0f0');
			append('>> Result Of Last Evaluated Expression Stored In:  _', '#0f0');
			append('>> Result Of Last Evaluated jQuery Selector Stored In: _$', '#0f0');
			append('>> Shorthand Syntax For Executing jQuery Selector: "$ div.baz > a"', '#0f0');
			append('>> "this" Is An Anonymous Object; Type "reset!" To Reset It.', '#0f0');
			append('>> help/Help : Displays All Of The Help And About Information.', '#0f0');
			append('> ');
			append('>>>> /** -------------------------------- [ ABOUT ]', '#0f0');
			append('>>>> * jQTerminal - jQuery Terminal Console!', '#0f0');
			append('>>>> *              This Is A jQuery Powered Console That Can Be Used On Any Page!', '#0f0');
			append('>>>> * ', '#0f0');
			append('>>>> * @name					jQuery Terminal', '#0f0');
			append('>>>> * @version				3.2', '#0f0');
			append('>>>> * @author				Arcticfire', '#0f0');
			append('>>>> * @license				http://creativecommons.org/licenses/by-sa/3.0/us/', '#0f0');
			append('>>>> */', '#0f0');
			append('>>>> License Information:');
			insHtml('>>> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/us/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/us/88x31.png" /></a><br /><span xmlns:dc="http://purl.org/dc/elements/1.1/" property="dc:title">jQuery Terminal Console</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Arcticfire</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/us/">Creative Commons Attribution-Noncommercial-Share Alike 3.0 United States License</a>.', '#0f0');
			append('>>>> jQuery Information:');
			append('>>>> This Page Contains jQuery Version:  ' + $.fn.jquery + '', '#0f0'););
			append('>>>> The Latest jQuery Script Is Located At: ', '#0f0'););
			insHtml('>>>> <a href="Http://Code.jQuery.Com/jquery-latest.js" title="The Latest Version Of jQuery!" target="_blank">jQuery Latest (Http://Code.jQuery.Com/jquery-latest.js)</a>', '#0f0');
			result  = true;
          } else {
            if (cmd.match(/^\$ /)) cmd = "$('" + cmd.substring(2) + "');";
            else cmd = '(' + cmd + ')';
            var result = eval(cmd);
          }
        } finally {
          window.__jQuery_Terminal__.appendTo(document.body);
          $input[0].focus();
        }
        if (typeof result != 'undefined') {
          window._ = result;
          if (typeof result == 'object' && result.selector)
            window._$ = result;
        }
        return result;
      };
      
      function format(value) {
        if (value === null) {
          return 'null';
        } else if (typeof value == 'undefined') {
          return 'undefined';
        } else if (typeof value == 'string') {
          return '"' + value.replace('"', '\\"') + '"';
        } else if (typeof value == 'function' ||
                   typeof value == 'number' ||
                   value instanceof RegExp ||
                   value === true || value === false) {
          return value.toString();
        } else if (value.selector) {
          return "<jQuery selector: '" + value.selector + "' length: " + value.length + ">";
        } else if (value instanceof Array) {
          return '[' + $.map(value, format).join(', ') + ']';
        } else if (value instanceof Date) {
          return "@" + value.getFullYear() +
                 "-" + value.getMonth() +
                 "-" + value.getDate() + 
                 "T" + value.getHours() +
                 ":" + value.getMinutes() +
                 ":" + value.getSeconds() +
                 "." + value.getMilliseconds();
        } else {
          var o = [];
          for (var k in value) o.push(k + ': ' + format(value[k]));
          return '{' + o.join(', ') + '}';
        }
      };
      
      function append(text, color) {
        $log.append($('<div/>').css({'color': color || '#fff', margin: 0, padding: 0}).text(text));
        $log[0].scrollTop = $log[0].scrollHeight;
      };
	  
	  function insHtml(code, color) {
        $log.append($('<div/>').css({'color': color || '#fff', margin: 0, padding: 0}).html(code));
        $log[0].scrollTop = $log[0].scrollHeight;
      };
      
      var dragging = null;
      $drag.mousedown(function(evt) {
        dragging = [evt.pageX - $container[0].offsetLeft,
                    evt.pageY - $container[0].offsetTop];
      }).mouseup(function() {
        dragging = null;
      });
	  

      
      $(document).mousemove(function(evt) {
        if (dragging) 
          $container.css({left: evt.pageX - dragging[0], top: evt.pageY - dragging[1]});
      });
      
      $input.keydown(function(evt) {
        var valid = {38: 'prev', 40: 'next'};
        if (evt.keyCode in valid) {
          var curr = history.scroll(valid[evt.keyCode]);
          if (curr !== null) $input.val(curr);
        }
      });
      
      $input.keypress(function(evt) {
        if (evt.keyCode == 13) {
          try {
            var cmd = this.value;
            append('> ' + cmd);
            append(format(evalIt.call(context, cmd)));
          } catch (e) {
            append(e.toString(), '#ff0000');
          } finally {
            history.push(cmd);
            this.value = '';
          }          
        }
      });
	  
	  $('#helpBtn').click(function() {
        alert("The jQuery Terminal Console!\nVersion: "+ TerminalVersion +"\njQuery Version:"+ $.fn.jquery + "\n");
      });
  $(document).bind('help.terminal', function() {
    evalIt("help");
  })

	  

      var pos = ($.browser.msie && $.browser.version < 7) ? 'absolute' : 'fixed';

      var $container = $('<div/>').css({
        backgroundColor: 'white', padding: '7px', position: pos, opacity: 0.9,
        top: '10px', right: '10px', width: '450px', border: '1px solid black',
        zIndex: 99999
      }).appendTo(document.body);

	  $container.append($dragtitle).append($drag).append($log).append($input);
      $input[0].focus();

      append('jQuery Console Initialized!', 'green');
      append('(This Page Is Using jQuery Version ' + $.fn.jquery + ')', 'blue');
	  append('Type "help" To View The Help Information', 'green');

      window.__jQuery_Terminal__ = $container;
    
    };

    if (typeof jQuery == 'undefined' || !jQuery.fn.jquery.match(/^1\.3/)) {
      var e = document.createElement('script'), jq = null;
      e.onload = function() { jq = jQuery; jQuery.noConflict(true); init(jq); };
      e.setAttribute('type', 'text/javascript');
      e.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js');
      document.body.appendChild(e);
    } else {
      init(jQuery);
    }

  }
  
})();