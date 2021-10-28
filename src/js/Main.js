import { render } from './lib/preact.js';
import { Router } from './lib/preact-router.es.js';
import { Component } from './lib/preact.js';
import { Link } from './lib/preact.match.js';
import { createHashHistory } from '../js/lib/history.production.min.js';

import Helpers from './Helpers.js';
import { html } from './Helpers.js';
import QRScanner from './QRScanner.js';
import PeerManager from './PeerManager.js';
import Session from './Session.js';
import { translate as t } from './Translation.js';

import Settings from './views/Settings.js';
import LogoutConfirmation from './views/LogoutConfirmation.js';
import Chat from './views/Chat.js';
import Mesh from './views/Mesh.js';
import Checkout from './views/Checkout.js';

import Point from './views/Point.js';
import Donation from './views/Donation.js';

import Upgrade from './views/Upgrade.js';

import Login from './views/Login.js';
import Profile from './views/Profile.js';
import Group from './views/Group.js';
import Message from './views/Message.js';
import Follows from './views/Follows.js';

import About from './views/About.js';
import Explorer from './views/Explorer.js';
import Contacts from './views/Contacts.js';
import Torrent from './views/Torrent.js';

import VideoCall from './components/VideoCall.js';
import Identicon from './components/Identicon.js';
import MediaPlayer from './components/MediaPlayer.js';
import Footer from './components/Footer.js';
import State from './State.js';
import Icons from './Icons.js';


var settingsIcon = html`<i class="fas fa-cog"></i>`

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = (userAgent.indexOf(' electron/') > -1);
if (!isElectron && ('serviceWorker' in navigator)) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js')
    .catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


var profileSvg = html`<i class="fas fa-user-alt"></i>`
var ERAPAYText = html`
<div class="flex">
 
  <h1 style="font-family: arialBlack; margin-right: 0.3em">ERAPAY</h1>
</div>
`

var home =  html`<div style="display: flex;margin-left: 0px; ">
<div class="smolbar3"></div>
<div class="smolbar3"></div>
<div class="smolbar3"></div>
</div>`;

State.init();
Session.init({autologin: window.location.hash.length > 2});
PeerManager.init();

Helpers.checkColorScheme();

const APPLICATIONBRAND = [ // TODO: move editable shortcuts to localState gun
  {url: '/', text: ERAPAYText, icon: Icons.home , classCss: " hideWhite"},
];


const APPLICATIONS = [ // TODO: move editable shortcuts to localState gun
  {url: '/settings', text: profileSvg, icon: Icons.settings , classCss: " lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-l-xl rounded-t-xl transition duration-200"},
  {url: '/mesh', text: "Dashboard", icon: Icons.settings , classCss: "  lg:inline-block py-2 px-6 bg-yellow-brand hover:bg-black hover:text-white text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200"},

];



class Menu extends Component {
  componentDidMount() {
    State.local.get('unseenTotal').on(unseenTotal => {
      this.setState({unseenTotal});
    });
  }

  menuLinkClicked() {
    State.local.get('toggleMenu').put(false);
    State.local.get('scrollUp').put(true);
  }

