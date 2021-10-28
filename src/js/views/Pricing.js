import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';

class Pricing extends View {
  constructor() {
    super();
    this.id = "settings";
  }

  renderView() {
    return html`
    <div style="display :flex ;transform: rotate(190deg); position: absolute; top: -3em;">
    <div class="bar" style=""></div>
    <div class="bar" style=""></div>
    <div class="bar" style=""></div>

  </div>
    <div class="container" style="margin-top: 4em">
        <div class="columns two ">
        </div>
        <div class="columns ten ">
            <h2>Purchase of an account is a one off purchase for a key pair.</h2>
        </div>
    </div>

    <div class="container" style="margin-top: 2em">
        <div class="columns two ">
        </div>
        <div class="columns four  " style="">

            <div class="infoBox expand">
                <div style="color: white;">
                    <h2>Basic</h2>
                </div>
                <div style="color: white;">
                    <h1 style="font-size: 5em; margin: 0px">$10</h1>
                </div>
                <div style="color: white;">
                <ul>
                    <li>Ordering</li>
                    <li>Unlimited Listing</li>
                    <li>Peer management</li>
                </ul>


                </div>
                <div class="columns six ">
                </div>
            </div>
            <br/>
            <div class="infoBox expand" style="height:fit-content !Important">
                <h2 style="color: white">Purchase</h2>
            </div>

        </div>

    </div>


    `;
  }
};

export default Pricing;
