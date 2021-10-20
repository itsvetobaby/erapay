import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import {translate as t} from '../Translation.js';
import { route } from '../lib/preact-router.es.js';
import MeshView from './Mesh.js';

class Checkout extends MeshView {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();

    this.state = {subs:{}};
    this.subs = {};
  }

  addToCart() {
    const count = (this.cart[this.props.point] || 0) + 1;
    State.local.get('cart').get(this.props.mesh).get(this.props.point).put(count);
  }

  typeMethodChanged(e) {
    const val = e.target.firstChild && e.target.firstChild.value;
    val && State.local.get('type').put(val);
  }


  newPoint() {
    console.log('new');
    return html`
      <div class="" id="profile">
        <section class="py-8">
          <div class="container px-4 mx-auto ">
            <div class="flex flex-wrap -m-4">
              <div class="w-full lg:w-3/3 p-4">
                <div class="p-4 bg-yellow-69 shadow-xl rounded">
                  <div class="relative h-40 w-full mb-4">
                    <span class="absolute top-0 right-0 py-1 px-2 mt-2 mr-2 bg-indigo-500 rounded text-xs text-white">14 Tasks</span>
                  </div>
                  <div class="flex mb-6 justify-between items-center">
                    <div>
                      <h3 class="text-sm font-medium">Shuffle - an online editor</h3>
                      <span class="text-xs text-gray-500">Production company</span>
                    </div>
                    <button class="ml-auto p-2 bg-indigo-50 rounded">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99984 9.33335C8.73622 9.33335 9.33317 8.7364 9.33317 8.00002C9.33317 7.26364 8.73622 6.66669 7.99984 6.66669C7.26346 6.66669 6.6665 7.26364 6.6665 8.00002C6.6665 8.7364 7.26346 9.33335 7.99984 9.33335Z" fill="#382CDD"></path>
                        <path d="M3.33333 9.33335C4.06971 9.33335 4.66667 8.7364 4.66667 8.00002C4.66667 7.26364 4.06971 6.66669 3.33333 6.66669C2.59695 6.66669 2 7.26364 2 8.00002C2 8.7364 2.59695 9.33335 3.33333 9.33335Z" fill="#382CDD"></path>
                        <path d="M12.6668 9.33335C13.4032 9.33335 14.0002 8.7364 14.0002 8.00002C14.0002 7.26364 13.4032 6.66669 12.6668 6.66669C11.9304 6.66669 11.3335 7.26364 11.3335 8.00002C11.3335 8.7364 11.9304 9.33335 12.6668 9.33335Z" fill="#382CDD"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="flex mb-2 justify-between items-center">
                    <h4 class="text-xs font-medium">Start</h4>
                    <span class="py-1 px-2 rounded-md px-10 bg-green-50 text-xl text-green-500">
                      <h2 contenteditable placeholder="Product name" onInput=${e => this.newPointName = e.target.innerText} />
                    </span>
                  </div>
                  <div class="flex mb-2 justify-between items-center">
                    <h4 class="text-xs font-medium">Final Date</h4>
                    <span class="py-1 px-2 rounded-md px-10 bg-green-50 text-xl text-red-500">
                      <input type="number" class="bg-green-50" placeholder="Price" onInput=${e => this.newPointPrice = parseInt(e.target.value)}/>
                    </span>
                  </div>
                  <div class="flex mb-5 justify-between items-center">
                    <h4 class="text-xs font-medium">Last Change</h4>
                    <span class="text-xs text-indigo-500 font-medium">6 days ago</span>
                  </div>
                  <div class="flex items-ceenter justify-between border-t border-gray-50 pt-4">
                    <div class="flex">
                      <div class="flex items-center justify-center w-8 h-8 -ml-2 rounded-full bg-indigo-50 text-xs text-indigo-500">+3</div>
                    </div>
                    <a class="py-2 px-3 bg-indigo-500 hover:bg-indigo-600 rounded-md text-xs text-white transition duration-200" href="#">
                      <button class="text-gray-800  py-2 px-4 rounded inline-flex items-center" onClick=${e => this.addItemClicked(e)}>Add Product</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    `;
  }

  onClickDelete() {
    if (confirm('Delete point? This cannot be undone.')) {
      State.public.user().get('mesh').get('points').get(this.props.point).put(null);
      route('/mesh/' + this.props.mesh);
    }
  }

  showPoint() {
    const cartTotalItems = Object.values(this.cart).reduce((sum, current) => sum + current, 0);
    const i = this.state.point;

    var qr = new QRious({
      element: document.getElementById('qr'),
      value: 'https://github.com/neocotic/qrious',
      size: 270
    });





    if (!i) return html``;
      return html`
      <div id="profile">
        ${this.state.point ? html`
            <div class="flex flex-col">
              <div class="px-4 py-5 sm:px-6">
                <h1 class="text-lg leading-9 font-medium text-gray-900">
                  Blueprint
                </h1>
                <h1 class=" float-right text-5xl font-black leading-9 font-medium text-black">
                  <iris-text contenteditable="true"  user=${this.props.mesh} path="mesh/points/${this.props.point}/name"/>
                </h1>
                <p class="mt-1 text-sm text-gray-500">
                  The plans for fabrication of this item. Available data will be displaiedd, confidencial data will not be shown.
                </p>
              </div>
            </div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"><a href="/mesh/${this.props.mesh}"><iris-text editable="false" path="profile/name" user=${this.props.mesh}/></a></button>

            


          ${cartTotalItems ? html`

              <button class="buttonS -regular center mx-3" onClick=${() => route('/checkout/' + this.props.mesh)}>Shopping cart (${cartTotalItems})</button>

          ` : ''}

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick=${() => this.addToCart()}>
            ${t('add_to_cart')}
            ${this.cart[this.props.point] ? ` (${this.cart[this.props.point]})` : ''}
          </button>
          ${this.isMyProfile ? html`
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick=${e => this.onClickDelete(e)}>Delete item</button>
            ` : ''}
        `: ''}

        <br/>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick=${() => route('/checkout/' + this.props.mesh)}>
          go to checkout
        </button>
        
        <input placeholder="Sub point ID" id="pointID" onInput=${e => this.newSubID = e.target.value}/>
        <button onClick=${() => {
    

          var globals = Gun()

          var makeID  = this.newSubID
          var masterPoint = this.props.point



          var compositeSub = {
            makeID: this.newSubID
          }

          var getFromGlobal = globals.get(masterPoint).get(this.newSubID)
          getFromGlobal.map().on(v => {console.log(v)})



          // globals.get(masterPoint).get("subs").set(compositeSub)        
          // var getPls = globals.get(masterPoint).get("subs")

          // getPls.map().on(v => {console.log(v)})

          console.log("done")
        }}>Add item</button>
          
        ${Object.keys(this.state.subs).map(k => {
          const i = this.state.subs[k];
          return html`

                  <button onClick=${() => { 
                    var globals = Gun();
                    var masterPoint = this.props.point

                    var getName = i.makeID;
                    console.log(getName)
                    globals.get(masterPoint).get("subs").get(getName).put(null);
                    route('/mesh/');
                  }}> Delete</button>
        
          `
        })}


        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="border-t border-gray-200">
                <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium">
                      Blueprint Info
                  </dt>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Maker Name
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <button class="btn btn-blue"><a href="/mesh/${this.props.mesh}"><iris-text editable="false" path="profile/name" user=${this.props.mesh}/></a></button>
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Blueprint Name
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <iris-text contenteditable="true"  user=${this.props.mesh} path="mesh/points/${this.props.point}/name"/>
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      ID
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <iris-text contenteditable="false" placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/pointID"/>
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Issue
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><a href="/mesh/${this.props.mesh}"> <iris-text id="getPrice" placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/type"/></a></button>
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Price
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <iris-text placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/price"/>
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Description
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <iris-text user=${this.props.mesh} path="mesh/points/${this.props.point}/description"/>
                  </dd>
                </div>
            </div>
        </div>
        <br/><br/>
        <div class="bg-white  overflow-hidden sm:rounded-lg">
          <div class="">
            <canvas style="    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
            padding: 0.2em; border-radius: 10px;
            margin: 1em auto;" id="qr"></canvas>
          </div>
        </div>
        <br/><br/>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
            <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium">
                Resources
              </dt>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                  Photo
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <iris-img class="" style="  padding: 0px;" user=${this.props.mesh} path="mesh/points/${this.props.point}/photo"/>
              </dd>
            </div>
          </div>
        </div>
        <br/><br/>

      </div>
    `;
  }

  render() {
    return (this.props.mesh && this.props.point ? this.showPoint() : this.newPoint());
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.point !== this.props.point) {
      this.componentDidMount();
    }
  }

  addItemClicked() {



    var rand_int = Math.floor(Math.random() * 1000000000);



    const point = {
      name: this.newPointName,

      price: this.newPointPrice,
      id: rand_int
    };
    console.log(point)
    State.public.user().get('mesh').get('points').get(rand_int).put(point);
      

    route(`/mesh/`)
  }

  componentDidMount() {
    var globals = Gun();
    var masterPoint = this.props.point
    

    State.local.get('type').on(type => this.setState({type}));



    MeshView.prototype.componentDidMount.call(this);
    const pub = this.props.mesh;
    this.eventListeners.forEach(e => e.off());
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: ''});
    this.isMyProfile = Session.getPubKey() === pub;
    if (this.props.point && pub) {
      State.public.user(pub).get('mesh').get('points').get(this.props.point).on(point => this.setState({point}));
    }

    if (pub) {
      var getPls = globals.get(masterPoint).get("subs")

      getPls.map().on((g, up) => {
        if (g) {
          const a = {};
          a[up] = g;
          Object.assign(this.subs, a);
          this.updateTotalPrice();
        } else {
          delete this.subs[up];
        }
        this.setState({subs: this.subs});
      });
    }
  }
}

export default Checkout;
