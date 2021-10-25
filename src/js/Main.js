import { render } from './lib/preact.js';
import { Router } from './lib/preact-router.es.js';
import { Component } from './lib/preact.js';
import { Link } from './lib/preact.match.js';

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
import State from './State.js';
import Icons from './Icons.js';

if (window.location.hash && window.location.hash.indexOf('#/') === 0) { // redirect old urls
  window.location.href = window.location.href.replace('#/', '');
}

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = (userAgent.indexOf(' electron/') > -1);
if (!isElectron && ('serviceWorker' in navigator)) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceworker.js')
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

State.init();
Session.init({autologin: window.location.pathname.length > 2});
PeerManager.init();

Helpers.checkColorScheme();

const APPLICATIONBRAND = [ // TODO: move editable shortcuts to localState gun
  {url: '/', text: ERAPAYText, icon: Icons.home , classCss: " hideWhite"},
];


const APPLICATIONS = [ // TODO: move editable shortcuts to localState gun
  {url: '/mesh', text: "Dashboard", icon: Icons.settings , classCss: "  py-2 pr-6  text-black text-sm  font-bold rounded-l transition duration-200"},
  {url: '/settings', text: profileSvg, icon: Icons.settings , classCss: "  py-2 pr-6 text-sm text-black font-bold rounded-l-xl rounded-t-xl transition duration-200"},

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
    <section class="sticky inset-x-0 top-0 left-0">
      <nav class="relative px-6 py-4 bg-black">
        <div class="flex items-center">

        ${APPLICATIONBRAND.map(a => {
          if (a.url) {
            return html`
              <${a.native ? 'a' : Link} onClick=${() => this.menuLinkClicked()} activeClassName="active" href=${a.url}>
                <span class="text-3xl text-white font-bold leading-none" >${a.text}</span>
              <//>`;
          } else {
            return html`<br/><br/>`;
          }
        })}
          </div>
      </nav>
    </section>
    <section class="sticky inset-x-0 top-14 left-0">
      <nav class="relative px-6 py-2 bg-yellow-brand">
        <div class="flex items-center">
          ${APPLICATIONS.map(a => {
            if (a.url) {
              return html`
                <${a.native ? 'a' : Link} class=${a.classCss} onClick=${() => this.menuLinkClicked()} activeClassName="active" href=${a.url}>
                  <span class="" >${a.text}</span>
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
    if (this.state.loggedIn || window.location.pathname.length <= 2) {
      content = this.state.loggedIn ? html`
        ${isDesktopNonMac ? html`
          <div class="windows-titlebar">
               <img src="/img/iris_logotype.png" height=16 width=28 />
               <div class="title-bar-btns">
                    <button class="min-btn" onClick=${() => this.electronCmd('minimize')}>-</button>
                    <button class="max-btn" onClick=${() => this.electronCmd('maximize')}>+</button>
                    <button class="close-btn" onClick=${() => this.electronCmd('close')}>x</button>
               </div>
          </div>
        ` : ''}
        <section class="main ${isDesktopNonMac ? 'desktop-non-mac' : ''} ${this.state.showMenu ? 'menu-visible-xs' : ''}" style="flex-direction: row;">
          <${Menu}/>
          <div class="overlay" onClick=${e => this.onClickOverlay(e)}></div>
          <div class="view-area">
            <${Router} onChange=${e => this.handleRoute(e)}>

              <${Login} path="/login"/>
              <${Chat} path="/chat/:id?"/>
              <${Message} path="/post/:hash"/>
              <${Torrent} path="/torrent/:id"/>

              <${About} path="/"/>
              <${About} path="/about"/>

              <${Settings} path="/settings"/>
              <${LogoutConfirmation} path="/logout"/>
              <${Profile} path="/profile/:id?" tab="profile"/>
              <${Profile} path="/replies/:id?" tab="replies"/>
              <${Profile} path="/likes/:id?" tab="likes"/>
              <${Profile} path="/media/:id" tab="media"/>
              <${Group} path="/group/:id?"/>

              <${Mesh} path="/mesh/:mesh?"/>
              <${Checkout} path="/checkout/:mesh?"/>
              <${Point} path="/point/:point/:mesh"/>
              <${Point} path="/point/new" mesh=Session.getPubKey()/>

              <${Explorer} path="/explorer/:node"/>
              <${Explorer} path="/explorer"/>
              <${Follows} path="/follows/:id"/>
              <${Follows} followers=${true} path="/followers/:id"/>
              <${Contacts} path="/contacts"/>
            </${Router}>
          </div>
        </section>
        <${MediaPlayer}/>
        <${VideoCall}/>
      ` : html`<${Login}/>`;
    }
    return html`
      <div class="" id="main-content">
        ${content}
      </div>
    `;
  }
}

render(html`<${Main}/>`, document.body);

document.body.style = 'opacity:1';

Helpers.showConsoleWarning();
