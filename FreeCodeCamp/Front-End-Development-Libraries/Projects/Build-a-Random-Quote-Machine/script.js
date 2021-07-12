/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
const projectName = 'random-quote-machine';
let quotesData;

/*
  Code by Gabriel Nunes
  Modified by Todd Chaffee to use Camper gist for JSON Quote data.
*/

var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];
var current = [
    quote = '',
    author = ''
];

function getQuotes() {
    return $.ajax({
        //  lấy dữ liệu từ API 
        headers: {
            Accept: 'application/json'
        },
        url:
            'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);
                // JSON.parse() nhận vào một chuỗi JSON và chuyển đổi (transform) nó thành một đối tượng JavaScript. 
                // JSON.stringify() làm điều ngược lại - lấy một đối tượng JavaScript và chuyển đổi nó thành một chuỗi JSON.
                console.log('quotesData');
                console.log(quotesData);
            }
        }
    });
}

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

function getQuote() {
    let randomQuote = getRandomQuote();
    current.quote = randomQuote.quote;
    current.author = randomQuote.author;

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + current.quote + '" ' + current.author)
    );

    $('#tumblr-quote').attr(
        //.attr(): lấy giá trị hoặc thêm thuộc tính (attribute) cho thành phần.
        // .attr('tên thuộc tính','giá trị thuộc tính')
        'href',
        'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(current.author) +
        '&content=' +
        encodeURIComponent(current.quote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    );

    // .animate(): Thực hiện một hình ảnh động (animate) tùy chỉnh của một tập hợp các thuộc tính css.
    // .animate(Thuộc tính,Tốc độ,'easing',function(){})
    $('.quote-text').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#text').text(randomQuote.quote);
    });

    $('.quote-author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#author').html(randomQuote.author);
    });

    var color = Math.floor(Math.random() * colors.length);
    console.log(color);
    $('html body').animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },
        1000
    );
    $('.button').animate(
        {
            backgroundColor: colors[color]
        },
        1000
    );
}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });

    $('#new-quote').on('click', getQuote);
});
