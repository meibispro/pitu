var app = (function() {

    'use strict';

    return {

        /*
         *  Fixed data
         *  Example app.cache.container = .list
         */
        cache: {
            'url': 'app.json',
            'container': '#blog',
            'num': 'all'
        },

        /*
         *  Group functions
         */
        init: function() {
            // json 
            this._json(this.cache.url);
        },

        /*
         *  removeClass javascript method
         *  Example  app.jsn('http://example.com/file.json');
         */
        _json: function(url) {
            var self = this,
                ajax = new XMLHttpRequest();
            ajax.open('GET', url, true);
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        // parse to json data
                        var obj = JSON.parse(ajax.responseText),
                            data = '';
                            
                        _preloader('.loader');
                        
                        // render all posts
                        if (self.cache.num === 'all') {

                            // foreach all elements of json blog
                            Array.prototype.forEach.call(obj.blog, function(el, i) {
                                // data 
                                data += self._tmpl(
                                    el.id,
                                    el.date,
                                    el.author,
                                    el.title,
                                    el.description,
                                    el.photo,
                                    el.content
                                );
                            });

                            // render one  posts  
                        } else {
                            // if 0 or 1 show 1
                            var num = (self.cache.num === 0 ? self.cache.num = 0 : self.cache.num - 1),
                                gal = obj.blog[num];
                            // html    
                            data += self._tmpl(
                                gal.id,
                                gal.date,
                                gal.author,
                                gal.title,
                                gal.description,
                                gal.photo,
                                gal.content
                            );
                            // meta author
                            document.head.title = gal.author;
                        }
                        // append html template  in div
                        document.querySelector(self.cache.container).innerHTML = data;

                    } else {
                        document.querySelector(self.cache.container).innerHTML = 'Error Data not found in server.';
                    }
                }
            };
            ajax.send();
        },


        /*
         *  Template data
         *  Example  app._tmpl(id,date,author,title,description,photo,content);
         */
        _tmpl: function(id,date,author, title, description, photo, content) {
            var html = '<div id="id_' + id + '" class="box">\n' +
                '<h3 class="blog_title">' + title + '</h3>\n' + // author
                '<span class="blog_date">' + date + '</span>\n' + // date
                '<div class="blog_desc">\n' +
                '<p>' + description + '</p>\n' + // description
                '</div>\n' +
                // link to blog post you can change the name blog_item_
                '<a class="btn" href="blog_item_' + id + '.html" title="' + title + '">Read More</a>\n' +
                '</div>\n';
            return html;
        }
    };
})();





/*
 *  cut document.querySelector();
 *  Example  _('.foo');
 */
function _(el) {
    return document.querySelector(el);
}

/*
 *  cut document.querySelectorAll();
 *  Example  _All('.foo');
 */
function _All(el) {
    return document.querySelectorAll(el);
}

/*
 *  hasClass javascript method
 *  Example  app._hasClass('#foo','.fighters');
 */
function _hasClass(element, cls) {
    return new RegExp('(\\s|^)' + cls + '(\\s|$)').test(element.className);
}

/*
 *  addClass javascript method
 *  Example  app._addClass('#foo','.fighters');
 */
function _addClass(element, cls) {
    if (!_hasClass(element, cls)) {
        element.className += (element.className ? ' ' : '') + cls;
    }
}

/*
 *  removeClass javascript method
 *  Example  app._removeClass('#foo','.fighters');
 */
function _removeClass(element, cls) {
    if (_hasClass(element, cls)) {
        element.className = element.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ')
            .replace(/^\s+|\s+$/g, '');
    }
}


/*
 *  ToggleClass javascript method
 *  Example _toggleClass('#foo','.fighters');
 */
function _toggleClass(obj, cls) {
    if (!_hasClass(obj, cls)) {
        _addClass(obj, cls);
    } else {
        _removeClass(obj, cls);
    }
}



/*
 *  like delay
 *  _delay(callback(),time);
 */
function _delay(callback, time) {
    if (typeof setTimeout !== 'undefined') {
        var t = setTimeout(function() {
            clearTimeout(t);
            return callback();
        }, time);
    }
}


/*
 *  like animate
 *  _animate(_('.foo'),'opacity',0,0,1,1000);
 */
function _animate(elem, style, unit, from, to, time) {
    if (!elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            elem.style[style] = (from + step * (to - from)) + unit;
            if (step == 1) clearInterval(timer);
        }, 25);
    elem.style[style] = from + unit;
}


/*
 *  Ajax request
 *  Example  _Ajax(selector,url);
 */
function _Ajax(type, selector, url) {
    var ajax = new XMLHttpRequest();
    if (type === 'GET') {
        ajax.open('GET', url, true);
        ajax.onload = function() {
            if (ajax.status >= 200 && ajax.status < 400) {
                // Success!
                var resp = ajax.responseText;
                _(selector).innerHTML = resp;
            } else {
              // Error
                _(selector).innerHTML = 'We reached our target server, but it returned an error';
            }
        };
        ajax.onerror = function() {
          // no conection
            _(selector).innerHTML = 'There was a connection error of some sort';
        };
    } else if (type === 'POST') {
        ajax.open('POST', url, true);
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    ajax.send();
}

/*
 *  Ajax request
 *  Example  _preloader('.foo');
 */
function _preloader(el){
  var loader = document.querySelector(el),
    interval = setInterval(function(){
  loader.classList.add('finish');
  var timeout = setTimeout(function(){
    loader.remove();
    clearTimeout(timeout);
  },800);
  clearInterval(interval);
  },1800);
}
