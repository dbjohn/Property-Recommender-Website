
$(document).ready(function(event)
{$('.hinted').focus(function()
{if($(this).val()==$(this).attr('title'))
{$(this).val('');$(this).removeClass('hintshown');}}).blur(function()
{if($(this).val()=='')
{$(this).val($(this).attr('title'));$(this).addClass('hintshown');}});$('.hinted').blur();});function clearHintsBeforeSubmit(form)
{form.find('.hinted').each(function(i,element)
{var $element=$(element);if($element.val()==$element.attr('title'))
{$element.val("");$element.removeClass('hintshown');}});}
function refillHints(form)
{form.find('.hinted').each(function(i,element)
{var $element=$(element);if($element.val()==='')
{$element.val($element.attr('title'));$element.addClass('hintshown');}});}