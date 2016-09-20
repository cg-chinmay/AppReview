//var review_url = "https://itunes.apple.com/jp/rss/customerreviews/page=2/id=928453590/sortby=mostrecent/xml?urlDesc=/customerreviews/id=928453590/sortBy=mostRecent/xml";
var defaultAppUrl = "https://itunes.apple.com/jp/app/furimaapuri-rakuma-chu-pin/id928453590?mt=8"
var app = "";
var country = "jp";
$(function() {
   $("#appUrl").val(defaultAppUrl);
  
    document.getElementById("fetchReviews").addEventListener("click",function(){
        getReviews();
    });
    getReviews();  
});

function getReviews(){
        var body = $("#displayContent");
        body.hide();
        var footer = $(".footer");
        footer.hide();
        var iTunesUrl = $("#appUrl").val();
         if (iTunesUrl == "") {
          return;
         }
         var appId = iTunesUrl.match(/id([0-9]+)?/);
         var locale = iTunesUrl.match("com/(.*)/app");
         country = locale[1];
         console.log(appId[1]);
         app = appId[1];
         fetchData(1);
         body.show();
         footer.show();
         selectFirstPage();
         console.log("Called");
}

function fetchData(pageNum) { //896130944
  var spinner = new Spinner({
  lines: 12, // The number of lines to draw
  length: 7, // The length of each line
  width: 5, // The line thickness
  radius: 10, // The radius of the inner circle
  color: '#000', // #rbg or #rrggbb
  speed: 1, // Rounds per second
  trail: 100, // Afterglow percentage
  shadow: false // Whether to render a shadow
    }).spin(document.getElementById("content"));
  var review_url = "https://itunes.apple.com/"+country+"/rss/customerreviews/page="+pageNum+"/id="+app+"/sortby=mostrecent/xml?urlDesc=/customerreviews/id="+app+"/sortBy=mostRecent/xml";
	var request = $.ajax({url:review_url});
	request.done(function(data){
          console.log("Success");
          console.log(data);
          var $xml = $(data),
          $entry = $xml.find('entry');
          if ($entry.length < 2) {
              alert("No More Reviews Available");
              spinner.stop();
              return;
          } 
          $appTitle = $entry.eq(0).find('title').text();
          $("#appTitle").html($appTitle);
          createTable($entry);
          spinner.stop();
	});
	request.fail(function(jqXHR, textStatus) {
						console.log( "Request failed: " + textStatus );	
            spinner.stop(document.getElement);
					});
}

function createTable($content){
     var parentDiv = $("#reviews");
     parentDiv.empty();
     var count = $content.length;
     console.log(count);

     for (var i = 1; i < count; i++) {
       $elem = $content.eq(i);
       //var userId = $elem.find('id').text();
       var version = $elem.find('im\\:version,version',$content).text();
       var date = $elem.find('updated').text();
       var title = $elem.find('title').text();
       var comment = $elem.find('content[type="text"]').text();
       var rating = $elem.find('im\\:rating,rating',$content).text();
       var bgcolor = "#FFFFFF";
       if (rating == 1 || rating == 2) {
        bgcolor = "#ff6600";
       }
       
       parentDiv.append('<tr bgcolor='+bgcolor+'><td>'+i+'</td><td>'+version+'</td><td>'+date+'</td><td>'+title+'</td><td>'+comment+'</td><td>'+rating+'</td></tr>');
     }
 }