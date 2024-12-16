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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Example usage:
async function main() {
    console.log("Start");
    await sleep(2000); // Sleep for 2000 milliseconds (2 seconds)
    console.log("End");
}


async function checkSequence() {
    await sleep(2000); // Sleep for 2000 milliseconds (2 seconds)
    $('.button' + sequence[0]).on("click", function() {
        let button_index = $(this).attr('class');
        alert(random_number + button_index);
        if (sequence[0] == button_index.slice(-1)) {
            alert("i'm there")
        } else {
            $('h1').text('Game Over😥');
        }
    })
    showNext();
}