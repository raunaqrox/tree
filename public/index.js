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
  var body = drawCircle(width/2 - 30, 50,30,'blue');
  var nodes = [];
  dom.forEach(function(node, i){
    nodes.push(drawNode(w, y, i, node));
  });
}
//later send parent rather than x2,y2
function joinToParent(x1,y1, x2,y2, c, sw){
  return s.line(x1,y1, x2,y2).attr({stroke:c,strokeWidth:sw});
}

function drawNode(w, y, i, node){
  return drawCircleAndLine(w*i, y, w/4,'red');
}

function drawCircle(x, y, r, c){
    return  s.circle(x+r, y, r).attr({fill:c});
}

function drawCircleAndLine(x, y, r,c){
  return {
    'circle': drawCircle(x, y, r, c),
    'line' : joinToParent(x+r,y, width/2, 50, 'gold',r/6)
  };
}

function parseHtml(html){
  var newDom = $.parseHTML(html);
  drawTopNodes(newDom);
}


  function getHtml(){
    $('#svg').empty();
    $.get('/get_website',{'url':$website.val()}, function(data){
      if(data!=='err'){
        parseHtml(data);
      }
    });
  }

  $go.on('click', getHtml);
  getHtml();

});
