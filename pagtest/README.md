#Basic blog with Javascript ( init  version no css )

**Made with ♥ @Nakome / nakome.com**

--------------------------------

##How to:

--------------------------------

**Create index.html**
    
    <!DOCTYPE html>
    <html>
    
    <head>
      <!-- Simple Metas -->
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="author" content="">
      <meta name="description" content="">
      <meta name="keywords" content="">
      <!-- title -->
      <title>Template blog test</title>
      <!-- css file -->
      <link rel="stylesheet" href="app.css">
    </head>
    
      <body>
      
        <h1>Basic blog</h1>
        
        <!-- the blog id -->
        <div id="blog"></div>
          
        <!-- javascript -->
        <script src="app.js"></script>
        <script type="text/javascript">
          app.applisten(window, 'load', function(){
              app.init();
          });
        </script>
      
      </body>
    </html>

----------------------------

### The blog item structure 

**blog_item_1.html**

    <!DOCTYPE html>
    <html>
    
    <head>
      <!-- Simple Metas -->
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="author" content="">
      <meta name="description" content="">
      <meta name="keywords" content="">
      <!-- title -->
      <title>Template blog test</title>
      <!-- css file -->
      <link rel="stylesheet" href="app.css">
    </head>
    
    <body>
      <h1>Basic blog item</h1>
      <a href="index.html"> Back to the home </a>
      
      <!-- the blog id -->
      <div id="blog_item"></div>
          
      <!-- javascript -->
      <script src="app.js"></script>
      <script>
        var _ = app;
            _.applisten(window, 'load', function(){
              _.cache.container = '#blog_item'; // id to render
              _.cache.num = 1; // number of blog post
              _.template = function(i,a,t,d,p,c){
                var html ='<div id="id_'+i+'" class="box">\n'+
                '<h3>'+a+'</h3>\n'+ // author
                '<figure>'+
                '<img src="'+p+'"/>\n'+ // photo
                '<figcaption>'+t+'</figcaption>\n'+ // title'
                '</figure>'+
                '<p>'+c+'</p>\n'+ // description
                '</div>\n';
                return html;
              }
              _.init(); // init javascript
            });
      </script>
    </body>
    </html>

----------------------------

### json data

**app.json**

    {
       "blog":[
          {  
             "id":1,
             "author":"The author",
             "title":"the title",
             "description":"short content",
             "photo":"link to photo",
             "content":"large content"
          }, // remember comma :)
          
          // Add more ...
         
       ]
    }

----------------------------

### javascript utilities

**app.js**


    // short addEventListener method
    app.applisten('class','click',function(){});
    
    // short document.querySelector();
    app.qs('.foo').style.color = 'blue';
    
    // short document.querySelectorAll();
    app.qsAll('.foo').style.color = 'blue';
    // remover loop

    // hasClass javascript method
    app.clsHas('#foo','.fighters');

    // addClass javascript method
    app.clsAdd('#foo','.fighters');

    // removeClass javascript method
    app.clsRm('#foo','.fighters');
    
    //Ajax request
    app.loadPage(selector,url);
    

### More Comming Soon

**Made with ♥ @Nakome**
