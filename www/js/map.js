window.mapRedLine = function () {
  window.GLOBAL = {};

  // Дождёмся загрузки API и готовности DOM.

  ymaps.ready(init);


  function init() {

    document.getElementById('appLoad').setAttribute('style', 'display:none;');
    document.getElementById('app').setAttribute('style', 'display:blick;');

    // Создание экземпляра карты и его привязка к контейнеру с

    // заданным id ("map").

    myMap = new ymaps.Map('mapyandex', {

      // При инициализации карты обязательно нужно указать

      // её центр и коэффициент масштабирования.

      center: [56.838647, 60.605578], // Екатеринбург
      autoCenterin: true,
      zoom: 15,
      autoZooming: true,
      controls: ['zoomControl']

    });


    /**
     *  === События ===
     */
    myMap.events.add('click', function () {
      if (myMap.balloon.isOpen()) {
        myMap.balloon.close()
      }
    });

    var resize = function (e) {
      var w = window.innerWidth;
      var h = window.innerHeight;
      if (w > 600) {
        myMap.geoObjects.options.set({balloonCloseButton: true})
      } else {
        myMap.geoObjects.options.set({balloonCloseButton: false})
      }
      if (w > 600) {
        myMap.geoObjects.options.set({balloonPanelMaxMapArea: 0});
        return e
      }
      if (h / w > 1) {
        myMap.geoObjects.options.set({balloonPanelMaxMapArea: 'Infinity'});
        return e
      }
      myMap.geoObjects.options.set({balloonPanelMaxMapArea: 0})
      return e
    };
    myMap.events.add(['sizechange', 'balloonopen'], resize);
    resize();


    /**
     * === Настройки ===
     */
    myMap.behaviors.enable('multiTouch');


    /**
     * === Элементы ===
     */


    /**
     *  Logo
     */
    var LogoLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="header">\n        \n    <div class="header-wrap1">\n    <div class="header-wrap">\n        <div class="logo">\n            <!--<img src="./img/logo-big.png" alt="">-->\n        </div><!--\n        --><div id="plaer"></div>\n    </div>\n    </div>\n</div>'
      , {
        build: function () {
          LogoLayout.superclass.build.call(this);
          var el = $(this.getElement());
          el.find(".logo").on('click', this.open.bind(this));
        },
        open: function (e) {
          $('.modal').show();
        }
      });
    var logo = new ymaps.control.Button({
      options: {
        layout: LogoLayout
      }
    });
    myMap.controls.add(logo, {float: 'left'});


    /**
     * Plaer
     */
    new RedLinePlaer();

    /**
     *  Linde
     */
    myGeoObject = new ymaps.GeoObject({

      // Описываем геометрию геообъекта.
      geometry: {

        // Тип геометрии - "Ломаная линия".
        type: "LineString",

        // Указываем координаты вершин ломаной.
        coordinates: [[56.83867981461211, 60.6042993842697], [56.83801761431242, 60.59853074401854], [56.83791406430234, 60.598432293624846], [56.83763639565251, 60.59553172615046], [56.837604434364444, 60.59426888885494], [56.83721119284025, 60.59448979629513], [56.83680200681912, 60.59467435887807], [56.836357531212606, 60.5948160061168], [56.8354038731086, 60.59512075826636], [56.8335435341524, 60.59570880489343], [56.83403529356772, 60.60033870369188], [56.834053611469685, 60.600424940419124], [56.834490167521054, 60.60451343903537], [56.834557557043375, 60.60460089387888], [56.83464528675631, 60.60548390674588], [56.834647021390566, 60.60562239418027], [56.834601707010776, 60.605680415344224], [56.83457109541191, 60.60550776653288], [56.83446991004355, 60.60554969444274], [56.83417690873152, 60.60588906745911], [56.83367323718164, 60.60657854232783], [56.83274821369754, 60.6074746944427], [56.832655230985495, 60.60751986871715], [56.832315226220004, 60.60747921230307], [56.83229405551554, 60.608006618385275], [56.832452396925376, 60.60790803191182], [56.833284157068604, 60.60755731779098], [56.834741783450056, 60.60692026256561], [56.83501648764296, 60.609340626983645], [56.835285308789295, 60.611573236770596], [56.835240603385074, 60.612089008598275], [56.83521354106586, 60.61276571296689], [56.835282918053835, 60.613754341278025], [56.83523029184807, 60.61383368601792], [56.835262940580904, 60.61417052282329], [56.83532823795336, 60.61426483928682], [56.83554910184282, 60.614199230480075], [56.83581701198656, 60.61639204166402], [56.83934390069035, 60.61508304893486], [56.83937473459934, 60.61536728836056], [56.83962239338579, 60.61772396560671], [56.83996598688049, 60.61758906745906], [56.84017187611377, 60.61747775910377], [56.83985442092161, 60.61471642824171], [56.83952528213881, 60.61162921230314], [56.84093597725235, 60.61111711338276], [56.842033794144456, 60.61070817800867], [56.84198794278165, 60.61022414078226], [56.84200501934709, 60.61017338181245], [56.84214557489946, 60.610133351678755], [56.842208000908975, 60.61017707902901], [56.843114872728655, 60.6098568379592], [56.84414891791955, 60.60952773825629], [56.84495874676942, 60.609303644180294], [56.844927139655056, 60.60887953529831], [56.844866134962366, 60.608723647317845], [56.84450894326125, 60.60820802347177], [56.84435017537198, 60.60819065078735], [56.84430016041786, 60.60771065872188], [56.84405313956218, 60.60780210052487], [56.84402358782863, 60.60750218650812], [56.84387646752844, 60.60755001471516], [56.84370876772773, 60.606095805873885], [56.84291474269457, 60.606384581337], [56.84214087281277, 60.60666113624565], [56.842154765364704, 60.60682116567608], [56.841721779956764, 60.606991923942566], [56.84154029438202, 60.60561058572295], [56.84150286926429, 60.60531822436336], [56.841428018916105, 60.605098282070166], [56.84150176008087, 60.60484078769684], [56.841224047670366, 60.60465357431881], [56.84112861680847, 60.60463265789981], [56.840179209585955, 60.60488050363539], [56.838856612185225, 60.60527963558198], [56.838846804102424, 60.605458826389274], [56.83876643040343, 60.60560583068846], [56.83906355450282, 60.6083913445663], [56.83864117925209, 60.60853571758273], [56.83859, 60.60801], [56.838622618079036, 60.60780580803869], [56.83851410406599, 60.6068291398811], [56.83837352214625, 60.60563755092619], [56.8381122249639, 60.60572323677062], [56.83799455572161, 60.60451262104032], [56.83867981461211, 60.6042993842697]]
      }

    }, {

      draggable: false,

      strokeColor: "#de352c",

      strokeWidth: 5

    });
    myMap.geoObjects.add(myGeoObject);


    /**
     *  Point
     */
    var clusterer = new ymaps.Clusterer({
      preset: 'islands#invertedRedClusterIcons',
      groupByCoordinates: false,
      clusterDisableClickZoom: false,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false,
      // gridSize: 80,
    });
    var bodyLayout = new ymaps.Template(
      "<div class=\'balloon-body\'> \n    {% if audioRu %} \n     <div class=\'btn balloon-audeo js-balloon-audeo\' data-audeo=\'{{  audioRu }}\'>\n         <i class=\'icon-pacman\'></i>\n         Аудиогид\n     </div> \n    {% endif %}      \n    {% if audioEng %} \n     <div class=\'btn balloon-audeo js-balloon-audeo\' data-audeo=\'{{  audioEng }}\'>\n         <i class=\'icon-pacman\'></i>\n         Audio guide English\n     </div> \n    {% endif %}\n    \n    {% if content %} \n        {{ content | raw  }}\n    {% else %}\n        <div style=\'text-align: center;\'> Загрузка...</div>\n    {% endif %}\n\n</div>"
    )


    var geoObjects = [];
    for (var i = 0; i < window.ContentPoint.length; i++) {
      (function () {

        var obj = window.ContentPoint[i];
        obj.balloonContentBody = "<div style=\'text-align: center;height: 350px;  font-size: 50px;  \'>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <i class=\'icon-spinner2 spin\'> </i>\n</div>";

        var placemark = new ymaps.Placemark([obj.point[0], obj.point[1]],
          obj, {
            balloonPanelMaxHeightRatio: 0.6,
            balloonMinWidth: 400,
            preset: 'islands#redCircleIcon',
            balloonShadow: false,
            hideIconOnBalloonOpen: false,
          });


        // load content
        placemark.events.add('balloonopen', function (e) {
          var link = placemark.properties.get('link');
          var obj = parserRedLineSite(link);
          obj.GLOBAL = window.GLOBAL;  //TODO: добавить прокладыване маршрута
          var data = new ymaps.data.Manager(obj);
          var text = bodyLayout.build(data).text;
          placemark.properties.set('balloonContentBody', text);
        });

        geoObjects[i] = placemark;
      })()


    }
    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);

    /**
     * pointer to center
     */
    myMap.setBounds(myMap.geoObjects.getBounds(),
      {
        autoCenterin: true,
        checkZoomRange: true,
        zoomMargin: 10,
        duration: 200
      })
      .then(function () {
        myMap.setZoom(myMap.getZoom());
        // if(myMap.getZoom() > 10) myMap.setZoom(10);
      });


  }

  /**
   * self geo
   */
  var id = setInterval(function () {
    if (ymaps.geolocation) {
      clearInterval(id);
      ymaps.geolocation.get({
        // Выставляем опцию для определения положения по ip
        provider: 'browser',
        // Карта автоматически отцентрируется по положению пользователя.
        mapStateAutoApply: false
      }).then(function (result) {
        result.geoObjects.options.set('preset', 'islands#blueCircleDotIcon');
        window.GLOBAL.mayGeo = result.geoObjects;
        myMap.geoObjects.add(result.geoObjects);
      });
    }
  }, 300)


}