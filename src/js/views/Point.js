import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import {translate as t} from '../Translation.js';
import { route } from '../lib/preact-router.es.js';
import MeshView from './Mesh.js';

class Point extends MeshView {
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



    sendEth(){
      // paymentAddress is where funds will be send to
      var  amountEth = " "
      var  paymentAddress = " "


      
      //Clean
      var getEthAmnt = State.public.user().get('mesh').get('points').get(this.props.point)
      var getdata = State.public.user().get('profile').get('wallet')

      
      getdata.on(v => {
        paymentAddress =  v
        console.log(paymentAddress)
        return paymentAddress
      })

      getEthAmnt.on(v => {
        amountEth =  v.price
        console.log(amountEth)
        return amountEth
      })
           
      web3.eth.sendTransaction({
        to: paymentAddress,
        value: web3.toWei(amountEth, 'ether')
      }, (err, transactionId) => {
        if  (err) {
          console.log('Payment failed', err)
          $('#status').html('Payment failed')

          var transactionData = {
            status: "Failed",
            time: new Date().format('m-d-Y h:i:s'),
            name: this.props.point,
            id: Math.floor(Math.random() * 1000000000),
            type: "Donation",
            price: $("#giveAmount").val()
          };

          State.public.user().get('mesh').get('points').get(this.props.point).get('transactions').put(transactionData);
          State.public.user().get('transactionsData').get(transactionData.id).put(transactionData);
        } else {
          console.log('Payment successful', transactionId)
          $('#status').html('Payment successful')

          var transactionData = {
            status: "Successful",
            time: new Date().format('m-d-Y h:i:s'),
            name: this.props.point,
            id: Math.floor(Math.random() * 1000000000),
            type: "Donation",
            price: $("#giveAmount").val()
          };
          console.log(transactionData.id)

          State.public.user().get('mesh').get('points').get(this.props.point).get('transactions').put(transactionData);
          State.public.user().get('transactionsData').get(transactionData.id).put(transactionData);
        }
      })
      
    }

   


