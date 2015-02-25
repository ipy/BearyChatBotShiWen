var request = require('request');
var cheerio = require('cheerio');

module.exports = function(req, res) {
    console.log({method: req.method, body: req.body});
    request.get('http://so.gushiwen.org/randShow.aspx', function(e, r, content){
        var text;
        if (e || !content) {
            text = '未能成功获取诗文';
        } else {
            var url = r.request.uri.href;
            var $ = cheerio.load(content);
            var title = $('.son1 h1').text();
            var $parts = $('.son2 p');
            var dynasty = $($parts[0]).text();
            var author = $($parts[1]).text();
            var main = $('.son2').clone()
                .find('.pingfen').remove().end()
                .find('p').slice(0, 3).remove().end().end()
                .find('p').after($('br')).end()
                .find('br').replaceWith('[br/]').end()
                .text().replace(/\s/g, '').replace(/\[br\/\]/g, '\n');
            text = ['## ' + title, '', dynasty, author, '', main, '', '[查看详细内容](' + url + ')'].join('\n');
        }
        if (req.method == 'POST') {
            res.json({text: text, markdown: true});
        } else {
            res.end(text);
        }
    });
};