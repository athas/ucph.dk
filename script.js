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

var channelList = [
      {
        title:"bitreich.org",
        mp3:"http://bitreich.org:3232/live"
      },
      {
        title:"DEF CON Radio",
        mp3:"http://ice1.somafm.com/defcon-256-mp3"
      },
      {
        title:"DR P1",
        mp3:"http://live-icy.gss.dr.dk/A/A03H.mp3"
      },
      {
        title:"DR P2",
        mp3:"http://live-icy.gss.dr.dk/A/A04H.mp3"
      },
      {
        title:"DR P3",
        mp3:"http://live-icy.gss.dr.dk/A/A05H.mp3"
      },
      {
        title:"DR P4 Midt & Vest",
        mp3:"http://live-icy.gss.dr.dk/A/A09H.mp3"
      },
      {
        title:"DR P5",
        mp3:"http://live-icy.gss.dr.dk/A/A25H.mp3"
      },
      {
        title:"DR P6 Beat",
        mp3:"http://live-icy.gss.dr.dk/A/A29H.mp3"
      },
      {
        title:"DR P7 Mix",
        mp3:"http://live-icy.gss.dr.dk/A/A21H.mp3"
      },
      {
        title:"DR P8 Jazz",
        mp3:"http://live-icy.gss.dr.dk/A/A22H.mp3"
      },
      {
        title:"Globus Guld (Kolding)",
        mp3:"http://stream2.wlmm.dk/guldkoldingmp3"
      },
      {
        title:"HeartBeats",
        mp3:"https://airtime.heartbeats.dk:8443/320k"
      },
      {
        title:"Lush",
        mp3:"http://ice1.somafm.com/lush-128-aac"
      },
      {
        title:"Pop FM",
        mp3:"http://stream.popfm.dk/pop128"
      },
      {
        title:"Antenne Bayern",
        mp3:"http://mp3channels.webradio.antenne.de/antenne"
      },
      {
        title:"Radioplay - Danske 80'er Hits",
        mp3:"http://edge-bauerdk-01-cr.sharp-stream.com/150_dk_aacp"
      },
      {
        title:"Radio 24syv",
        mp3:"http://live.taleradio.dk/Web"
      },
      {
        title:"Reprezent 107.3FM",
        mp3:"http://radio.canstream.co.uk:8022/live.mp3"
      },
      {
        title:"Radio Alfa (Østjylland)",
        mp3:"http://netradio.radioalfa.dk/alfa"
      },
      {
        title:"Radio Monte Carlo FM",
        mp3:"http://icecast.unitedradio.it/RMC.mp3"
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
        title:"Radio Viborg",
        mp3:"http://netradio.radioviborg.dk/viborg"
      },
      {
        title:"STROM:KRAFT - Electronic Channel",
        mp3:"http://37.61.204.209:8012/;"
      },
      {
        title:"STROM:KRAFT - Techno Channel",
        mp3:"http://37.61.204.209:8022/;"
      },
      {
        title:"The Lake",
        mp3:"http://hyades.shoutca.st:8627/;"
      },
      {
        title:"Uniradioen",
        mp3:"http://uniradio.out.airtime.pro:8000/uniradio_a"
      },
      {
        title:"Retro Radio",
        mp3:"http://streammp3.retro-radio.dk/retro-mp3"
      }
];

var sortedChannels = channelList.sort(function(a,b){
  var A = a.title.toUpperCase();
  var B = b.title.toUpperCase();
  if (A < B){return -1;}
  if (A > B){return 1;}
  return 0;
});

var defaultChannel =
        {
            title:"Radio Alfa (Østjylland)",
            mp3:"http://netradio.radioalfa.dk/"
        };

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function show_dictionary() {
  $("#tabs1-ordbog").html(`
    <h1><a name="tabs1-ordbog">DIKURDBOG</a></h1>
    <div id="CSVTable"></div>
    `);

  $(function() {
      $.ajaxSetup({ mimeType: "text/plain" });
      $('#CSVTable').CSVToTable('ordbog.csv');
    });
}

function get_latest_commits() {
    $.getJSON("https://api.github.com/repos/Athas/ucph.dk/commits")
        .done(function(data) {
            $.each(data.slice(0, 10), function(i, item) {
                $("<li/>", {
                    'html': $("<a/>", {
                        'href': item.html_url,
                        'text': item.commit.author.name + ": " + item.commit.message
                    })}
                 ).appendTo("#commits");
            });
        });
}

function startup() {
  // Setup radio.
  var playlist = new jPlayerPlaylist({
      jPlayer: "#jpId",
      cssSelectorAncestor: "#jp_container_1",
      swfPath: "./jplayer",
      supplied: "oga, mp3",
      wmode: "window",
      preload: "none",
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: false
  }, sortedChannels);


  $('#tab-container').easytabs({
    panelContext: $(document),
    updateHash: true
  });

   var jp = $("#jpId");
    jp.bind($.jPlayer.event.play, function(event){
      var kanal = $("a.jp-playlist-current").text();
      document.title = kanal + " -- UCPH";
    }).bind($.jPlayer.event.pause, function () {
      // Don't buffer the radio while paused.
      $(this).jPlayer("clearMedia");
      playlist.select(playlist.current);
  });
    var requestedChannel = getParameterByName("radio");
    if (requestedChannel != null){
        var flatTitle;
        var elm;
        var i;
        var givenChannel = defaultChannel;
        for (i in channelList){
            elm = channelList[i];
            flatTitle = elm["title"].replace(/\s/g,'').toLowerCase();
            if (flatTitle.indexOf(requestedChannel) !== -1){
                givenChannel = elm;
            }
        };

        jp.bind($.jPlayer.event.play, function(event){
                $("#jpId").jPlayer("setMedia", givenChannel)
                .jPlayer("play");}
               );
    };

  // Set a random pagetitle.
  set_pagetitle();

  // Generate and show the dictionary from ordbog.csv.
  show_dictionary();

  get_latest_commits();

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
      $("#ny_slide_overlay").remove();
      Cookies.set("vis_ikke_slide", "en værdi", {expires: 365});
    });
  }

}
