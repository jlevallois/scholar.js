/**
 * scholar.js
 * ---
 * @author Jérémy Levallois (http://www.karganys.fr)
 * @version 0.1.1
 * ---
 * Note: Read the README.md
 * ---
 * @info https://github.com/jlevallois/scholar.js/
 */



var Scholar = {
  author: 'SCHOLAR_AUTHOR_ID',
  scholar_url: 'http://scholar.google.com/',
  debug: false,
  not_found_msg: '&#10008',
  
  load: function( _author ) {
    'use strict';
    var i = 0,
        j = 0;

    if( _author === 'SCHOLAR_AUTHOR_ID' ) {
      console.log( "You must specify your Google Scholar ID. See documentation." );
      var allElements = document.getElementsByClassName("scholar");
      for (i = 0; i < allElements.length; i++) {
        allElements[i].innerHTML = Scholar.not_found_msg;
      }
    }
    this.author = _author;
    if( this.debug ) {
      console.log( "Preloading author " + this.author );
    }

    $.ajax({
      url: Scholar.scholar_url + 'citations?user=' + Scholar.author + '&hl=en&cstart=0&pagesize=100',
      type: 'GET',
      dataType: 'html',
      success: function(res) {
        var tmp_find = $(res.responseText).find('#gsc_a_b');
        var tmp_publi_array = $(tmp_find).find('.gsc_a_t').find('a');
        var tmp_publi_cite = $(tmp_find).find('.gsc_a_c');

        var publi_name = [];
        var publi_id = [];
        var publi_cite_count = [];

        var regex_term = new RegExp('.*(citation_for_view=[\\d\\w\\-_]+\\:)');
        for (i = 0; i < tmp_publi_array.length; i++) {
          publi_name.push( $(tmp_publi_array[i]).text() );
          publi_id.push( $(tmp_publi_array[i]).attr('href').replace(regex_term, '') );
          publi_cite_count.push( $(tmp_publi_cite[i]).text() );
        }

        if( Scholar.debug ) {
          console.log( 'Found ' + publi_name.length + ' publications' );

          if( publi_name.length !== publi_cite_count.length ) {
            console.log( 'Wrong number of publications and cites count : ' + publi_name.length  + ' and ' + publi_cite_count.length);
          }
          else {
            console.log('----------------------------------' );
            for (i = 0; i < publi_name.length; i++) {
              console.log('Name: ' + publi_name[i] );
              console.log('ID: '   + publi_id[i] );
              console.log('Cite: ' + publi_cite_count[i] );
              console.log('----------------------------------' );
            }
          }
        }

        var allElements = document.getElementsByClassName("scholar");
        for( i = 0; i < allElements.length; i++ ) {
          var pos = -1;
          if( allElements[i].getAttribute("publi-id") ) {
            if( Scholar.debug ) {
              console.log("Asking for publication ID: " + allElements[i].getAttribute("publi-id"));
            }
            for( j = 0; j < publi_id.length && pos === -1; j++ ) {
              if( publi_id[j] === allElements[i].getAttribute("publi-id") ) {
                pos = j;
              }
            }
          }
          else if( allElements[i].getAttribute("name") ) {
            if( Scholar.debug ) {
              console.log("Asking for: " + allElements[i].getAttribute("name"));
            }
            for( j = 0; j < publi_name.length && pos === -1; j++ ) {
              if( publi_name[j].toLowerCase().replace(/[^a-zA-Z]+/g, '') === allElements[i].getAttribute("name").toLowerCase().replace(/[^a-zA-Z]+/g, '') ) {
                pos = j;
              }
            }
          }
          else {
            if( Scholar.debug ) {
              console.log("No attribute 'publi-id' or 'name' found for this publication.");
            }
          }

          if( pos !== -1 ) {
            var count = (publi_cite_count[pos] < 1)?0:publi_cite_count[pos];
            if( Scholar.debug ) {
              console.log('Publication found. Count: ' + count);
            }
            if( allElements[i].getAttribute("with-link") === "true" ) {
              allElements[i].innerHTML = '<a href="' + Scholar.scholar_url + 'citations?view_op=view_citation&hl=en&user=' + Scholar.author + '&citation_for_view=' + Scholar.author + ':' + publi_id[pos]  + '">' + count + '</a>';
            }
            else {
              allElements[i].innerHTML = count;
            }
          }
          else {
            allElements[i].innerHTML = Scholar.not_found_msg;
          }
        }
      },
      error: function() {
        if( Scholar.debug ) {
          console.log('Can\'t open requested URL.');
        }
        var allElements = document.getElementsByClassName("scholar");
        for (i = 0; i < allElements.length; i++) {
          allElements[i].innerHTML = Scholar.not_found_msg;
        }
      }
    });
  }
};


/**
 * jQuery.ajax mid - CROSS DOMAIN AJAX
 * ---
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 12-JAN-10
 * ---
 * Note: Read the README!
 * ---
 * @info http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/
 */

jQuery.ajax = (function(_ajax){
    'use strict';
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = new RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';

    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }

    return function(o) {

        var url = o.url;

        if ( (typeof o.type === 'undefined' || /get/i.test(o.type)) && !/json/i.test(o.dataType) && isExternal(url) ) {

            // Manipulate options so that JSONP-x request is made to YQL

            o.url = YQL;
            o.dataType = 'json';

            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };

            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }

            o.success = (function(_success){
                return function(data) {

                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: data.results[0]
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '').replace(/<img[^>]+?\/>|<img(.|\s)*?\/img>/gi, '')
                        }, 'success');
                    }

                };
            })(o.success);

        }

        return _ajax.apply(this, arguments);

    };

})(jQuery.ajax);
