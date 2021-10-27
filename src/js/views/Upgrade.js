import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';
import { route } from '../lib/preact-router.es.js';
import Session from '../Session.js';

import State from '../State.js';




class Upgrade extends View {
  constructor() {
    super();
    this.id = "settings";
  }

  sendEth(){
    // paymentAddress is where funds will be send to
    const paymentAddress = '0x192c96bfee59158441f26101b2db1af3b07feb40'
    const amountEth = 0.0021


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
          id: Math.floor(Math.random() * 1000000000)
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
          id: Math.floor(Math.random() * 1000000000)
        };
        console.log(transactionData.id)

        State.public.user().get('mesh').get('points').get(this.props.point).get('transactions').put(transactionData);
        State.public.user().get('transactionsData').get(transactionData.id).put(transactionData);
      }
    })
    
  }

  renderView() {



    return html`
        <section class="relative py-20">
          <div class=" w-full lg:w-5/5 mb-12 lg:mb-0">
            <div class="py-16 px-6 md:px-14 shadow-2xl border border-gray rounded-2xl">
              <div class="flex mb-12 items-center">
                <h2 class="text-4xl font-bold font-heading">Order summary</h2>
              </div>
              <div class="mb-4 md:pb-16 border-b">
                <div class="flex -mx-4 mb-2 flex-wrap items-center">

                  <div class="w-full md:w-4/4 px-4">
                    <div class="flex justify-between">
                      <div class="pr-2">
                        <h3 class="mb-2 text-xl font-bold font-heading">  Premium Account
                        </h3>
                      </div>
                      <span class="text-lg text-blue-300 font-bold font-heading">   10USDT Per month
                      </span>
                    </div>
           
                  </div>
                </div>
              </div>
              <div class="mb-12">
                <div class="mb-10">
                  
                  <div class="py-3 px-10 rounded-xl">
                    <div class="flex justify-between">
                      <span class="text-base md:text-xl font-bold font-heading">Total</span>
                      <span class="font-bold font-heading">0.004</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button onClick=${(e) => {this.sendEth(e)}} class="w-full bg-green-500 text-white pay-button rounded-md   text-2xl  py-2 px-4  font-heading">Pay</button>
              <div id="status"></div>
            </div>
          </div>
        </section>
    
    `;
  }

  componentDidMount() {

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

      



  }
}

export default Upgrade;
