import { html } from '../Helpers.js';
import View from './View.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';
import State from '../State.js';



class Home extends View{
  constructor() {
    super();
    
  }


  

  renderView() {

   



    
    return html`
    <style>

    .main-view {
    overflow: hidden !Important; 
  }

    .application-list{
      margin-top: -4px
    }


    body{
      color: white
    }

    .hideWhite{
      
    }



      .main-view {
        overflow: hidden
    }

    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
      margin-bottom: 0rem;
      font-weight: 300;
    }

    #parent_div {
      width: auto;
      height: auto;
    }
    #follow_div{
      position: absolute;
      width: 140px;
      height: 65px

      background: #88ee99;
    }


    canvas{
     

    margin-top: 2em;
    position: relative;
    margin-top: -40em;

    }


.view-area {
    padding: 0em !important;
}

    @media (max-width: 625px){

.smolTxt1{
  font-size: 3em !important;
}

.smolTxt2{
  font-size: 2em !important;
}

  }
    .main-view {
      margin-top: -1em !important;
  }

    *{
      filter: invert(0) !important;
    }

    .displayNone{
      display: none
    }


    .fuckDameDash{
      display: none !important;
    }


.hideAppl{
  display: none !important 
}






    </style>


    <div style="display :flex ;transform: rotate(20deg); position: absolute; top: -3em; margin-left: 10% ">
      <div class="bar expand" style=""></div>
      <div class="expand twister" style=""></div>
      <div class="bar expand" style=""></div>
    </div>

    <div  class="" style="margin: auto; text-align: center; margin-right: 1em; position: sticky; z-index: 10;top: 3em; filter: invert(1);mix-blend-mode: difference;"> 
    </div>




  <div class="container">

    <div class="twelve columns" style=" text-align: center; padding: 1em;font-weight: 600; margin-top: 18em;  background: #ffffff00;border-radius: 15px;  z-index:1; ">

      <div style="z-index: 0; color: black">
        <h1 class="smolTxt1" style="font-size: 5em; font-weight: 800; ">Infrastructure for Autonomy</h1>
        <p class="smolTxt2" style="    font-size: 2em;">The Blueprints to build your world</p>
      </div>

      <div style="display: flex; margin: auto; width: min-content; color: black;">
        <div class="expand" style="display: flex; margin: auto; background-color: #ffffff40; padding: 3px;border-radius: 15px; height: fit-content; padding-left:20px; padding-top: 5px; margin-right: 1em !important ">
          <div class="" >
            <a  href=""  download="" style=""><i style=" color: #464646;   font-size: 2.2em; margin-right: 0.3em; " class="fas fa-chevron-circle-down"></i></a>
          </div>
          <div class="" >
            <a  href="https://github.com/ixnay-main/ixnay"  target="blank" style=""><i style=" color: #464646;   font-size: 2.2em; margin-right: 0.3em; " class="fab fa-github"></i></a>
          </div>
        </div>

        <div class="expand" style=" height: fit-content;   padding: 5px 10px;border-radius: 15px ;margin-left: 3px; width: 5em">
          <a  onClick=${() => route(`/store`)}  target="blank" style=" color: #ffffff20 "> <h2 class="para" style=" font-weight: 800 ;color: #464646 "><i  class="fas fa-chevron-right" style=" color: #464646;font-size: 1.5em; margin-left: 0.2em;"></i></h2></a>
        </div>
      </div>
    </div>
  </div>

  
  `;
  }
};



export default Home;

