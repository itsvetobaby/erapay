import { html } from '../Helpers.js';
import {translate as t} from '../Translation.js';
import State from '../State.js';
import Session from '../Session.js';
import ProfilePhotoPicker from '../components/ProfilePhotoPicker.js';
import { route } from '../lib/preact-router.es.js';
import SafeImg from '../components/SafeImg.js';
import CopyButton from '../components/CopyButton.js';
import FollowButton from '../components/FollowButton.js';
import Identicon from '../components/Identicon.js';
import View from './View.js';

class Orders extends View {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
    this.cart = {};
    this.state = {items:{} , orderglobal:{}, orderpiece:{}};
    this.items = {};
    this.orderglobal = {};
    this.orderpiece = {};
    this.state.bidBool = false;

    this.id = 'profile';
    
  }

  addToCart(k, e) {
    e.stopPropagation();
    const count = (this.cart[k] || 0) + 1;
    State.local.get('cart').get(this.props.orders).get(k).put(count);
  }

  shouldRedirect() {
    if (!this.props.orders) {
      route('/orders/' + Session.getPubKey());
      return true;
    }
  }

  



  renderOut() {
    if (this.shouldRedirect()) {
      return '';
    }
    this.isMyProfile = Session.getPubKey() === this.props.orders;
    const chat = Session.channels[this.props.orders];



    function showHideDiv(ele) {
      var srcElement = document.getElementById(ele);
      if (srcElement != null) {
        if (srcElement.style.display == "block") {
          srcElement.style.display = 'none';

        }
        else {
          srcElement.style.display = 'block';

        }
        return false;
      }
    }

    function showHideOrder(divOrder) {
      var srcElement = document.getElementById(divOrder);
      if (srcElement != null) {
        if (srcElement.style.display == "block") {
          srcElement.style.display = 'none';

        }
        else {
          srcElement.style.display = 'block';

        }
        return false;
      }
    }

    

    var qr;
    (function() {
            qr = new QRious({
            element: document.getElementById('qr-code'),
          
            foreground: 'black',
            background: '#ffffff00',
            

            value: window.location.href 
        });
      })();

    

      return html`

    <style>
    .copy-button {
       min-width: 0px; 
  }

  canvas#qr-code {
    width: 100%;

}

  .profile-actions button, .feed-container > p button {
    margin-right: 5px;
    margin-bottom: 0em;
    padding: 0em;
}

pre, blockquote, dl, figure, table, p, ul, ol, form {
   margin-bottom: 0rem;
}

.profile-header-stuff {
  flex: none !Important;
  width: 100%
}

.profile-header {
  display: flex;
  flex-direction: row;
  justify-items: center;
  margin-bottom: 0px;
}

.orders-items {
  display: block;
  flex-wrap: wrap;
}

.orderIncoming{
  background-color: #464646;
  color: white;
}

p.profile-about-content{
  display:none
}
    </style>

        <div id="divMsg" style="display:none; position: absolute; margin-top: 10em; width: 100%; z-index: 2004;     background-color: #ffffffe0;height: 100%; text-align: center;margin-top: -2em;padding-top: 10em; " onClick=${() => {
          showHideDiv('divMsg');}}>
          <div style="border-radius: 10px;padding: 0.2em; margin: auto;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 1004 height: 20em;     background-color: white;
          width: 20em !important;">
            <h1 style="font-family: arialBlack">IXNAY</h1>
            <a spellcheck="false" href="/orders/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: white;margin-top: 1em"><i class="far fa-user" style=" color: white"></i><iris-text spellcheck="false" style="margin-left: 1em; color: white" path="profile/name" user=${Session.getPubKey()} /></button></a>

            <canvas id="qr-code" style="align-content: center  ;"></canvas>
          </div>    
        </div>




        <div class="container blurThis" style=" color: white; z-index: 1002; margin-top: 0px" >
        <div class="columns twelve" style="padding-bottom: 3px; padding-top: 10px; margin-left: 0px; color: white; display: flex; padding-right: 2em; margin-right: 1em">
          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 0px" class="">

            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;    margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #c5c5c5 solid ">
              <a href="/store/${Session.getPubKey()}"><i class="far fa-user" style=" color: #c5c5c5"></i><iris-text style="margin-left: 1em; color: #c5c5c5" path="profile/name" user=${Session.getPubKey()} /></a>
            </button>

            ${this.isMyProfile ? html`
            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;    margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00" onClick=${() => route(`/product/new`)}>
              <a href="/product/new" class="" style="color: #c5c5c5;"><i class="fas fa-share" style="color: #c5c5c5;"></i> New Blueprint</a>
            </button>
            ` : ''}
          </div>
        
        </div>
      </div>


      <div class="container" style="height: fit-content; display: flex">

        <div class="columns twelve" style=" height:fit-content; ">
          <div class=""  >
            <div style=" height: fit-content; font-weight: 600; font-size: 1.7em; margin-bottom: 3em " id="hideBlues"> 
              <div style="width:100%;  border-bottom: 2px solid grey;color: white; padding: 5px;">
                <h2 class="" style=""> ON ORDER</h2>
                <div style="display: flex; ">
              
                  <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class=""></p>
                  <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class=""></p>
                </div>

              </div>
              <div style="margin-top: 2em">

                ${Object.keys(this.state.orderpiece).map(k => {
                  const i = this.state.orderpiece[k];
                  var itemNames = i.itemNames
                  var itemNamesString = itemNames.split("{").join(' ').split(`"`).join(' ').split(':').join(" : ").split(',').join(" | ").split('}');


                  return html`
                  <div class="menuItem slim" style="width:100%;">
                    <div >
                      <div class=""  style="display: flex; padding-top: 5px; padding-bottom: 5px; width:100%">
        
                        <div style="display: flex;width:100%">
                          <div style="display :flex; margin-right: 1.3em ">
                            <div class="smolbar2" id="timeBar" style=""></div>
                            <div class="smolbar2" style=""></div>
                            <div class="smolbar2" style=""></div>
                          </div>
                          <div class="container">
                            <p class="columns three description" style="color: #000 !important; font-size: 20px; font-weight: 400;" id="orderTime">[${i.time}]</p>
                            <p class="columns three description" style="color: #000 !important;  font-size: 20px; font-weight: 400;" >[${i.productName}]</p>
                            <p class="columns three description" style="color: #000 !important;  font-size: 20px; font-weight: 400; " >[${i.delivery}]</p>
                            <p class="columns three description" style="color: #000 !important; font-size: 20px; font-weight: 400;" >[${itemNamesString}]</p>
                          </div>

                          

                          <div class="" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 2px" class="">              ${this.isMyProfile ? html`
                          
                            <button class="" style="padding: 3px 10px; margin-left: 0em; height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px ; background-color: #ffffff00"  onClick=${() => {
                              showHideOrder('divOrder');
                              } 
                              
                              }><i class="fas fa-expand" style="font-size: 1.5em; color: #c5c5c5"></i>
                            </button>
                          ` : ''}</div>


                        </div>

                      </div>
                    </div>
                    
                  </div>
                  
                  `
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }






  renderIn() {
    if (this.shouldRedirect()) {
      return '';
    }
    this.isMyProfile = Session.getPubKey() === this.props.orders;
    const chat = Session.channels[this.props.orders];

    (function($) {
      $(document).ready(function(){
        var HoverHandler = function(info) {
            var _info = info;
            var _inflight = false;
            var _xhr = null;
            
            this.overstation = function(e)
            {
                _inflight = true;
                _xhr = $.getJSON( "https://api.tfl.gov.uk/StopPoint/"+e.target.options.options.id+"/Arrivals?mode=tube", function( data ) {
                    _inflight = false;
                    _xhr = null;
    
                    function sortbylineandarrival(a, b)
                    {
                        var aline = a.lineId;
                        var bline = b.lineId;
    
                        var aplatform = a.platformName;
                        var bplatform = b.platformName;
    
                        var atime = a.timeToStation;
                        var btime = b.timeToStation;
    
                        if (aline < bline) return -1;
                        if (aline > bline) return 1;
                        if (aplatform < bplatform) return -1;
                        if (aplatform > bplatform) return 1;
                        if (atime < btime) return -1;
                        if (atime > btime) return 1;
                        return 0;
                    }
                    
                    data.sort(sortbylineandarrival);
                    _info.update(e.target.options.options.name, data);
                });
                e.target.openPopup();
            }
            
            this.outstation = function(e)
            {
                if (_inflight)
                {
                    _xhr.abort();
                }
                e.target.closePopup();
                _info.update();
                _xhr = null;
                _inflight = false;
            }
        }
        
        var InfoCardView = function(map, linecolors, linenames) {
            var _map = map;
            var _info = L.control();
            var _div = null;
            var _linecolors = linecolors;
            var _linenames = linenames;
    
            var _update = function(station, arrivals)
            {
                _div.innerHTML = '<h4>London Underground</h4>';
                if (arrivals)
                {
                    _div.innerHTML += '<b>Arrivals at '+station+':</b>';
                    var lineid = "";
                    var platformName = "";
                    var count = 0;                
                    $.each(arrivals, function(k, v) { 
                        {
                            if (v.lineId != lineid)
                            {
                                lineid = v.lineId;
                                count = 0;
                                _div.innerHTML += '<div style="margin-top:7px; margin-bottom:7px; padding:5px; display:block; color:white; background-color:'+_linecolors[lineid]+'">'+_linenames[lineid]+'</div>'
                            }
                            if (v.platformName != platformName)
                            {
                                platformName = v.platformName;
                                count = 0;
                                _div.innerHTML += '<div style="margin-top:7px; margin-bottom:7px; display:block;">'+v.platformName+'</div>'                            
                            }                        
                            if (count < 3)
                            {
                                _div.innerHTML += v.towards + ' - ' + timeconv(v.timeToStation) + '<br/>';
                                count += 1;
                            }
                        }
                    });
                }
                else
                {
                    _div.innerHTML += '<b>Hover over a station</b>';
                }
            }
            
            this.update = function(station, arrivals)
            {
                _update(station, arrivals);
            }
            
            _info.onAdd = function (map) {
                _div = L.DomUtil.create('div', 'info');
                _update();
                return _div;
            };
            
            _info.addTo(_map);
        }
    
        var StopPointFactory = function(map, hovercard) {
            var _stopPoints = {}
            var _map = map;
            var _hovercard = hovercard;
            var _icon = L.icon({iconUrl: 'icon1_underground.png', iconSize: [36, 36], iconAnchor: [18, 18]});
    
            this.build = function(stopPointId, name, lat, lon)
            {
                if (!(stopPointId in _stopPoints))
                {
                    var ll = [lat, lon];
                    var marker = L.marker(ll, {
                        title: name,
                        options: {"id":stopPointId, "name":name}
                      }).addTo(_map);
                    marker.bindPopup(name);
                    marker.on('mouseover',_hovercard.overstation); 
                    marker.on('mouseout',_hovercard.outstation);
                    _stopPoints[stopPointId] = marker;
                }
                return _stopPoints[stopPointId];
            }
        }
    
        var LineFactory = function(id, stoppointfactory, map, linecolors) {
            var _id = id;
            var _linecolors = linecolors;
            var _stopPointFactory = stoppointfactory;
            var _map = map;
            var _stopPoints = {};
    
            this.fetch = function()
            {
                $.getJSON( "https://api.tfl.gov.uk/line/"+id+"/route/sequence/outbound", function( data ) { 
                    $.each(data.stopPointSequences, function(k, v) { 
                        var line = [];
                        $.each(v.stopPoint, function(k, sp) {
                            line.push([sp.lat, sp.lon]);
                            _stopPoints[sp.id] = _stopPointFactory.build(sp.id, sp.name, sp.lat, sp.lon);
                        });
                        var polyline = L.polyline(line, {weight:8, color:_linecolors[_id]}).addTo(_map);
                    });
                });
            }
        }
        
        function timeconv(sec) {
            var seconds = sec;
            var minutes = Math.round((sec/(60)));
            if (seconds < 60) {
                return seconds + "s";
            } else {
                return minutes + "m";
            } 
        }
        
        var map = L.eeGeo.map("map", "f7947bc1f34af0f1939d4414aa014118", {
            center: [51.517327, -0.120005],
            zoom: 16
        });
        
        var linecolors = {
                          "bakerloo":"#996633",
                          "central":"#CC3333",
                          "circle":"#FFCC00",
                          "district":"#006633",
                          "hammersmith-city":"#CC9999",
                          "jubilee":"#868F98",
                          "metropolitan":"#660066",
                          "northern":"#000000",
                          "piccadilly":"#0019A8",
                          "victoria":"#0099CC",
                          "waterloo-city":"#66CCCC"
                        };
        var linenames = {
                          "bakerloo":"Bakerloo",
                          "central":"Central",
                          "circle":"Circle",
                          "district":"District",
                          "hammersmith-city":"Hammersmith &amp; City",
                          "jubilee":"Jubilee",
                          "metropolitan":"Metropolitan",
                          "northern":"Northern",
                          "piccadilly":"Piccadilly",
                          "victoria":"Victoria",
                          "waterloo-city":"Waterloo &amp; City"
                        };                    
        var infocard = new InfoCardView(map, linecolors, linenames);
        var hover = new HoverHandler(infocard);
        var stopPointFactory = new StopPointFactory(map, hover);
        var lines = [];
    
        $.getJSON( "https://api.tfl.gov.uk/line/mode/tube", function(data) {
            $.each(data, function(k, line) {
                var lineFactory = new LineFactory(line.id, stopPointFactory, map, linecolors);
                lineFactory.fetch();
                lines.push(lineFactory);
            });
        });
      });
    }(jQuery));

    jQuery(document).ready(function ($) {
      //Set default open/close settings
      var divs=$('.accordion>div').hide(); //Hide/close all containers
  
      var h2s=$('.accordion>h2').click(function () {
          h2s.not(this).removeClass('active')
          $(this).toggleClass('active')
          divs.not($(this).next()).slideUp()
          $(this).next().slideToggle()
          return false; //Prevent the browser jump to the link anchor
  
      });

      var mymap = L.map('mapid').setView([51.505, -0.09], 13);


      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'suckma/ckpnlfjf80lb117mji70ezybv',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1Ijoic3Vja21hIiwiYSI6ImNrb2o4OTI2aTEzMTcydnBudGhoZzA0Mm8ifQ.gwJKwHzGdFtYQDnq4iqsoQ'
      }).addTo(mymap);
  
  
    });


    function showHideDiv(ele) {
      var srcElement = document.getElementById(ele);
      if (srcElement != null) {
        if (srcElement.style.display == "block") {
          srcElement.style.display = 'none';

        }
        else {
          srcElement.style.display = 'block';

        }
        return false;
      }
    }

  

 


    var qr;
    (function() {
            qr = new QRious({
            element: document.getElementById('qr-code'),
          
            foreground: 'black',
            background: '#ffffff00',
            

            value: window.location.href 
        });
      })();

    

      return html`

    <style>
    .copy-button {
       min-width: 0px; 
  }

  canvas#qr-code {
    width: 100%;

}

  .profile-actions button, .feed-container > p button {
    margin-right: 5px;
    margin-bottom: 0em;
    padding: 0em;
}

pre, blockquote, dl, figure, table, p, ul, ol, form {
   margin-bottom: 0rem;
}

.profile-header-stuff {
  flex: none !Important;
  width: 100%
}

.profile-header {
  display: flex;
  flex-direction: row;
  justify-items: center;
  margin-bottom: 0px;
}

.orders-items {
  display: block;
  flex-wrap: wrap;
}

p.profile-about-content{
  display:none


}

.orderGlobal{
  background-color: #464646;
  color: white;


}


    </style>

        <div id="divMsg" style="display:none; position: absolute; margin-top: 10em; width: 100%; z-index: 2004;     background-color: #ffffffe0;height: 100%; text-align: center;margin-top: -2em;padding-top: 10em; " onClick=${() => {showHideDiv('divMsg');}}>
          <div style="border-radius: 10px;padding: 0.2em; margin: auto;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 1004 height: 20em;     background-color: white;width: 20em !important;">
            <h1 style="font-family: arialBlack">IXNAY</h1>
            <a spellcheck="false" href="/orders/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: white;margin-top: 1em"><i class="far fa-user" style=" color: white"></i><iris-text spellcheck="false" style="margin-left: 1em; color: white" path="profile/name" user=${Session.getPubKey()} /></button></a>
            <canvas id="qr-code" style="align-content: center  ;"></canvas>
          </div>    
        </div>




      <div class="container" style=" background-color: white; z-index: 1002; margin-top: 0px" >
        <div class="columns twelve" style="padding-bottom: 3px; padding-top: 10px; margin-left: 0px;  color: white; display: flex; padding-right: 2em; margin-right: 1em">
          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 0px" class="">

            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;    margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #c5c5c5 solid ">
              <a href="/store/${Session.getPubKey()}"><i class="far fa-user" style=" color: #c5c5c5"></i><iris-text style="margin-left: 1em; color: #c5c5c5" path="profile/name" user=${Session.getPubKey()} /></a>
            </button>

            ${this.isMyProfile ? html`
            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;    margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00" onClick=${() => route(`/product/new`)}>
              <a href="/product/new" class="" style="color: #c5c5c5;"><i class="fas fa-share" style="color: #c5c5c5;"></i> New Blueprint</a>
            </button>
            ` : ''}
          </div>
        </div>
      </div>
      <div class="container" style="display :flex ; height: fit-content">

        <div class="columns four" style=" height:fit-content; ">
          <div class="" >
            <div style=" height: fit-content; font-weight: 600; font-size: 1.7em; margin-bottom: 2em " id="hideBlues"> 
              <div style="width:100%; color: white; padding: 5px;">
                <h2 class="" style=""> GLOBAL ORDERS</h2>
                <div style="display: flex; ">
                  <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class=""></p>
                  <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class=""></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${
        Object.keys(this.state.orderglobal).map(k => {
        const i = this.state.orderglobal[k];

        var pub = Session.getPubKey();

        var itemNames = i.itemNames + ''
        var itemNamesString = itemNames.split("{").join(' ').split(`"`).join(' ').split(':').join(" : ").split(',').join(" | ").split('}');


    return html`
      <div class="" style="">
        <div class=" " style="margin-top: 1em: height: auto !Important">     
          <div class=""  style="padding-top: 5px; padding-bottom: 5px; width:100%;">         
              <div class="container" id="">
                <div class="columns twelve">
                  <div class="menuItem" style="  padding: 1em; margin-top: 1em; border-radius: 5px 5px 0px 0px">
                    <div class="accordion" style="width: 100%;  border-radius: 0px 0px 5px 5px">
                        <p class=" description" style=" margin: 4px; font-size: 20px; font-weight: 400" id="getproductName">[${i.productName}]</p>
                        <h2 class="acc_trigger"><i style="" class="fas fa-expand"></i></h2>

                      <div class="acc_container">
                        <div class="block">
                          <a href="/store/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: black !Important;margin-top: 1em"><i class="far fa-user" style=" color: #fff"></i><iris-text style="margin-left: 1em; color: #fff" path="profile/name" user=${Session.getPubKey()} /></button></a><br/>
                          <h3 class="" style="margin: 0px;  font-size: 20px; font-weight: 600"><a id="showtime" style="" contenteditable="false">${i.time}</a></h3><br/>
                          <h3 class="" style="margin: 0px; font-size: 20px; font-weight: 600"><a id="showproductName" style=""  contenteditable="false">${i.getPub}</a></h3><br/>
                          <h3 class="" style="margin: 0px; font-size: 20px; font-weight: 600"><a id="showproductName" style=""  contenteditable="false">${i.delivery}</a></h3><br/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
              </div> 
          </div> 
        </div>
      </div>

      `
        })}
    `;
  }

  render() {
    let page;
      const p = this.state.page;
      if (p === 'out') {
        page = this.renderOut();
      }  else if(p === 'in') {
        page = this.renderIn();
      } else {
        page = this.renderOut();

      }
    return html`
    <div class="main-view" id="profile">
      <div class="">
    
        <div style="display: flex;   width: fit-content;     background-color: white; border: 2px solid #464646; border-radius: 5px; margin-left: 6px; margin-top: 3em" class="viewTabs">
          <div id="store-steps" style="margin: 0em;">
            <div  class=${p === 'out' ? 'active' : ''} onClick=${() => this.setState({page:'out'})}><div class="orderIncoming paddingSteps">ON ORDER</div></div>
          </div>
          <div id="store-steps" style="margin: 0em;">
            <div  class=${p === 'in' ? 'active' : ''} onClick=${() => this.setState({page:'in'})}><div class="orderGlobal paddingSteps">GLOBAL ORDERS</div></div>
          </div>
        </div>
        ${page}
      </div>
    </div>`;
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orders !== this.props.orders) {
      this.componentDidMount();
    }
  }

  updateTotalPrice() {
    const totalPrice = Object.keys(this.cart).reduce((sum, currentKey) => {
      const item = this.items[currentKey];
      const price = item && parseInt(item.price) || 0;
      return sum + price * this.cart[currentKey];
    }, 0);
    this.setState({totalPrice});
  }

  componentDidMount() {
    if (this.shouldRedirect()) {
      return;
    }
    const pub = this.props.orders;
    this.eventListeners.forEach(e => e.off());
    this.setState({time: " ", followerCount: 0, name: '', photo: '', about: ''});



    if (pub) {
      State.public.user(pub).get('store').get('liveOrders').map().on((x, jd) => {
        if (x) {
          const n = {};
          n[jd] = x;
          Object.assign(this.orderpiece, n);
          this.updateTotalPrice();
        } else {
          delete this.orderpiece[jd];
        }
        this.setState({orderpiece: this.orderpiece});
      });
    }

    

    if (pub) {
      State.public.get('globalOrderList').map().on((x, jd) => {
        if (x) {
          const n = {};
          n[jd] = x;
          Object.assign(this.orderglobal, n);
          this.updateTotalPrice();
          State.local.get('paymentMethod').on(bidBool => this.setState({bidBool}));
        } else {
          delete this.orderglobal[jd];
        }
        this.setState({orderglobal: this.orderglobal});
      });
    }
  }
}


export default Orders;