  render() {
    const pub = Session.getPubKey();
    return html`
    <section >
      <nav class="relative px-6 py-6">
        <div class="flex items-center">

        ${APPLICATIONBRAND.map(a => {
          if (a.url) {
            return html`
              <${a.native ? 'a' : Link} onClick=${() => this.menuLinkClicked()} activeClassName="active" href=${a.url}>
                <span class="text-3xl font-bold leading-none" >${a.text}</span>
              <//>`;
          } else {
            return html`<br/><br/>`;
          }
        })}
          ${APPLICATIONS.map(a => {
            if (a.url) {
              return html`
                <${a.native ? 'a' : Link} class=${a.classCss} onClick=${() => this.menuLinkClicked()} activeClassName="active" href=${a.url}>
                  <span class="text-sm text-gray-400 hover:text-gray-500" >${a.text}</span>
                <//>`;
            } else {
              return html`<br/><br/>`;
            }
          })}
          </div>
      </nav>
    </section>
 

   
              

    `;
  }
}

class Main extends Component {
  componentDidMount() {
    State.local.get('loggedIn').on(loggedIn => this.setState({loggedIn}));
    State.local.get('toggleMenu').put(false);
    State.local.get('toggleMenu').on(show => this.toggleMenu(show));
    State.electron && State.electron.get('platform').on(platform => this.setState({platform}));
  }

  handleRoute(e) {
    let activeRoute = e.url;
    if (!activeRoute && window.location.hash) {
      return route(window.location.hash.replace('#', '')); // bubblegum fix back navigation
    }
    document.title = 'ERAPAY';
    if (activeRoute && activeRoute.length > 1) { document.title += ' - ' + Helpers.capitalize(activeRoute.replace('/', '')); }
    State.local.get('activeRoute').put(activeRoute);
    QRScanner.cleanupScanner();
  }

  onClickOverlay() {
    if (this.state.showMenu) {
      this.setState({showMenu: false});
    }
  }

  toggleMenu(show) {
    this.setState({showMenu: typeof show === 'undefined' ? !this.state.showMenu : show});
  }

  electronCmd(name) {
    State.electron.get('cmd').put({name, time: new Date().toISOString()});
  }

  render() {
    let content = '';
    const isDesktopNonMac = this.state.platform && this.state.platform !== 'darwin';
    if (this.state.loggedIn || window.location.hash.length <= 2) {
      content = this.state.loggedIn ? html`
        ${isDesktopNonMac ? html`
          <div class="windows-titlebar">
               <img src="img/iris_logotype.png" height=16 width=28 />
               <div class="title-bar-btns">
                    <button class="min-btn" onClick=${() => this.electronCmd('minimize')}>-</button>
                    <button class="max-btn" onClick=${() => this.electronCmd('maximize')}>+</button>
                    <button class="close-btn" onClick=${() => this.electronCmd('close')}>x</button>
               </div>
          </div>
        ` : ''}
        <div class="${isDesktopNonMac ? 'desktop-non-mac' : ''} ${this.state.showMenu ? 'menu-visible-xs' : ''}">
          <${Menu}/>
          <div class="overlay" onClick=${e => this.onClickOverlay(e)}></div>
          <div class="">
            <${Router} history=${createHashHistory()} onChange=${e => this.handleRoute(e)}>

            <${Login} path="/login"/>
            <${Chat} path="/chat/:id?"/>
            <${Message} path="/post/:hash"/>
            <${Torrent} path="/torrent/:id"/>
            <${About} path="/"/>
            <${About} path="/home"/>
            <${Settings} path="/settings"/>
            <${LogoutConfirmation} path="/logout"/>
            <${Profile} path="/profile/:id?" tab="profile"/>
            <${Profile} path="/replies/:id?" tab="replies"/>
            <${Profile} path="/likes/:id?" tab="likes"/>
            <${Profile} path="/media/:id" tab="media"/>
            <${Group} path="/group/:id?"/>

            <${Mesh} path="/mesh/:mesh?"/>

            <${Upgrade} path="/upgrade"/>


            <${Point} path="/point/:point/:mesh"/>
            <${Point} path="/point/new" mesh=Session.getPubKey()/>

            <${Donation} path="/donation/:donation/:mesh"/>
            <${Donation} path="/donation/new" mesh=Session.getPubKey()/>

            <${Checkout} path="/checkout/:point/:mesh"/>
            <${Checkout} path="/checkout/new" mesh=Session.getPubKey()/>

            <${Explorer} path="/explorer/:node"/>
            <${Explorer} path="/explorer"/>
            <${Follows} path="/follows/:id"/>
            <${Follows} followers=${true} path="/followers/:id"/>
            <${Contacts} path="/contacts"/>
            </${Router}>
          </div>
        </div>
        <${Footer}/>
        <${VideoCall}/>
      ` : html`<${Login}/>`;
    }
    return html`
      <div class="container mx-auto px-0" id="main-content">
        ${content}
      </div>
    `;
  }
}

render(html`<${Main}/>`, document.body);

document.body.style = 'opacity:1';

Helpers.showConsoleWarning();
