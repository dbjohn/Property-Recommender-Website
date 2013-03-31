/**
 * This file handles client side Google Analytics; event tracking etc.
 *
 * @module Analytics
 */

var _gaq = _gaq || [];

/**
 * Validates and adds events to analytics
 *
 * @class trackEvent
 * @constructor
 *
 * @param  {a jQuery collection} $    The jQuery object, only required for its API;
 *                                    it doesn't need to be set with a DOM element
 *
 * @return {undefined}
 */
var trackEvent = (function($){
    var trackEvent = {};

    /**
     * Tracks events in Google Analytics
     *
     * @method track
     *
     * @param  {string} category The category of the event
     * @param  {string} action   The action of the event, what the event is in effect
     * @param  {string} [label]  Extra data related to the event
     * @param  {int}    [value]  A monetary value associated with the event
     *
     * @return {undefined}
     */
    trackEvent.track = function(category, action, label, value){
        var eventData;

        if (category !== undefined && action !== undefined)
        {
            eventData = [
                '_trackEvent',
                category,
                action
            ];

            if (label !== undefined)
            {
                eventData.push(label);
            }

            if (value !== undefined)
            {
                eventData.push(value);
            }

            _gaq.push(eventData);
        }
    };

    return trackEvent;
})(jQuery);
