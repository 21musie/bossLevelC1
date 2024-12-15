$('document').keypress(function(event) {
    let random_number = Math.floor(Math.random() * 4);
    alert(random_number);
})
const sequence = [];
let random_number = Math.floor(Math.random() * 4);
sequence.push(random_number);
let level = 1;

$(document).on('keypress', function() {
    $('h1').text('Level ' + level + '\n');
})

$('.button' + random_number).animate({ opacity: 0.4 }, 200).animate({ opacity: 1 }, 200)

$('button').on("click", function() {
    let button_index = $(this).attr('class');
    alert(random_number + button_index);

    if (random_number == button_index.slice(-1)) {
        $('h1').text('Level ' + level++ + '\n');
    } else {
        $('h1').text('Game Over😥');
    }
})