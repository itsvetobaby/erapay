import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';
import { route } from '../lib/preact-router.es.js';
import Session from '../Session.js';



class About extends View {
  constructor() {
    super();
    this.id = "settings";
  }

  renderView() {


    var text = ["Payments",  "Gifting🎉", "Subscriptions","👨🏻‍🏭Code bases👩‍🏭", "Checkouts",  "Recurring Billing", "💖Donations💖",   "Tipping", "🛒", "Paid Downloads"];


    var counter = 0;

    var inst = setInterval(change, 800);

    function change() {
      document.getElementById("changeText").innerHTML = text[counter];

      counter++;
      if (counter >= text.length) {
        counter = 0;
        // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
      }
    }

    return html`
    <section class="relative pt-20 2xl:pt-40">
      <div class="container px-4 mx-auto md:mb-24 text-center">
        <div class="text-center  mb-32 ">
          <h2 class="mb-8 text-5xl xl:text-6xl font-bold font-heading">Open <div class="h-10" id="changeText"> </div>
          </h2>

        </div>
        <div class="text-center  mb-32 ">
          <p class="mb-2 text-xl">Prosessing crypto through walled gardens? We can change that. <br/> Open Source payment gateways made to order.</p>

          <a class="inline-block px-12 py-3 bg-yellow-brand hover:bg-black hover:text-white rounded-2xl text-lg font-bold text-black transition duration-200" target="blank" href="./mesh/">Get Started </a>
    

        </div>


      </div>
    
    </section>

    
    `;
  }
}

export default About;
