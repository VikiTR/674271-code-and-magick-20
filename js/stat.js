'use strict';

var BAR_MAX_HEIGHT = 150;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};


window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + FONT_GAP + GAP * 2);

  var maxTime = getMaxElement(times);

  var onePlayerWidth = CLOUD_WIDTH / (players.length + 1);
  if (onePlayerWidth < TEXT_WIDTH) {
    onePlayerWidth = TEXT_WIDTH;
  }

  for (var i = 0; i < players.length; i++) {
    var x = CLOUD_X + (onePlayerWidth / 2) + onePlayerWidth * i;
    var h = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    var y = CLOUD_HEIGHT - h - FONT_GAP;
    var w = BAR_HEIGHT;

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + Math.random().toFixed(2) * 100 + '%, 50%)';

    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], x, CLOUD_HEIGHT - CLOUD_Y);
    ctx.fillText(Math.round(times[i]), x, CLOUD_HEIGHT - CLOUD_Y - h - FONT_GAP * 2);
  }
};