  newPoint() {
    console.log('new');
    return html`
      <div class="" id="profile">
        <section class="py-3 rounded-xl shadow-2xl">
          <div class="container mx-auto px-4">
              <div class="px-4 py-2 md:py-28 lg:px-20 bg-white">
              <h2 class="mb-8 text-5xl font-bold font-heading">Create a new Checkout</h2>
              <p class="mb-16 text-gray-500">Donations amounts are decided by donators, all they need to do is visit this URL. </p>
              <div class="flex flex-wrap mb-8 pb-4 border-b">
                  <div class="mr-10 w-3/4">
                      <h3 class="text-gray-600">Product Name</h3>
                      <p class="text-blue-300 font-bold font-heading">
                        <h2 contenteditable placeholder="Product name" onInput=${e => this.newPointName = e.target.innerText} />
                      </p>
                  </div>
              </div> 
              <div class="flex flex-wrap mb-8 pb-4 border-b">
                  <div class="mr-10 w-3/4">
                    <h3 class="text-gray-600">Product Name</h3>
                    <p class="text-blue-300 font-bold font-heading">
                      <input type="number" class="bg-green-50" placeholder="Price" onInput=${e => this.newPointPrice = parseInt(e.target.value)}/>
                    </p>
                  </div>
              </div>   
              <button class="text-gray-800  py-2 px-4 rounded inline-flex items-center" onClick=${e => this.addItemClicked(e)}>Create Checkout</button>

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
      <div id="profile" class="py-4">




        <section class="py-10 ">
          <div class="container mx-auto px-4 bg-white shadow-xl rounded-2xl">
            <div class="px-4 py-3 py-4 lg:px-20 ">
              <h2 class="mb-8 text-5xl font-bold font-heading">Your Order</h2>
              <div class="flex flex-wrap mb-8 pb-4 border-b">
                <div class="mr-20">
                  <h3 class="text-gray-600">Vendor</h3>
                  <p class="text-blue-300 font-bold font-heading"><a href="/mesh/${this.props.mesh}"><iris-text editable="false" path="profile/name" user=${this.props.mesh}/></a></p>
                </div>
                <div class="mr-20">
                  <h3 class="text-gray-600">Date</h3>
                  <p class="text-blue-300 font-bold font-heading">Date</p>
                </div>
                <div class="mr-auto">
                  <h3 class="text-gray-600">Product ID</h3>
                  <p class="text-blue-300 font-bold font-heading">             <iris-text contenteditable="false" placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/id"/></p>
                </div>
                ${this.isMyProfile ? html`     
                  <a onClick=${e => this.onClickDelete(e)} class="inline-flex mt-6 lg:mt-0 w-full lg:w-auto justify-center items-center py-4 px-6 border hover:border-gray-500 rounded-md font-bold font-heading">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1V0.25C0.585786 0.25 0.25 0.585786 0.25 1L1 1ZM15 19V19.75C15.4142 19.75 15.75 19.4142 15.75 19H15ZM1 19H0.25C0.25 19.4142 0.585786 19.75 1 19.75L1 19ZM10 1L10.5303 0.46967C10.3897 0.329018 10.1989 0.25 10 0.25V1ZM15 6H15.75C15.75 5.80109 15.671 5.61032 15.5303 5.46967L15 6ZM15 18.25H1V19.75H15V18.25ZM1.75 19V1H0.25V19H1.75ZM1 1.75H10V0.25H1V1.75ZM14.25 6V19H15.75V6H14.25ZM9.46967 1.53033L14.4697 6.53033L15.5303 5.46967L10.5303 0.46967L9.46967 1.53033ZM8.25 1V5H9.75V1H8.25ZM11 7.75H15V6.25H11V7.75ZM8.25 5C8.25 6.51878 9.48122 7.75 11 7.75V6.25C10.3096 6.25 9.75 5.69036 9.75 5H8.25Z" fill="black"></path>
                    </svg>
                    <span class="ml-4">Delete product</span>
                  </a>
                ` : ''}
              </div>
              <div class="flex flex-wrap -mx-4 mb-8">
                <div class="w-full lg:w-1/6 px-4 mb-8 lg:mb-0">
                  <div class="flex items-center justify-center bg-red-100 h-72 ">
                  <iris-img class="rounded" style="  padding: 0px;" user=${this.props.mesh} path="mesh/points/${this.props.point}/photo"/>
                  </div>
                </div>
                <div class="w-full lg:w-5/6 px-4">
                  <div class="flex mb-16">
                    <div class="mr-auto">
                      <h3 class="text-xl font-bold font-heading"> <iris-text contenteditable="true" placeholder="Product Name" user=${this.props.mesh} path="mesh/points/${this.props.point}/name"/></h3>
                      <p class="text-gray-500"> <iris-text contenteditable="true" placeholder="Desciprtion" user=${this.props.mesh} path="mesh/points/${this.props.point}/description"/></p>
                    </div>
                    <span class="text-2xl font-bold font-heading text-blue-300"> <iris-text contenteditable="true" placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/price"/></span>
                  </div>
                  <div class="flex flex-wrap -mx-4">
                    <div class="w-full lg:w-auto px-4 md:px-10 mb-6 lg:mb-0">
                      <h4 class="mb-6 font-bold font-heading">Delivery Address</h4>
                      <p class="text-gray-500" id="deliveryName"></p>
                      <p class="text-gray-500" id="deliveryAddress"></p>
                      <p class="text-gray-500" id="deliveryAppart"></p>
                      <p class="text-gray-500" id="deliveryCity"></p>
                      <p class="text-gray-500" id="deliveryRegion"></p>
                      <p class="text-gray-500" id="deliveryZip"></p>


                      
                    </div>
                    <div class="w-full lg:w-auto px-4 md:px-10 mb-6 lg:mb-0">
                      <h4 class="mb-6 font-bold font-heading">Shipping Details</h4>
                      <p class="text-gray-500" id="deliveryEmail"></p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="relative py-20 overflow-x-hidden  shadow-xl border border-gray rounded-2xl">
          <div class="relative container mx-auto px-8">
            <span class="flex"><span><div class="h-20 w-20 -ml-3"><img src="./assets/erapaypng.png"/></div></span> <span><h2 class="mb-14 text-7xl font-bold font-heading" style="font-family: arialBlack">ERAPAY</h2></span></span>

            <h2 class="mb-14 text-5xl font-bold font-heading">Checkout</h2>
            <div class="flex flex-wrap -mx-4">
              <div class="w-full lg:w-1/2 px-4">
                <form action="">
                  <div class="flex mb-10 items-center">
                  <span class="inline-flex mr-8 items-center justify-center w-12 h-12 rounded-xl bg-black shadow-xl text-white">1</span>
                    <h3 class="text-2xl font-bold font-heading">Delivery</h3>
                  </div>
                  <div class="mb-12">
                    <label class="font-bold font-heading text-gray-600" for="">E-mail address</label>
                    <input class="block w-full mt-4 py-4 px-4 bg-white border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" id="inputDeliveryEmail" type="email"/>
                  </div>
                  <div class="flex mb-10 items-center">
                    <span class="inline-flex mr-8 items-center justify-center w-12 h-12 rounded-xl bg-black shadow-xl text-white">2</span>
                    <h3 class="text-2xl font-bold font-heading">Shipping details</h3>
                  </div>
                  <div class="mb-12">
                    <div class="flex flex-wrap -mx-4 mb-10">
                      <div class="w-full md:w-1/2 px-4 mb-10 md:mb-0">
                        <label class="font-bold font-heading text-gray-600" for="">First name</label>
                        <input id="inputDeliveryNameF" class="block w-full mt-4 py-4 px-4 bg-white border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text"/>
                      </div>
                      <div class="w-full md:w-1/2 px-4">
                        <label class="font-bold font-heading text-gray-600" for="">Last name</label>
                        <input id="inputDeliveryNameL" class="block w-full mt-4 py-4 px-4 bg-white border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text"/>
                      </div>
                    </div>
                    <div class="mb-10">
                      <label class="font-bold font-heading text-gray-600" for="">Address</label>
                      <input id="inputDeliveryAddress" class="block w-full mt-4 py-4 px-4 bg-white border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text"/>
                    </div>
                    <div class="mb-10">
                      <label class="font-bold font-heading text-gray-600" for="">Appartament</label>
                      <input id="inputDeliveryAppart" class="block w-full mt-4 py-4 px-4 bg-white border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text"/>
                    </div>
                    <div class="mb-10">
                      <label class="font-bold font-heading text-gray-600" for="">Country/Region</label>
                      <input id="inputDeliveryRegion" class="block w-full mt-4 py-4 px-4 bg-white border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text"/>
                    </div>
                    <div class="flex flex-wrap -mx-4">
                      <div class="w-full md:w-2/3 px-4 mb-10 md:mb-0">
                        <label class="font-bold font-heading text-gray-600" for="">City</label>
                        <input id="inputDeliveryCity" class="block w-full mt-4 py-4 px-4 bg-white border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text"/>
                      </div>
                      <div class="w-full md:w-1/3 px-4">
                        <label class="font-bold font-heading text-gray-600" for="">Zip Code</label>
                        <input id="inputDeliveryZip" class="block w-full mt-4 py-4 px-4 bg-white border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text"/>
                      </div>
                    </div>
                  </div>
                  <div class="flex mb-10 items-center">
                  <span class="inline-flex mr-8 items-center justify-center w-12 h-12 rounded-xl bg-black shadow-xl text-white">3</span>
                  <h3 class="text-2xl font-bold font-heading">Shipping methods</h3>
                  </div>
                  <div class="mb-12">
                    <div class="mb-2 py-3 px-8 bg-white rounded-full">
                      <div class="flex flex-wrap items-center">
                        <label class="inline-flex mb-1 pr-4 py-2 items-center sm:border-r" for="">
                          <input type="radio" name="deliveryType" value="" checked=""/>
                          <span class="ml-4 text-sm font-bold font-heading">Standard delivery</span>
                        </label>
                        <p class="order-last w-full sm:w-auto pl-4 text-sm text-gray-500">3-4 business days</p>
                        <span class="sm:order-last ml-auto text-blue-300 font-bold font-heading">$3.00</span>
                      </div>
                    </div>
                    <div class="py-3 px-8 bg-white rounded-full">
                      <div class="flex flex-wrap items-center">
                        <label class="inline-flex mb-1 pr-4 py-2 items-center sm:border-r" for="">
                          <input type="radio" name="deliveryType" value=""/>
                          <span class="ml-4 text-sm font-bold font-heading">Express</span>
                        </label>
                        <p class="order-last w-full sm:w-auto pl-4 text-sm text-gray-500">Next day</p>
                        <span class="sm:order-last ml-auto text-blue-300 font-bold font-heading">$20.00</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex mb-10 items-center">
                  <span class="inline-flex mr-8 items-center justify-center w-12 h-12 rounded-xl bg-black shadow-xl text-white">4</span>
                  <h3 class="text-2xl font-bold font-heading">Payment</h3>
             
                  </div>
          
                  <div class="mb-10">
                    <button  onClick=${(e) => {this.confirmDetails(e)}}   id="confirmDiv" class="w-full mt-4 py-4 px-4 bg-white border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md">
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="lg:absolute lg:top-0 lg:right-0 w-full lg:w-2/5 mb-12 lg:mb-0">
            <div class="py-16 px-6 md:px-14 shadow-2xl border border-gray rounded-2xl">
              <div class="flex mb-12 items-center">
                <h2 class="text-4xl font-bold font-heading">Order summary</h2>
              </div>
              <div class="mb-12 md:pb-16 border-b">
                <div class="flex -mx-4 mb-8 flex-wrap items-center">

                  <div class="w-full md:w-4/4 px-4">
                    <div class="flex justify-between">
                      <div class="pr-2">
                        <h3 class="mb-2 text-xl font-bold font-heading">                       <iris-text contenteditable="false" placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/name"/>
                        </h3>
                        <p class="mb-8 text-gray-500"> <iris-text contenteditable="false" placeholder="Description" user=${this.props.mesh} path="mesh/points/${this.props.point}/description"/></p>
                      </div>
                      <span class="text-lg text-blue-300 font-bold font-heading">                    <iris-text id="giveAmount" contenteditable="false" placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/price"/>
                      </span>
                    </div>

                  </div>
                </div>
              </div>
              <div class="mb-12">
                <div class="mb-10">
                  <div class="py-3 px-10 bg-blue-50 rounded-xl">
                    <div class="flex justify-between">
                      <span class="font-medium">Subtotal</span>
                      <span class="font-bold font-heading"><iris-text contenteditable="true" placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/price"/></span>
                    </div>
                  </div>
                  <div class="py-3 px-10  rounded-xl">
                    <div class="flex justify-between">
                      <span class="font-medium">Tax</span>
                      <span class="font-bold font-heading">0</span>
                    </div>
                  </div>
                  <div class="py-3 px-10 bg-blue-50 rounded-xl">
                    <div class="flex justify-between">
                      <span class="text-base md:text-xl font-bold font-heading">Total</span>
                      <span class="font-bold font-heading"><iris-text contenteditable="true" placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/price"/></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-6 md:mb-10">
                <span class="inline-block mb-4 font-medium">Apply discount code:</span>
                <div class="flex mb-12 flex-wrap lg:flex-nowrap items-center">
                  <input class="mb-4 md:mb-0 mr-6 w-full px-8 py-4 placeholder-gray-800 font-bold font-heading border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text" placeholder="SUMMER30X"/>
                  <a class="inline-block mb-4 md:mb-0 px-8 py-4 text-white font-bold font-heading uppercase bg-gray-800 hover:bg-gray-700 rounded-md" href="#">Apply</a>
                </div>
              </div>
              <button onClick=${(e) => {this.sendEth(e)}} class="w-full bg-green-500 text-white pay-button rounded-md   text-2xl  py-2 px-4  font-heading">Pay</button>
              <div id="status"></div>
            </div>
          </div>
        </section>
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
      id: rand_int,
      type: "Donation"
    };
    console.log(point)
    State.public.user().get('mesh').get('points').get(rand_int).put(point);
      

    route(`/mesh/`)
  }

  componentDidMount() {
    var globals = Gun();
    var masterPoint = this.props.point
    

    State.local.get('type').on(type => this.setState({type}));

    window.addEventListener('load', async () => {
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
          await ethereum.enable();
          initPayButton()
        } catch (err) {
          $('#status').html('User denied account access', err)
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider)
        initPayButton()
      } else {
        $('#status').html('No Metamask (or other Web3 Provider) installed')
      }
    })

      


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

export default Point;
