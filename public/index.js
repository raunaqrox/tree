$(document).ready(function(){
  var $go = $('#go');
  var $website = $('#website');
  var $compSelector = $('#selector');
  var width = $(document).width();
  var height = $(document).height();
  $('svg').width(width);
  $('svg').height(height);
  var s = Snap('#svg');
  var nodes = [];


  function drawBody(dom){
      var pNode = {
        x:width/2-30,
        y:50,
        r:30
      };
      var body = drawCircle(pNode.x, pNode.y, pNode.r, 'blue');
      drawTopNodes(dom, pNode);
  }

function drawTopNodes(dom, pNode){
  var w = width/dom.length;
  w = w>100?100:w;
  var y = pNode.y+100;
  if(dom){
     // dom.forEach(function(node, i){
     //   nodes.push(drawNode(w, y, i, node, pNode));
     // }); 
     [].forEach.call(dom, function(node, i){  
        nodes.push(drawNode(w, y, i, node, pNode));
     });
  }
}
//later send parent rather than x2,y2
function joinToParent(x1,y1, x2,y2, c, sw){
  return s.line(x1,y1, x2,y2).attr({stroke:c,strokeWidth:sw});
}

function getNodeName(node){
  //var html = (node.outerHTML || new XMLSerializer().serializeToString(node)).split('>')[0].split(' ')[0];
  //return html.substr(1,html.length);
  return node.tagName;
}

function getChildNodesAndDraw(elem){
       console.log(elem);
   nodes.forEach(function(node){
    if(node.circle.id === elem.srcElement.snap){
        var pNode = {
            'x': node.x,
            'y': node.y,
            'r': node.r
        }
        var childNodes = node.node.childNodes;
        drawTopNodes(childNodes, pNode);
    }
   });
}

function drawNode(w, y, i, node, pNode){
  return drawCircleAndLineAndText(w*i, y, w/4,'red', node, getNodeName(node), pNode);
}

function drawCircle(x, y, r, c){
    return  s.circle(x+r, y, r).attr({fill:c});
}

function textAt(x, y, t){
  return s.text(x, y, t);
}

function drawCircleAndLineAndText(x, y, r, c, node, t, pNode){
  return {
    'x': x,
    'y': y,
    'r': r,
    'circle': drawCircle(x, y, r, c).click(getChildNodesAndDraw),
    'line': joinToParent(x+r, y, pNode.x + pNode.r, pNode.y, 'gold', r/6),
    'text': textAt(x, y+r/2, t),
    'node': node
  };
}

function parseHtml(html){
  var newDom = $.parseHTML(html);
  drawBody(newDom);
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
