var prevClicked = 0;
var clickedItem = "1";
var clickedElem;
var prevElem;
var options;
var maxPageCount = 10
var value = 1;

function selectFirstPage() {
    options = $(".option");
    for (var i = 0; i < 4; i++) {
        $(options[i]).removeClass("selected");
    }
    prevElem = $("#first");
    $(options[0]).addClass("selected");
    $("#prev").children().html("");
}

$(function(){
  prevElem = $("#first");
  $("#prev").children().html("");
   var theParent = $("#pageSelector");
   theParent.click(pageSelected);
   options = $(".option");
});

function pageSelected(e) {
	if (e.target !== e.currentTarget) {
        clickedItem = e.target.innerHTML;
        if (clickedItem != "&gt;" && clickedItem !="&lt;") { 
        clickedItem = (parseInt(clickedItem)-1)%4;
        //alert("Hello " + clickedItem);
     }
    }
    e.stopPropagation();

    if (clickedItem == "&gt;"){
        $("#prev").children().html("<");
        prevElem.removeClass("selected");
        prevClicked = (prevClicked+1)%4 ;
        clickedItem = prevClicked;
        $(options[prevClicked]).addClass("selected");
        prevElem = $(options[prevClicked]);
        if (value%4 == 0) {
            updatePageNavAsc();
            checkMaxCount();
        }
        value++;
        fetchData(value);
     }
     else if (clickedItem == "&lt;"){
        $("#next").children().html(">");
        prevElem.removeClass("selected");
        if (prevClicked == 0) {
            prevClicked = 4;
        }
        prevClicked = ((prevClicked)-1)%4;
        clickedItem = prevClicked ;
        
        $(options[prevClicked]).addClass("selected");
        prevElem = $(options[prevClicked]);
        
        if (value%4 == 1) {
            updatePageNavDesc();
        }
        value--;
        fetchData(value);
     }
     else {
        var num = clickedItem;
        if(!isNaN(num)) {
            prevClicked = num;
            prevElem.removeClass("selected");
            prevElem = $(options[num]);
            prevElem.addClass("selected");
            $("#prev").children().html("<");
            value = parseInt(e.target.innerHTML);
            $("#next").children().html(">");
            $("#prev").children().html("<");
            fetchData(value);
        }
     }
     
     if (value == 1) {
        $("#prev").children().html("");
     }else {
        $("#prev").children().html("<");
     }
     
     function updatePageNavAsc() {
        $(options[0]).children().html(value+1);
        $(options[1]).children().html(value+2);
        $(options[2]).children().html(value+3);
        $(options[3]).children().html(value+4);
    }

    function updatePageNavDesc() {
        $(options[0]).children().html(value-4);
        $(options[1]).children().html(value-3);
        $(options[2]).children().html(value-2);
        $(options[3]).children().html(value-1);
    }
    
    function checkMaxCount () {
        
    if (value+1 == maxPageCount) {
        $(options[1]).children().html("");      
        $(options[2]).children().html(""); 
        $(options[3]).children().html("");   
       } 
    if (value+2 == maxPageCount) {
        $(options[2]).children().html(""); 
        $(options[3]).children().html("");  
       }
    if (value+3 == maxPageCount) {
        $(options[3]).children().html("");  
       }
    }
    
    if (value == maxPageCount) {
        $("#next").children().html("");
    }
   
}