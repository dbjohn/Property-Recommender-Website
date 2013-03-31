
(function(a){a.expr[":"].onScreen=function(b){var c=a(window),d=c.scrollTop(),e=c.height(),f=d+e,g=a(b),h=g.offset().top,i=g.height(),j=h+i;return h>=d&&h<f||j>d&&j<=f||i>e&&h<=d&&j>=f}})(jQuery);