var request = require('request');
var cheerio = require('cheerio');

module.exports = function(req, res) {
    request.get('http://so.gushiwen.org/randShow.aspx', function(e, r, content){
        if (e || !content) {
            res.end('未能成功获取诗文');
        } else {
            var $ = cheerio.load(content);
            var title = $('.son1 h1').text();
            var $parts = $('.son2 p');
            var dynasty = $($parts[0]).text();
            var author = $($parts[1]).text();
            var text = $('.son2').clone()
                .find('.pingfen').remove().end()
                .find('p').slice(0, 3).remove().end().end()
                .text().replace(/\s/g, '').replace(/。/g, '。\n');
            res.end([title, dynasty, author, text].join('\n'));
        }
    });
};