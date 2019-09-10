function is_mobile()
{
   var inherent = FALSE;
   if ("getComputedStyle" in window)
   {
      var body = document.getElementsByTagName("body")[0];
      var el = body.appendChild(document.createElement("div"));
      el.className = "mobile_test";
      var style = getComputedStyle(el);
      if (style.backgroundColor == "yellow")
         inherent = TRUE;
   }

   // Replace global with closure function:
   is_mobile = function() { return inherent; };

   return is_mobile();
}



function event_adder(n,f) { alert("not installed"); }

if ('addEventListener' in document)
   event_adder = function(name,func) { document.addEventListener(name,func,true); };
else
   event_adder = function(name,func) { document.body.attachEvent("on"+name,func); };

function setup_event_handling()
{
   function dig_for_topic(n)
   {
      if (n && n.nodeType < 5)
      {
         if (n.className.indexOf("topic") >= 0)
            return n;
         else
            return dig_for_topic(n.parentNode);
      }
      return null;
   }

   function f(ev)
   {
      var e=ev||window.event;
      var t=e.target||e.srcElement;

      var topic = dig_for_topic(t);

      return true;
   }

   event_adder("click", f);
}

window.onload = function window_loader()
{
   setup_event_handling();
};

