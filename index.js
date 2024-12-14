$('document').keypress(function(event) {
    let random_number = Math.floor(Math.random() * 4);
    alert(random_number);
})

$('button').on("click", function() {
    let random_number = Math.floor(Math.random() * 4);
    alert(random_number);
})