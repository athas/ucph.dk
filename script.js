function set_pagetitle() {
  var u = ["Urimeligt", "Usandsynligt", "Uetiskt", "Uranholdigt", "Ungarnsk",
           "Underligt", "Urmenneskeligt", "Ugennemtænkte", "Ustyrligt",
           "Ungdommeligt", "Undtagelsesvist", "Uniformt", "Uregerligt"];
  var c = ["Cirklende", "Chokerende", "Ciskønnede", "Charmerende",
           "Centrerede", "Camouflerede", "Caribiske", "Censurerede",
           "C. L. Seifert-pushende", "Chokoladedryppende"];
  var p = ["Pandas", "Pandas", "Pandas", "Pandaers"];
  var h = ["Hemmelighed", "Huskeliste", "Havarikommision", "Habengut",
           "Hjemmeside", "Hemisfære", "Hengivenhed", "Hurlumhejseri"];

  var choose = function(es) { return es[Math.floor(Math.random()*es.length)]; };

  $('#pagetitle').html(choose(u) + " " + choose(c) + "<br>" + choose(p) + " " + choose(h));
}

function show_dictionary() {
  $(function() {
      $.ajaxSetup({ mimeType: "text/plain" });
      $('#CSVTable').CSVToTable('ordbog.csv');
    });
}

function startup() {
  // Setup radio.
  var playlist = new jPlayerPlaylist({
    jPlayer: "#jpId",
    cssSelectorAncestor: "#jp_container_1"
    },[
      {
        title:"DR P1",
        mp3:"http://live-icy.gss.dr.dk:8000/A/A03H.mp3"
      },
      {
        title:"DR P2",
        mp3:"http://live-icy.gss.dr.dk:8000/A/A04H.mp3" ,
      },
      {
        title:"DR P3",
        mp3:"http://live-icy.gss.dr.dk:8000/A/A05H.mp3" ,
      },
      {
        title:"DR P4 Midt & Vest",
        mp3:"http://live-icy.gss.dr.dk:8000/A/A09H.mp3"
      },
      {
        title:"DR P5",
        mp3:"http://live-icy.gss.dr.dk:8000/A/A25H.mp3"
      },
      {
        title:"DR P6 Beat",
        mp3:"http://live-icy.gss.dr.dk:8000/A/A29H.mp3"
      },
      {
        title:"DR P7 Mix",
        mp3:"http://live-icy.gss.dr.dk:8000/A/A21H.mp3"
      },
      {
        title:"DR P8 Jazz",
        mp3:"http://live-icy.gss.dr.dk:8000/A/A22H.mp3"
      },
      {
        title:"HeartBeats",
        mp3:"http://airtime.heartbeats.dk:8000/stream"
      },
      {
        title:"Pop FM",
        mp3:"http://stream.popfm.dk/pop128"
      },
      {
        title:"Radio 24syv",
          mp3: "http://rrr.sz.xlcdn.com/?account=Radio24syv&file=ENC1_Android64&type=live&service=icecast&protocol=http&port=8000&output=pls"
      },
      {
        title:"Radio Alfa (Østjylland)",
        mp3:"http://netradio.radioalfa.dk/"
      },
      {
        title:"Radio Monte Carlo FM",
        mp3:"http://icecast.105.net/RMC.mp3"
      },
      {
        title:"Radio Monte Carlo 2",
        mp3:"http://icecast.unitedradio.it/MC2.mp3"
      },
      {
        title:"Radio Riviera",
        mp3:"http://rivieraradio.ice.infomaniak.ch:80/rivieraradio-high"
      },
      {
        title:"STROM:KRAFT",
        mp3:"http://stream.stromkraftradio.fm:8012/;stream.mp3"
      },
      {
        title:"The Lake",
        mp3:"http://efterklang-sc.djj.dk:8000/;stream.mp3"
      },
      {
        title:"VRT Radio 2 Antwerpen",
        mp3:"http://mp3.streampower.be/ra2ant-high"
      }
      ],
      {
        swfPath: "./jplayer",
        supplied: "oga, mp3",
        wmode: "window",
        preload: "none",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: false
      }
  );
  $('#tab-container').easytabs({
    panelContext: $(document),
    updateHash: true
  });

  $("#jpId").bind($.jPlayer.event.play, function(event){
      var kanal = $("a.jp-playlist-current").text();
      document.title = kanal + " -- UCPH";
    }).bind($.jPlayer.event.pause, function () {
      // Don't buffer the radio while paused.
      $(this).jPlayer("clearMedia");
      playlist.select(playlist.current);
  });

  // Set a random pagetitle.
  set_pagetitle();

  // Generate and show the dictionary from ordbog.csv.
  show_dictionary();

  // Handle focus events.
  $(window).focus(function(){
              set_pagetitle();
              if ($("a.jp-playlist-current").text() == "DR P3"){
                  $("#panda")[0].src = "./image/montecarlo.png";
                  }
              else{$("#panda")[0].src = "./image/pandahoved-cirkel.png";
                  }
            });

  // Handle rus introduction.
  if (Cookies.get("vis_ikke_slide") == undefined){
    var overlay_html = `
      <div class="overlay" id="ny_slide_overlay">
      <div class="centered-box-helper">
        <div class="centered-box">
          <h1>Velkommen til UCPH.dk!</h1>
          <p>
            Vi har oprettet en underside beregnet til nye studerende
            på DIKU.  Vil du se den?
          </p>
          <p>
            <a class="knap groen" id="ja-knap">
              Ja tak, det lyder dejligt
            </a>
            <a class="knap roed" id="nej-knap">
              Nej, det gider jeg ikke
            </a>
            <a class="knap blaa" id="aldrig-knap">
              Nej, og spørg mig ikke igen
            </a>
          </p>
        </div>
      </div>
    </div>
    `;
    $(document.body).append(overlay_html);

    $("#ja-knap").click(function() {
      $("#ny_slide_overlay").remove();
      window.location.href = "#tabs1-ny-paa-diku";
    });

    $("#nej-knap").click(function() {
      $("#ny_slide_overlay").remove();
    });

    $("#aldrig-knap").click(function() {
      Cookies.set("vis_ikke_slide", "en værdi", {expires: 365});
    });
  }
}
