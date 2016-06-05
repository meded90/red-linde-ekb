"use strict";

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

function resolveUrl(url) {
  if (!/ekbredline\.ru/g.test(url)) {
    return 'http://www.ekbredline.ru/'+url;
  }
  return url
}

window.parserRedLineSite = function (url) {
  if(/<a/g.test(url)){
    var el = document.createElement('div');
    el.innerHTML = url;
    url = el.querySelector('a').getAttribute('href');
  }

  return new Promise(function (done) {
    httpGetAsync(url, function (html) {
      var result = {}
      html = html.replace(/src=/gm, 'not-src=');
      html = html.replace(/<link href=/gm, '<link not-href=');
      html = html.replace(/script/gm, 'noscript');
      html = html.replace(/(<body|<html|<head)/gm, '<div');
      html = html.replace(/(<\/body|<\/html|<\/head)/gm, '</div');

      var el = document.createElement('div');
      el.innerHTML = html;
      result.html = html;
      result.content = el.querySelector('.content_container').innerHTML;
      result.content = result.content.replace(/not-src=/gm, 'src=');
      result.content = result.content.replace(/------+/gm, '');
      result.content = result.content.replace(/(Следующий объект|Предыдущий объект)/gm, '<hr>');
      result.content = '<div class="contetn-baloon">'+result.content+'</div>'
      var elAudioEng = el.querySelector('[title="Audio in English"]');
      if (elAudioEng) {
        result.audioEng = resolveUrl(elAudioEng.getAttribute('href'));
      }

      var elAudioRu = el.querySelector('[href*="/content_files/cms/file/audio"]');
      if (elAudioRu) {
        result.audioRu = resolveUrl(elAudioRu.getAttribute('href'));
      }

      var galery = el.querySelector('.ob-fotos');
      if (galery) {
        var galeryImgs = galery.querySelectorAll('.objectfoto');
        result.imgList = [];
        result.imgListSmall = [];
        for (var i = 0; i < galeryImgs.length; i++) {
          var obj = galeryImgs[i];
          result.imgList.push(resolveUrl(obj.getAttribute('href')));
          result.imgListSmall.push(resolveUrl(obj.querySelector('img').getAttribute('not-src')));
        }
      }


      console.log(result);
      done(result)
    });
  })

}