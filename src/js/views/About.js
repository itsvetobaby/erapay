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



    return html`
    <section class="skewed-bottom-right">
      <div class="bg-yellow-brand pt-12 lg:pt-20 shadow rounded-2xl p-4  pb-20 my-10 radius-for-skewed">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
              <div class="w-full text-center lg:text-left">
                <div class="mx-auto lg:mx-0">
                  <h2 class="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                    <span>Open tooling for open tech.  </span>
                    <span class="text-green-600"></span>
                  </h2>
                </div>
                <div class="mx-auto lg:mx-0">
                  <p class="mb-6 text-gray-400 leading-loose">An open source payments infrastucture for crypto. <br/><br/>Closed source webapps for dealing with crypto dont win any hearts. <br/> Erapay is built to keep the free open.</p>
                  <div onClick=${() => route('/mesh/')}><a class="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-black hover:bg-green-700 text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200">Get Started</a><a class="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200" href="#">How it works</a></div>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/2 px-4 flex items-center justify-center">
              <div class="relative" style="z-index: 0;">
                <img class="h-128 w-full max-w-lg object-cover rounded-3xl md:rounded-br-none" src="./assets/erapaylogo.svg" alt=""/>
                <img class="hidden md:block absolute" style="top:-2rem; right: 3rem; z-index: -1;" src="atis-assets/elements/green-dark-up.svg" alt=""/>
                <img class="hidden md:block absolute" style="bottom:-2rem; right: -2rem; z-index: -1;" src="atis-assets/elements/wing-green-down.svg" alt=""/>
                <img class="hidden md:block absolute" style="top:3rem; right: -3rem; z-index: -1;" src="atis-assets/elements/bullets-gray-right.svg" alt=""/>
                <img class="hidden md:block absolute" style="bottom:2.5rem; left: -4.5rem; z-index: -1;" src="atis-assets/elements/bullets-gray-left.svg" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
    
    `;
  }
}

export default About;
