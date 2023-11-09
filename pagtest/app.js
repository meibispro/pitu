var app = (function(){

    'use strict';

    return{



      /*
      *  Fixed data
      *  Example app.cache.container = .list
      */
      cache:{
        'url':'app.json',
        'container':'#blog',
        'num': 'all'
      },





      /*
      *  Group functions
      */
      init:function(){
        // json 
        this.jsn(this.cache.url);
      },






      /*
      *  addEventListener method
      *  Example  app.applisten(window,'load',fn());
      */
      applisten:function(obj, type, fn){
        if(document.addEventListener){
          obj.addEventListener(type, fn, false);
        } else if(document.attachEvent){
          obj.attachEvent('on'+type, fn);
        } else {
          obj['on'+type] = fn;
        }   
      },





      /*
      *  cut document.querySelector();
      *  Example  app.qs('.foo');
      */
      qs:function(el){
        return document.querySelector(el);
      },





      /*
      *  cut document.querySelectorAll();
      *  Example  app.qsAll('.foo');
      */
      qsAll:function(el){
        return document.querySelectorAll(el);
      },





      /*
      *  removeClass javascript method
      *  Example  app.jsn('http://example.com/file.json');
      */
      jsn:function(url){
        var self = this,
            ajax = new XMLHttpRequest();
        ajax.open('GET', url, true);
        ajax.onreadystatechange = function() {
          if (ajax.readyState == 4) {
            if(ajax.status == 200) {
              // parse to json data
              var obj = JSON.parse(ajax.responseText),data = '';

              // render all posts
              if(self.cache.num === 'all'){

                // foreach all elements of json blog
                Array.prototype.forEach.call(obj.blog, function(el, i){
                  // data 
                  data += self.template(
                    el.id,
                    el.author,
                    el.title,
                    el.description,
                    el.photo,
                    el.content
                  );
                });
                
                

                
                
                
              // render one  posts  
              }else{
                // if 0 or 1 show 1
                var num = (self.cache.num === 0 ? self.cache.num = 0 : self.cache.num-1),
                    gal = obj.blog[num];
                // html    
                data += self.template(
                  gal.id,
                  gal.author,
                  gal.title,
                  gal.description,
                  gal.photo,
                  gal.content
                ); 
                // meta author
                self.qs('head title').textContent = gal.author;
              }
              // append html template  in div
              self.qs(self.cache.container).innerHTML = data;
 
            }else{
              self.qs(self.cache.container).innerHTML = 'Error Data not found in server.';
            }
          }
        };
        ajax.send();
      },






      /*
      *  Ajax request
      *  Example  app.loadPage(selector,url);
      */
      loadPage:function(selector,url){
        var self = this;
        var rq = new XMLHttpRequest();
        rq.open('GET',url, true);
        rq.onload = function() {
          if (rq.status >= 200 && rq.status < 400){
            // Success!
            var resp = rq.responseText;
            app.qs(selector).innerHTML = resp; 
          } else {
            app.qs(selector).innerHTML = 'We reached our target server, but it returned an error'; 
          }
        };
        rq.onerror = function() {
          app.qs(selector).innerHTML = 'There was a connection error of some sort';
        };
        rq.send();
      },
      
      
      
      
      /*
      *  hasClass javascript method
      *  Example  app.clsHas('#foo','.fighters');
      */
      clsHas:function(element,cls){
        return new RegExp('(\\s|^)'+cls+'(\\s|$)').test(element.className);
      },






      /*
      *  addClass javascript method
      *  Example  app.clsAdd('#foo','.fighters');
      */
      clsAdd:function(element,cls){
        if (!this.clsHas(element, cls)) { 
          element.className += (element.className ? ' ' : '') +cls; 
        }
      },




      /*
      *  removeClass javascript method
      *  Example  app.clsRm('#foo','.fighters');
      */
      clsRm:function(element,cls){
        if (this.clsHas(element, cls)) {
          element.className=element.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ')
          .replace(/^\s+|\s+$/g, '');
        }
      },



      /*
      *  Template data
      *  Example  app.template(id,author,title,description,photo,content);
      */
      template:function(i,a,t,d,p,c){
        var html = '<div id="id_'+i+'" class="box">\n'+
            '<h3 class="blog_title">'+a+'</h3>\n'+ // author
            '<div class="blog_desc">\n'+
            '<p>'+d+'</p>\n'+ // description
            '</div>\n'+
            // link to blog post you can change the name blog_item_
            '<a class="btn" href="blog_item_'+i+'.html" title="'+a+'">Read More</a>\n'+ 
            '</div>\n';
        return html;
      }
    };
  })();