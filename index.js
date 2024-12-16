$('document').keypress(function(event) {
    let random_number = Math.floor(Math.random() * 4);
    alert(random_number);
})
const sequence = [];
const userGuess = 0;
let random_number = Math.floor(Math.random() * 4);
sequence.push(random_number);
let level = 1;

$(document).on('keypress', function() {
    $('h1').text('Level ' + level + '\n');
})

$('.button' + random_number).animate({ opacity: 0.4 }, 200).animate({ opacity: 1 }, 200)

checkSequence();

function showNext() {
    random_number = Math.floor(Math.random() * 4);
    sequence.push(random_number);
    $('.button' + sequence[sequence.length - 1]).animate({ opacity: 0.4 }, 200).animate({ opacity: 1 }, 200)
}

function checkSequence() {

    for (let i = 0; i < sequence.length;) {
        $('.button' + sequence[i]).on("click", function() {
            let button_index = $(this).attr('class');
            alert(random_number + button_index);
            if (sequence[i] == button_index.slice(-1)) {
                i++;
            } else {
                $('h1').text('Game Over😥');
            }
        })

    }
    showNext();
}