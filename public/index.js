$(document).ready(function(){
  var $go = $('#go');
  var $website = $('#website');
  var $compSelector = $('#selector');
  var width = $(document).width();
  var height = $(document).height();
  $('svg').width(width);
  $('svg').height(height);
  var s = Snap('#svg');


function drawTopNodes(dom){
  var w = width/dom.length;
  var y = 150;
  var body = drawCircle(width/2, 50,30);
  var circles = [];
  dom.forEach(function(node, i){
    circles.push(drawNode(w, y, i, node));
  });
}

function drawNode(w, y, i, node){
  return drawCircle(w*i, y, 20);
}

function drawCircle(x, y, r){
  return s.circle(x+r, y, r);
}

function parseHtml(html){
  var newDom = $.parseHTML(html);
  drawTopNodes(newDom);
}


  function getHtml(){
    $.get('/get_website',{'url':$website.val()}, function(data){
      if(data!=='err'){
        parseHtml(data);
      }
    });
  }

  $go.on('click', getHtml);


});
