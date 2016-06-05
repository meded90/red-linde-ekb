/**
 * Created by meded90 on 05.06.16.
 */
window.Player = function () {

  return {

    init: function($el) {

      audiojs.events.ready(function () {

        audiojs.createAll({
          css: false,
          createPlayer: {
            markup: '\
          <div class="play-pause"> \
              <div class="jsPlay">\
                <p class=" play fa icon-play2"></p> \
                <p class=" pause fa icon-pause"></p> \
              </div> \
            <p class="loading  icon-spinner2 spin"></p> \
            <p class="error fa  icon-history"></p> \
          </div> \
          <div class="time">  \
            <em class="played">00:00</em>/<strong class="duration">00:00</strong> \
          </div> \
          <div class="scrubber"> \
            <div class="progressAudeo"></div> \
            <div class="loaded"></div> \
          </div> \
          <div class="error-message"></div>',
            playPauseClass: 'jsPlay',
            scrubberClass: 'scrubber',
            progressClass: 'progressAudeo',
            loaderClass: 'loaded',
            timeClass: 'time',
            durationClass: 'duration',
            playedClass: 'played',
            errorMessageClass: 'error-message',
            playingClass: 'playing',
            loadingClass: 'loading',
            errorClass: 'error',
          },
          autoplay: true,
        }, $el.find('audio').get() );
      });
    }
  }
}();

window.RedLinePlaer = function () {
  var _this = this;
  if (!RedLinePlaer.prototype.instance) {
    RedLinePlaer.prototype.instance = this
  } else {
    return RedLinePlaer.prototype.instance
  }

  $(window.document).on('click.redLine', '.js-balloon-audeo', function () {
    $this = $(this);
    _this.openAudeo($this.data('audeo'))
  });

  return this
}

RedLinePlaer.prototype.openAudeo = function (url) {
  this.$el = $('#plaer');
  this.clear();
  this.$el.html('<audio src="'+url+'" preload="auto"  />');
  Player.init(this.$el)
}

RedLinePlaer.prototype.clear = function () {
  this.$el.html()
}
