var iframe = document.getElementsByClassName('qePvpc')[0];

var game = iframe.contentWindow.document;

// Too lazy to generalize this
var cardWidth = 19;
var cardHeight = 26;
var nb_frames = 6751;
var pixelX = 64;
var pixelY = 48;

var width = pixelX * cardWidth;
var height = pixelY * cardHeight;

iframe.style.width = width + 'px';
iframe.style.height = height + 'px';

var solitaire = game.getElementById('solitaire-board');

var card = game.createElement('div');
card.style.width = cardWidth + 'px';
card.style.height = cardHeight + 'px';
card.style.transition = 'left 500ms ease 0s, top 500ms ease 0s';
card.style.zIndex = '24';

function new_pixel(x, y, card) {
    // Some spaghetti code to create a new pixel on the solitaire board
    new_card = card.cloneNode(true);
    new_card.style.left = (x*cardWidth) + 'px';
    new_card.style.top = (y*cardHeight) + 'px';
    var image = new Image();
    image.src = 'https://i.imgur.com/iG9RpNc.png'; // To-do : replace the imgur link with a localhost:5000/img link

    var canvas = game.createElement('canvas');
    canvas.className = 'card-canvas';
    canvas.width = 172;
    canvas.height = 236;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    new_card.appendChild(canvas);
    new_card.className = 'card card-' + x + '-' + y;
    return new_card;
}

async function get_frame_json(frame) {
    // json from http://localhost:5000/frame/i where i is the frame number. Run serve_frames.py to get the json files
    var url = 'http://localhost:5000/frame/' + frame;
    var data = [];
    try{
        var response = await fetch(url);
        data = await response.json();
    } catch (e) {
        console.log(e);
    }
    return data;
}

function initial_clear() {
    var cards = game.getElementsByClassName('card');
    cardsArr = Array.from(cards);
    cardsArr.forEach(function(card) {
        card.remove();
    });
}

function difference_between_frames(current, previous) {
    // Return a json containing { added: [], removed: [] }
    var added = [];
    var removed = [];
    for (var i = 0; i < pixelY; i++) {
        for (var j = 0; j < pixelX; j++) {
            if (current[i][j] == 1 && previous[i][j] == 0) {
                added.push([j, i]);
            }
            if (current[i][j] == 0 && previous[i][j] == 1) {
                removed.push([j, i]);
            }
        }
    }
    return { added: added, removed: removed };
}

function render_difference(difference) {
    // Render the difference between the current frame and the previous one on the solitaire board
    for (var i = 0; i < difference.added.length; i++) {
        solitaire.appendChild(new_pixel(difference.added[i][0], difference.added[i][1], card));
    }
    for (var i = 0; i < difference.removed.length; i++) {
        var cards = game.getElementsByClassName('card-' + (difference.removed[i][0]) + '-' + (difference.removed[i][1]));
        cardsArr = Array.from(cards);
        cardsArr.forEach(function(card) {
            card.remove();
        });
    }
}

var frame = 0;
var current_frame = [];
var previous_frame = [];
var difference = { "added": [], "removed": [] };

//  BAD APPLE
var video = setInterval(async function() {
    difference = { "added": [], "removed": [] };
    current_frame = await get_frame_json(frame);
    if (frame > 0) {
        difference = difference_between_frames(current_frame, previous_frame);
    } else {
        initial_clear();
    }
    render_difference(difference);
    console.log("Frame : " + frame);
    previous_frame = current_frame;
    frame = frame + 1;
    if (frame == nb_frames - 1) {
        clearInterval(video);
    }
}, 1000/4);