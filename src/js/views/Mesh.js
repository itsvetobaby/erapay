import { html } from '../Helpers.js';
import {translate as t} from '../Translation.js';
import State from '../State.js';
import Session from '../Session.js';
import Helpers from '../Helpers.js';

import ProfilePhotoPicker from '../components/ProfilePhotoPicker.js';
import { route } from '../lib/preact-router.es.js';
import SafeImg from '../components/SafeImg.js';
import Filters from '../components/Filters.js';
import CopyButton from '../components/CopyButton.js';
import FollowButton from '../components/FollowButton.js';
import Identicon from '../components/Identicon.js';
import View from './View.js';

class Mesh extends View {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
    this.cart = {};
    this.carts = {};
    this.state = {items:{}, filtered:{}, transactions:{}, donate:{}};
    this.items = {};
    this.donate = {};

    this.transactions = {};

    this.filtered = {};
    this.id = 'profile';
    this.class = 'public-messages-view';
  }

  addToCart(k, user, e) {
    e.stopPropagation();
    const count = (this.cart[k + user] || 0) + 1;
    State.local.get('cart').get(user).get(k).put(count);
  }

  checkTransaction(){
    var checktrans = State.public.user().get('transactionsData')
    checktrans.map(v => console.log(v))
    console.log("ee")
  }

  renderUserMesh(user) {
    const chat = Session.channels[user];
    const uuid = chat && chat.uuid;
    const followable = !(this.isMyProfile || user.length < 40);
    let profilePhoto;
    if (this.isMyProfile) {
      profilePhoto = html`<${ProfilePhotoPicker} currentPhoto=${this.state.photo} placeholder=${user} callback=${src => this.onProfilePhotoSet(src)}/>`;
    } else {
      if (this.state.photo) {
        profilePhoto = html`<${SafeImg} class="profile-photo" src=${this.state.photo}/>`
      } else {
        profilePhoto = html`<${Identicon} str=${user} width=250/>`
      }
    }
    return html`
      <div class="content">
        ${this.renderItems()}
      </div>
      <section class="py-8">
  
    `;
  }


  getNotification() {
    const SUGGESTED_FOLLOW = 'hyECQHwSo7fgr2MVfPyakvayPeixxsaAWVtZ-vbaiSc.TXIp8MnCtrnW6n2MrYquWPcc-DTmZzMBmc2yaGv9gIU';
    if (this.state.noFollows) {
      return html`
          <div class="centered-container">
            <div class="msg">
                <div class="msg-content">
                    <p>${t('follow_someone_info')}</p>
                    <div class="profile-link-container">
                        <a href="/profile/${SUGGESTED_FOLLOW}" class="profile-link">
                            <${Identicon} str=${SUGGESTED_FOLLOW} width=40/>
                            <iris-text path="profile/name" user=${SUGGESTED_FOLLOW} placeholder="Suggested follow"/>
                        </a>
                        <${FollowButton} id=${SUGGESTED_FOLLOW}/>
                    </div>
                    <p>${t('alternatively')} <a
                            href="/profile/${Session.getPubKey()}">${t('give_your_profile_link_to_someone')}</a>.</p>
                </div>
            </div>
          </div>
      `
    }
    return '';
  }


  reUpClique(){
    var URL= $("#getURL").val()
    var name =     document.getElementById("getName").innerText

    console.log(name)

  }

  

  renderItems() {
    const cartTotalItems = Object.keys(this.cart).reduce((sum, k) => sum + this.cart[k], 0);
    const keys = Object.keys(this.state.items);
    const keysD = Object.keys(this.state.donate);

    var transactionsGun = Gun(['https://gun-manhattan.herokuapp.com/gun', ''])
    const pub = Session.getPubKey();

    var totalNum = []
    var failedNum = []
    transactionsGun.get(pub).get("transactions").map(v => { 
      totalNum.push(1)
      if(v.status == "Failed"){
        failedNum.push(1)
      } else{

      }
    
    })


  
    var failedNumTotal = (failedNum.reduce((r,c) => r + parseFloat(c), 0))
    var totalNumTotal = (totalNum.reduce((r,c) => r + parseFloat(c), 0))

    var totalFailedPercent = (failedNumTotal/(totalNumTotal/100))



    
    $("#totalCarts").text(totalNumTotal)

    $("#failedRate").text(totalFailedPercent + "%" )
    var URL= $("#getURL").val()
    var name = $("#getName").val()
    return html`



    <div class="flex flex-col">
      <br/><br/>
      <div class="px-4 py-5 sm:px-6 mx-1">
          <h1 class="text-3xl font-black leading-9 font-medium text-black">
            <span>Welcome </span><iris-text id="" editable="true" spellcheck="false"  path="profile/name" placeholder="Satoshi" user=${Session.getPubKey()}/>
          </h1>  
          <h1 class="text-3xl font-black leading-9 font-medium text-black">
            <span>Your Walet: </span><iris-text id="" editable="true" spellcheck="false"  path="profile/wallet" placeholder="0x..." user=${Session.getPubKey()}/>
          </h1>                  
  
 
      </div>

      <br/> <br/>

      
      <section class="py-6">
        <div class="container px-4 mx-auto ">
          <div class="flex flex-wrap -m-4 my-10">
            <div class="w-full md:w-1/2 lg:w-1/4 p-4 border border-gray rounded-xl mr-5" onClick=${() => route(`/donation/new`)}>
              <div class="p-6 rounded bg-white">
                <div class="flex mb-2">
                  <h3 class="text-lg text-gray-600" style=""></h3>
                  <span class="inline-block ml-auto px-8 py-1 text-xs text-black bg-green-400  rounded-full">create inflow</span>
                </div>
                <h2 class="mb-2 text-3xl font-bold">Donation</h2>
              </div>
              <div class="px-6 rounded bg-white my-2 flex">
                <h3 class="text-lg text-gray-600" style="">Start collecting donations from fans. Pick an ammount you think they would be happy to give. </h3>
                </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 p-4 border border-gray rounded-xl mr-5" onClick=${() => route(`/point/new`)}>
              <div class="p-6 rounded bg-white">
                <div class="flex mb-2">
                  <h3 class="text-lg text-gray-600" style=""></h3>
                  <span class="inline-block ml-auto px-8 py-1 text-xs text-black bg-green-400  rounded-full">create inflow</span>
                </div>
                <h2 class="mb-2 text-3xl font-bold" onClick=${() => route(`/point/new`)}>Checkouts</h2>
              </div>
              <div class="px-6 rounded bg-white my-2 flex">
                <h3 class="text-lg text-gray-600" style="">Delivery address', confirmation, payment, product deatils, all in one place</h3>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      
      
        <section class="py-6">
          <h1 class="text-3xl font-bold leading-9 font-medium text-black">
            Checkouts
          </h1>         
          <div class="flex overflow-x-auto space-x-8 py-12">
            <div class="pb-8  border border-gray-200 shadow rounded-xl flex-shrink-0 w-96 p-1">
              <div class="p-6 rounded bg-white">
                <div class="flex mb-2">
                  <h3 class="text-lg text-gray-600" style="font-family: arialBlack;">ERAPAY</h3>
                  <span class="inline-block ml-auto px-6 py-1 text-md font-bold text-brand bg-yellow-brand rounded-full">Checkout</span>
                </div>
                <h2 class="mb-2 text-3xl font-bold" onClick=${() => route(`/point/new`)}>NEW</h2>
              </div>
              <div class="p-6 rounded bg-white border border-gray my-2 flex">
                <div class="text-xs text-gray-500 w-4/12 ">
            
                    <span>Payees</span>
                </div>
                <div class="text-xs text-blue-500 w-7/12 ">
            
                    <h2>Antony</h2>
                    <h2>Manav</h2>
                </div>
                <div class="text-xs text-blue-500 w-1/12 ">
            
                    <h2>></h2>
              
                </div>
              </div>
              <div class="p-6 rounded  bg-white border border-gray my-2 flex">
                <div class="text-xs text-gray-500 w-4/12 ">
            
                    <span>Method</span>
                </div>
                <div class="text-xs text-blue-500 w-7/12 ">
            
                    <h2>Ethereum</h2>
                </div>
                <div class="text-xs text-blue-500 w-1/12 ">
            
                    <h2>></h2>
              
                </div>
              </div>
              <div class="p-6 rounded bg-white border border-blue-300 my-2 flex">
                <div class="text-xs text-gray-500 w-4/12 ">
            
                    <h2>Total</h2>
                </div>
                <div class="text-xs text-blue-500 w-8/12 relative flex justify-between items-center">
            
                    <div>Ethereum</div>
                    <div  class="mx-auto">2.000</div>

                </div>
      
              </div>
            </div>

            ${!keys.length ? html`<p>Click the green plus to get started</p>`:''}
              ${keys.map(k => {
              const i = this.state.items[k];
              return html`
              
              <div class="pb-8  border border-gray-200 shadow rounded-xl flex-shrink-0 w-96 p-1">
                <div class="p-6 rounded bg-white">
                  <div class="flex mb-2">
                    <div class="text-lg text-gray-600" style="font-family: arialBlack;"><img class="w-8 h-8" src="./assets/fa/svgs/solid/shopping-cart.svg"/></div>
                    <span class="inline-block ml-auto px-6 py-1 text-md font-bold text-brand bg-yellow-brand rounded-full">Checkout</span>
                  </div>
                  <h2 class="mb-2 text-3xl font-bold"  onClick=${() => route(`/point/${k}/${i.from}`)} >${i.name}</h2>
                </div>
                  <div class="p-6 rounded bg-white border border-gray my-2 flex">
                      <div class="text-xs text-gray-500 w-4/12 ">
                  
                          <span>ID</span>
                      </div>
                      <div class="text-xs text-blue-500 w-8/12 ">
                  
                          <h2>${i.id}</h2>
                          <h2>Manav</h2>
                      </div>
   
                  </div>
                  <div class="p-6 rounded  bg-white border border-gray my-2 flex">
                      <div class="text-xs text-gray-500 w-4/12 ">
                  
                          <span>Method</span>
                      </div>
                      <div class="text-xs text-blue-500 w-8/12 ">
                  
                          <h2>Ethereum</h2>
                      </div>
    
                  </div>
                  <div class="p-6 rounded bg-white border border-blue-300 my-2 flex">
                      <div class="text-xs text-gray-500 w-4/12 ">
                  
                          <h2>Total</h2>
                      </div>
                      <div class="text-xs text-blue-500 w-8/12 relative flex justify-between items-center">
                
                        <div>Ethereum</div>
                        <div  class="mx-auto">2.000</div>
      
                      </div>
 
                  </div>
              </div>
              `
              }
            )}
          </div>
        </section>

      <section class="py-6">
        <h1 class="text-3xl font-bold leading-9 font-medium text-black">
          Donations
        </h1>         
        <div class="flex overflow-x-auto space-x-8 py-12">
          <div class="pb-8  border border-gray-200 shadow rounded-xl flex-shrink-0 w-96 p-1">
            <div class="p-6 rounded bg-white">
              <div class="flex mb-2">
                <h3 class="text-lg text-gray-600" style="font-family: arialBlack;">ERAPAY</h3>
                <span class="inline-block ml-auto px-6 py-1 text-md font-bold text-brand bg-yellow-brand rounded-full">Checkout</span>
              </div>
              <h2 class="mb-2 text-3xl font-bold" onClick=${() => route(`/donation/new`)}>NEW</h2>
            </div>
            <div class="p-6 rounded bg-white border border-gray my-2 flex">
              <div class="text-xs text-gray-500 w-4/12 ">
          
                  <span>Payees</span>
              </div>
              <div class="text-xs text-blue-500 w-7/12 ">
          
                  <h2>Antony</h2>
                  <h2>Manav</h2>
              </div>
              <div class="text-xs text-blue-500 w-1/12 ">
          
                  <h2>></h2>
            
              </div>
            </div>
            <div class="p-6 rounded  bg-white border border-gray my-2 flex">
              <div class="text-xs text-gray-500 w-4/12 ">
          
                  <span>Method</span>
              </div>
              <div class="text-xs text-blue-500 w-7/12 ">
          
                  <h2>Ethereum</h2>
              </div>
              <div class="text-xs text-blue-500 w-1/12 ">
          
                  <h2>></h2>
            
              </div>
            </div>
            <div class="p-6 rounded bg-white border border-blue-300 my-2 flex">
              <div class="text-xs text-gray-500 w-4/12 ">
          
                  <h2>Total</h2>
              </div>
              <div class="text-xs text-blue-500 w-8/12 relative flex justify-between items-center">
          
                  <div>Ethereum</div>
                  <div  class="mx-auto">2.000</div>

              </div>
    
            </div>
          </div>

          ${!keysD.length ? html`<p>Click the green plus to get started</p>`:''}
            ${keysD.map(k => {
            const i = this.state.donate[k];
            return html`
            
            <div class="pb-8  border border-gray-200 shadow rounded-xl flex-shrink-0 w-96 p-1">
              <div class="p-6 rounded bg-white">
                <div class="flex mb-2">
                  <div class="text-lg text-gray-600" style="font-family: arialBlack;"><img class="w-8 h-8" src="./assets/fa/svgs/solid/heart.svg"/></div>
                  <span class="inline-block ml-auto px-6 py-1 text-md font-bold text-brand bg-yellow-brand rounded-full">Checkout</span>
                </div>
                <h2 class="mb-2 text-3xl font-bold"  onClick=${() => route(`/donation/${k}/${i.from}`)} >${i.name}</h2>
              </div>
                <div class="p-6 rounded bg-white border border-gray my-2 flex">
                    <div class="text-xs text-gray-500 w-4/12 ">
                
                        <span>ID</span>
                    </div>
                    <div class="text-xs text-blue-500 w-8/12 ">
                
                        <h2>${i.id}</h2>
                        <h2>Manav</h2>
                    </div>
 
                </div>
                <div class="p-6 rounded  bg-white border border-gray my-2 flex">
                    <div class="text-xs text-gray-500 w-4/12 ">
                
                        <span>Method</span>
                    </div>
                    <div class="text-xs text-blue-500 w-8/12 ">
                
                        <h2>Ethereum</h2>
                    </div>
  
                </div>
                <div class="p-6 rounded bg-white border border-blue-300 my-2 flex">
                    <div class="text-xs text-gray-500 w-4/12 ">
                
                        <h2>Total</h2>
                    </div>
                    <div class="text-xs text-blue-500 w-8/12 relative flex justify-between items-center">
              
                      <div>Ethereum</div>
                      <div  class="mx-auto">2.000</div>
    
                    </div>

                </div>
            </div>
            `
            }
          )}
        </div>
      </section>

      <br/><br/>
      <h1 class="text-3xl font-black leading-9 font-medium text-black" id="checkouts">Reoccuring payments</h1>
      <br/>

      

      <br/><br/>
      <h1 class="text-3xl font-black leading-9 font-medium text-black" id="checkouts">Transaction history</h1>
      <br/>

      




      

      
      <br/><br/>


      <section class="py-8">
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div class="w-full lg:w-1/2 p-4">
            <div class="p-6 mb-8 bg-yellow-69  shadow-2xl rounded-2xl ">
              <div class="flex mb-3 items-center justify-between">
                <h3 class="text-gray-500">Logins are done with keys. To Access your dashboard on another browser or device you will need your key.</h3>
                <button class="focus:outline-none">
                <button   onClick=${(e) => this.checkTransaction(e)}>check</button>

                </button>
              </div>
              <div class="flex items-center mb-3">
                <span class="">
                  <button class="bg-green-500 text-gray-800  py-2 px-4 rounded inline-flex items-center" 
                  onClick=${() => downloadKey()}>${t('download_private_key')}</button>
                </span>
              </div>
              <p class="text-xs text-black">Download for re-entry</p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 p-4">
            <div class="bg-yellow-69  shadow-2xl rounded-2xl ">
              <div class="flex items-center py-5 px-6 border-b">
                <h3 class="text-2xl font-bold">Balance</h3>
                <div class="ml-auto inline-block py-2 px-3 border rounded text-xs text-gray-500">
                  <select class="pr-1" name="">
                    <option value="1">Monthly</option>
                    <option value="1">Yearly</option>
                    <option value="1">Weekly</option>
                  </select>
                </div>
              </div>
              <div class="pt-4 px-6">
   
              </div>
              <div class="chart" data-type="area"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <section class="py-8">
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap -m-4 ">
          <div class="w-full md:w-1/2 lg:w-1/4 p-4">
            <div class="p-6  bg-yellow-69  shadow-2xl rounded-2xl ">
              <div class="flex mb-2">
                <h3 class="text-sm text-gray-600">Carts</h3>
                <span class="inline-block ml-auto px-2 py-1 text-xs text-gray-500 bg-gray-50 rounded-full">30 Days</span>
              </div>
              <h2 class="mb-2 text-3xl font-bold" id="totalCarts"></h2>
              <span class="text-xs text-red-500">
                <span class="inline-block mr-2">
                  <svg width="18" height="10" viewbox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 4.16667C16.3906 4.16661 16.2822 4.18812 16.181 4.22998C16.0799 4.27183 15.988 4.33322 15.9106 4.41061C15.8332 4.488 15.7719 4.57989 15.73 4.68103C15.6881 4.78216 15.6666 4.89055 15.6667 5V7.15495L10.4225 1.91084C10.3452 1.83344 10.2533 1.77204 10.1522 1.73015C10.0511 1.68825 9.94277 1.66669 9.83333 1.66669C9.7239 1.66669 9.61554 1.68825 9.51445 1.73015C9.41335 1.77204 9.3215 1.83344 9.24414 1.91084L6.50002 4.65495L2.08919 0.244171C1.93245 0.0902454 1.72127 0.00444584 1.50159 0.00544068C1.28191 0.00643553 1.07151 0.094144 0.91617 0.249483C0.760831 0.404822 0.673123 0.61522 0.672128 0.8349C0.671133 1.05458 0.756932 1.26576 0.910858 1.4225L5.91086 6.4225C5.98822 6.4999 6.08007 6.5613 6.18116 6.60319C6.28226 6.64508 6.39062 6.66665 6.50005 6.66665C6.60948 6.66665 6.71784 6.64508 6.81893 6.60319C6.92003 6.5613 7.01188 6.4999 7.08924 6.4225L9.83336 3.67839L14.4883 8.33334H12.3334C12.1123 8.33334 11.9004 8.42113 11.7441 8.57741C11.5878 8.7337 11.5 8.94566 11.5 9.16667C11.5 9.38768 11.5878 9.59965 11.7441 9.75593C11.9004 9.91221 12.1123 10 12.3334 10H16.5C16.6095 10.0001 16.7179 9.97855 16.819 9.9367C16.9201 9.89484 17.012 9.83346 17.0894 9.75607C17.1668 9.67867 17.2282 9.58678 17.2701 9.48565C17.3119 9.38452 17.3334 9.27612 17.3334 9.16667V5C17.3334 4.89055 17.3119 4.78216 17.2701 4.68103C17.2282 4.57989 17.1668 4.488 17.0894 4.41061C17.012 4.33322 16.9201 4.27183 16.819 4.22998C16.7179 4.18812 16.6095 4.16661 16.5 4.16667Z" fill="#E85444"></path>
                  </svg>
                </span>
                <span>25% less</span>
              </span>
            </div>
          </div>
 
          

          <div class="w-full md:w-1/2 lg:w-1/4 p-4">
            <div class="pt-6 text-center bg-yellow-69  shadow-2xl rounded-2xl ">
              <h4 class="mb-2 text-xs text-gray-500">Failed rate</h4>
              <p class="mb-1 text-4xl font-bold" id="failedRate"></p>
              <span class="inline-block py-1 px-2 mb-2 text-xs text-black bg-green-500 rounded-full">+115</span>
              <div class="chart" data-type="area-small" data-variant="indigo-gradient"></div>
            </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/4 p-4">
            <div class="pt-6 text-center bg-yellow-69 shadow-2xl rounded-2xl ">
              <h4 class="mb-2 text-xs text-gray-500">Total Profit</h4>
              <p class="mb-1 text-4xl font-bold">$0</p>
              <span class="inline-block py-1 px-2 mb-2 text-xs text-black bg-red-500 rounded-full">$0</span>
              <div class="chart" data-type="area-small" data-variant="blue-gradient"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <section class="py-8">
      <div class="container px-4 mx-auto">
        <div class="pt-6 bg-yellow-69 shadow-2xl rounded-2xl ">
          <div class="px-6 border-b">
            <div class="flex flex-wrap items-center mb-6">
              <h3 class="text-xl font-bold">Recent Transactions</h3>
            </div>
          </div>
          <div>
            <table class="table-auto w-full">
              <thead>
                <tr class="text-xs text-gray-500 text-left">
                  <th class="flex items-center pl-6 py-4 font-medium">
                    <a class="flex items-center" href="#">
                      <span>Time</span>
                      <span class="ml-2">
                        <svg width="9" height="12" viewbox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z" fill="#67798E"></path>
                        </svg>
                      </span>
                    </a>
                  </th>
                 
                  <th class="py-4 font-medium">
                    <a class="flex items-center" href="#">
                      <span>Name</span>
                      <span class="ml-2">
                        <svg width="9" height="12" viewbox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z" fill="#67798E"></path>
                        </svg>
                      </span>
                    </a>
                  </th>

                  <th class="py-4 font-medium">
                    <a class="flex items-center" href="#">
                      <span>Type</span>
                      <span class="ml-2">
                        <svg width="9" height="12" viewbox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z" fill="#67798E"></path>
                        </svg>
                      </span>
                    </a>
                  </th>
                  <th class="py-4 font-medium">
                    <a class="flex items-center" href="#">
                      <span>Status</span>
                      <span class="ml-2">
                        <svg width="9" height="12" viewbox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z" fill="#67798E"></path>
                        </svg>
                      </span>
                    </a>
                  </th>
                  <th class="py-4 font-medium">
                    <a class="flex items-center" href="#">
                      <span>Price</span>
                      <span class="ml-2">
                        <svg width="9" height="12" viewbox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z" fill="#67798E"></path>
                        </svg>
                      </span>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
    
                ${Object.keys(this.state.transactions).map(k => {
                  const i = this.state.transactions[k];

                  if(i.status == "Failed"){
                    var backgroundCol = "bg-red-500"
                  } else{
                    var backgroundCol = "bg-green-500"
                  }
                  return html`
                    <tr class="text-xs bg-gray-50">
                      <td class="flex items-center py-5 px-6 font-medium">
                        <p>${i.time}</p>
                      </td>
              
                      <td class="font-medium">${i.name}</td>
                      <td>
                        <span class="inline-block py-1 px-2 text-black ${backgroundCol} rounded-full">${i.status}</span>
                      </td>
                      <td>${i.type}</td>
                      <td>${i.price}</td>

                    </tr>
                  `
                })}

 

   

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  
    <section class="py-8">
      <div class="container px-4 mx-auto">
        <div class="shadow-2xl rounded-2xl  overflow-hidden">
          <div class="bg-indigo-500">
            <h3 class="p-6 text-xl font-bold text-black">Sales Monitoring</h3>
            <div class="chart" data-type="area" data-variant="dark-bg"></div>
          </div>
          <div class="flex flex-wrap -m-3 px-6 py-10 bg-yellow-69 ">
            <div class="w-1/2 p-3">
              <div class="py-4 px-6 border rounded">
                <p class="text-xs text-gray-500">Sales per user</p>
                <h3 class="text-3xl font-bold">$1035</h3>
              </div>
            </div>
            <div class="w-1/2 p-3">
              <div class="py-4 px-6 border rounded">
                <p class="text-xs text-gray-500">Inventory</p>
                <h3 class="text-3xl font-bold">$435,122</h3>
              </div>
            </div>
            <div class="w-1/2 p-3">
              <div class="py-4 px-6 border rounded">
                <p class="text-xs text-gray-500">Value of refunds</p>
                <h3 class="text-3xl font-bold">$53,525</h3>
              </div>
            </div>
            <div class="w-1/2 p-3">
              <div class="py-4 px-6 border rounded">
                <p class="text-xs text-gray-500">Revenue</p>
                <h3 class="text-3xl font-bold">$2,090,00</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

    `;
  }

  renderView() {
    if (this.props.mesh) {
      return this.renderUserMesh(this.props.mesh);
    }
    return html`
      ${this.renderItems()}
    `;
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  updateTotalPrice() {
    const totalPrice = Object.keys(this.cart).reduce((sum, currentKey) => {
      const item = this.items[currentKey];
      const price = item && parseInt(item.price) || 0;
      return sum + price * this.cart[currentKey];
    }, 0);
    this.setState({totalPrice});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mesh !== this.props.mesh) {
      this.componentDidMount();
    }
  }

  getCartFromUser(user) {
    State.local.get('cart').get(user).map().on((v, k, a, e) => {
      if (k === '#') { return; } // blah
      this.eventListeners['cart' + user] = e;
      this.cart[k + user] = v;
      this.carts[user] = this.carts[user] || {};
      this.carts[user][k] = v;
      this.setState({cart: this.cart, carts: this.carts});
      this.updateTotalPrice();
    });
  }

  onPoint(p, id, a, e, from) {
    this.eventListeners['points' + from] = e;
    if (p) {
      const o = {};
      p.from = from;
      o[id] = p;
      Object.assign(this.items, o);
      this.updateTotalPrice();
    } else {
      delete this.items[id];
    }
    this.setState({items: this.items});
  }

  onDonation(p, id, a, e, from) {
    this.eventListeners['donations' + from] = e;
    if (p) {
      const o = {};
      p.from = from;
      o[id] = p;
      Object.assign(this.donate, o);
      this.updateTotalPrice();
    } else {
      delete this.donate[id];
    }
    this.setState({donate: this.donate});
  }

  

  getPointsFromUser(user) {
    State.public.user(user).get('mesh').get('points').map().on((...args) => {
      return this.onPoint(...args, user);
    });
  }

  getDonationsFromUser(user) {
    State.public.user(user).get('mesh').get('donations').map().on((...args) => {
      return this.onDonation(...args, user);
    });
  }
  
  

  getAllCarts() {
    const carts = {};
    State.local.get('cart').map((o, user) => {
      if (!user) {
        delete carts[user];
        return;
      }
      if (carts[user]) { return; }
      carts[user] = true;
      this.getCartFromUser(user);
    });
  }

  getAllPoints(group) {
    State.group(group).map('mesh/points', (...args) => {
      this.onPoint(...args);
    });
  }

  getAllDonations(group) {
    State.group(group).map('mesh/donations', (...args) => {
      this.onDonation(...args);
    });
  }


  componentDidMount() {
    const user = this.props.mesh;
    this.eventListeners.forEach(e => e.off());
    this.cart = {};
    this.items = {};
    this.isMyProfile = Session.getPubKey() === user;
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: '', totalPrice: 0, items: {}, cart: {}});

    const pub = Session.getPubKey();



    if (pub) {
      State.public.user().get('transactionsData').map().on((p, id) => {
        if (p) {
          const o = {};
          o[id] = p;
          Object.assign(this.transactions, o);
          this.updateTotalPrice();
        } else {
          delete this.transactions[id];
        }
        this.setState({transactions: this.transactions});
      });
    }



    State.local.get('noFollows').on(noFollows => this.setState({noFollows}));

    State.local.get('groups').get('follows').map().on((isFollowing, user, a, e) => {
      if (isFollowing && this.state.noFollows && Session.getPubKey() !== user) {
        State.local.get('noFollows').put(false);
        e.off();
      }
    });

    if (user) {
      this.getCartFromUser(user);
      this.getPointsFromUser(user);
    } else {
      let prevGroup;
      State.local.get('filters').get('group').on((group,k,x,e) => {
        if (group !== prevGroup) {
          this.items = {};
          this.setState({items:{}});
          prevGroup = group;
          this.eventListeners.push(e);
          this.getAllPoints(group);
          this.getAllDonations(group);

        }
      });
      this.getAllCarts();
    }
  }
}

function downloadKey() {
  const key = Session.getKey();
  delete key['#'];
  return Helpers.download('iris_private_key.txt', JSON.stringify(key), 'text/plain', 'utf-8');
}

export default Mesh;
