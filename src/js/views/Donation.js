import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import {translate as t} from '../Translation.js';
import { route } from '../lib/preact-router.es.js';
import MeshView from './Mesh.js';

class Donation extends MeshView {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();

    this.state = {subs:{}};
    this.subs = {};
  }

  addToCart() {
    const count = (this.cart[this.props.donation] || 0) + 1;
    State.local.get('cart').get(this.props.mesh).get(this.props.donation).put(count);
  }

  typeMethodChanged(e) {
    const val = e.target.firstChild && e.target.firstChild.value;
    val && State.local.get('type').put(val);
  }




  sendEth(){
    //done differently to sendEth point.js. Issues with metamask fireing before gun returned wallet (fix this and then code can then be cleaned).  so promise is made to wait on getTransInfo() to return gun info before deliverInfo() fires
    
    var  amountEth = $("#giveAmount").val()
    getTransInfo()
    deliverInfo()
    // paymentAddress is where funds will be send to
    
    async function deliverInfo() {
        const walletAddy = await getTransInfo();     
    web3.eth.sendTransaction({
      to: walletAddy,
      value: web3.toWei(amountEth, 'ether')
    }, (err, transactionId) => {
        //this promts and err POST transaction which is curious, fix
      if  (err) {
        console.log('Payment failed', err)
        $('#status').html('Payment failed')

        var transactionData = {
          status: "Failed",
          time: new Date().format('m-d-Y h:i:s'),
          name: this.props.donation,
          id: Math.floor(Math.random() * 1000000000),
          type: "Donation",
          price: $("#giveAmount").val()
        };

        State.public.user().get('mesh').get('donations').get(this.props.donation).get('transactions').put(transactionData);
        State.public.user().get('transactionsData').get(transactionData.id).put(transactionData);
      } else {
        console.log('Payment successful', transactionId)
        $('#status').html('Payment successful')

        var transactionData = {
          status: "Successful",
          time: new Date().format('m-d-Y h:i:s'),
          name: this.props.donation,
          id: Math.floor(Math.random() * 1000000000),
          type: "Donation",
          price: $("#giveAmount").val()
        };
        console.log(transactionData.id)

        State.public.user().get('mesh').get('donations').get(this.props.donation).get('transactions').put(transactionData);
        State.public.user().get('transactionsData').get(transactionData.id).put(transactionData);
      }
    })

    }
    
  }

    onClickDelete() {
        if (confirm('Delete point? This cannot be undone.')) {
          State.public.user().get('mesh').get('donations').get(this.props.donation).put(null);
          route('/mesh/');
        }
      }



  newDonation() {
    console.log('new');

    return html`
      <div class="" id="profile">

      <section class="py-3 rounded-xl shadow-2xl">
        <div class="container mx-auto px-4">
            <div class="px-4 py-2 md:py-28 lg:px-20 bg-white">
            <h2 class="mb-8 text-5xl font-bold font-heading">Start collecting donations</h2>
            <p class="mb-16 text-gray-500">Great for creators and fundraising, just pick an ammount you would like to see people give.</p>
            <div class="flex flex-wrap mb-8 pb-4 border-b">
                <div class="mr-10 w-3/4">
                    <h3 class="text-gray-600">Donation Name</h3>
                        <p class="text-blue-300 font-bold font-heading"><h2 contenteditable placeholder="Satoshi's marathon" onInput=${e => this.newDonationName = e.target.innerText} />
                    </p>
                </div>
                
            </div> 
            <div class="flex flex-wrap mb-8 pb-4 border-b">
                <div class="mr-10 w-3/4">
                    <h3 class="text-gray-600">Write a quick thank you message</h3>
                        <p class="text-blue-300 font-bold font-heading"><h2 contenteditable placeholder="Start typing here 🎉 " onInput=${e => this.newDonationMessage = e.target.innerText} />
                    </p>
                </div>
              
            </div>


             
            <button class="text-gray-800  py-2 px-4 rounded inline-flex items-center" onClick=${e => this.addItemClicked(e)}>Add Donation</button>

            </div>
            </div>
        </section>
      </div>

    `;
  }

  onClickDelete() {
    if (confirm('Delete donation? This cannot be undone.')) {
      State.public.user().get('mesh').get('donations').get(this.props.donation).put(null);
      route('/mesh/' + this.props.mesh);
    }
  }

   


  showDonation() {
    const cartTotalItems = Object.values(this.cart).reduce((sum, current) => sum + current, 0);
    const i = this.state.donation;

    var qr = new QRious({
      element: document.getElementById('qr'),
      value: 'https://github.com/neocotic/qrious',
      size: 270
    });



    if (!i) return html``;
      return html`
      <div id="profile" class="py-4">

      

      <section class="py-3 rounded-xl shadow-2xl">
      <div class="container mx-auto px-4">
          <div class="px-4 py-2 md:py-28 lg:px-20 bg-white">
          <h2 class="mb-8 text-5xl font-bold font-heading">Make a donation</h2>
          <p class="mb-16 text-gray-500">Donations amounts are decided by donators, all they need to do is visit this URL. </p>
          <div class="flex flex-wrap mb-8 pb-4 border-b">
              <div class="mr-10 w-3/4">
                  <h3 class="text-gray-600">Donation Name</h3>
                      <p class="text-blue-300 font-bold font-heading">                  <iris-text contenteditable="true" id="getName" placeholder="Product Name" user=${this.props.mesh} path="mesh/donations/${this.props.donation}/name"/>

                  </p>
              </div>
              ${this.isMyProfile ? html`     
              <a onClick=${e => this.onClickDelete(e)} class="inline-flex mt-6 lg:mt-0 w-full lg:w-auto justify-center items-center py-4 px-6 border hover:border-gray-500 rounded-md font-bold font-heading">
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1V0.25C0.585786 0.25 0.25 0.585786 0.25 1L1 1ZM15 19V19.75C15.4142 19.75 15.75 19.4142 15.75 19H15ZM1 19H0.25C0.25 19.4142 0.585786 19.75 1 19.75L1 19ZM10 1L10.5303 0.46967C10.3897 0.329018 10.1989 0.25 10 0.25V1ZM15 6H15.75C15.75 5.80109 15.671 5.61032 15.5303 5.46967L15 6ZM15 18.25H1V19.75H15V18.25ZM1.75 19V1H0.25V19H1.75ZM1 1.75H10V0.25H1V1.75ZM14.25 6V19H15.75V6H14.25ZM9.46967 1.53033L14.4697 6.53033L15.5303 5.46967L10.5303 0.46967L9.46967 1.53033ZM8.25 1V5H9.75V1H8.25ZM11 7.75H15V6.25H11V7.75ZM8.25 5C8.25 6.51878 9.48122 7.75 11 7.75V6.25C10.3096 6.25 9.75 5.69036 9.75 5H8.25Z" fill="black"></path>
                </svg>
                <span class="ml-4">Delete donation</span>
              </a>
            ` : ''}
          </div> 

          <div class="flex flex-wrap mb-8 pb-4 border-b">
                <div class="mr-10 w-3/4">
                    <iris-text contenteditable="true" placeholder="Product Name" user=${this.props.mesh} path="mesh/donations/${this.props.donation}/message"/>
                </div>
            </div>
          <div class="flex flex-wrap mb-8 pb-4 border-b">
            <div class="mr-10 w-3/4">
              <h3 class="text-gray-600">How much would you like to give</h3>
                    <p class="text-blue-300 font-bold font-heading">
                        <input id="giveAmount" placeholder="0.002"/>
                    </p>
                </div>
            </div>    
          <button class="text-gray-800  py-2 px-4 rounded inline-flex items-center" onClick=${e => this.sendEth(e)}>Give Donation</button>

          </div>
          </div>
      </section>

        
      </div>
    `;
  }

  render() {
    return (this.props.mesh && this.props.donation ? this.showDonation() : this.newDonation());
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.donation !== this.props.donation) {
      this.componentDidMount();
    }
  }

  addItemClicked() {



    var rand_int = Math.floor(Math.random() * 1000000000);

    const donation = {
        name: this.newDonationName,
        id: rand_int,
        message: this.newDonationMessage,
        type: "Donation"
    };
    console.log(donation)
    State.public.user().get('mesh').get('donations').get(rand_int).put(donation);
    route(`/mesh/`)
  }

  componentDidMount() {
    var globals = Gun();
  
    var date  = new Date().format('m-d-Y h:i:s')


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
    if (this.props.donation && pub) {
      State.public.user(pub).get('mesh').get('donations').get(this.props.donation).on(donation => this.setState({donation}));
    }

    
  }
}

//needs to be outside class to work? fix?
function getTransInfo() {
    return new Promise(resolve => {

    var  paymentAddress = " "


    
    //Clean
    var getdata = State.public.user().get('profile').get('wallet')

    
    getdata.on(v => {
    paymentAddress =  v
    console.log(paymentAddress)
    resolve(paymentAddress) 
    })
    });
    }


export default Donation;
