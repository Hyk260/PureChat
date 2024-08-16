const loadingSvg = `<svg
  class="nyan"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 47 20"
>
  <defs>
    <linearGradient id="rainbow-colors" x1="0.5" x2="0.5" y2="1">
      <stop class="rainbow-color1" offset="0" />
      <stop class="rainbow-color1" offset="0.167" />
      <stop class="rainbow-color2" offset="0.167" />
      <stop class="rainbow-color2" offset="0.335" />
      <stop class="rainbow-color3" offset="0.335" />
      <stop class="rainbow-color3" offset="0.5" />
      <stop class="rainbow-color4" offset="0.5" />
      <stop class="rainbow-color4" offset="0.669" />
      <stop class="rainbow-color5" offset="0.669" />
      <stop class="rainbow-color5" offset="0.833" />
      <stop class="rainbow-color6" offset="0.833" />
      <stop class="rainbow-color6" offset="1" />
    </linearGradient>
  </defs>
  <g class="rainbow">
    <rect />
    <rect />
    <rect />
    <rect />
    <rect />
    <rect />
  </g>
  <g class="pig">
    <g class="foot" transform="translate(52)">
      <rect width="1" height="3" transform="translate(6 13)" />
      <rect width="1" height="3" transform="translate(8 13)" />
      <rect width="1" height="3" transform="translate(14 13)" />
      <rect width="1" height="3" transform="translate(12 13)" />
    </g>
    <g class="tail">
      <rect width="1" height="1" transform="translate(4 10)" />
      <rect width="1" height="1" transform="translate(3 11)" />
    </g>

    <g transform="translate(52)">
      <rect
        class="body1"
        width="8"
        height="8"
        transform="translate(7 6)"
      />
      <rect
        class="body1"
        width="10"
        height="8"
        transform="translate(6 7)"
      />
      <rect
        class="body1"
        width="12"
        height="6"
        transform="translate(5 8)"
      />
      <rect
        class="body2"
        width="10"
        height="6"
        transform="translate(6 8)"
      />
      <rect
        class="body2"
        width="8"
        height="6"
        transform="translate(7 7)"
      />
      <rect
        class="stains"
        width="4"
        height="1"
        transform="translate(7 13)"
      />
      <rect
        class="stains"
        width="2"
        height="1"
        transform="translate(8 12)"
      />
      <rect
        class="stains"
        width="2"
        height="1"
        transform="translate(6 9)"
      />
      <rect
        class="stains"
        width="3"
        height="1"
        transform="translate(6 8)"
      />
      <rect
        class="stains"
        width="3"
        height="1"
        transform="translate(7 7)"
      />
      <rect
        class="stains"
        width="1"
        height="1"
        transform="translate(14 7)"
      />
    </g>
    <g class="ears" transform="translate(52)">
      <rect width="1" height="3" transform="translate(10 5)" />
      <rect width="1" height="3" transform="translate(15 5)" />
    </g>
    <g class="snout">
      <rect
        class="snout1"
        width="5"
        height="3"
        transform="translate(13 10)"
      />
      <rect
        class="snout-holes"
        width="1"
        height="3"
        transform="translate(17 11) rotate(90)"
      />
      <rect
        class="snout2"
        width="1"
        height="1"
        transform="translate(16 11) rotate(90)"
      />
    </g>
    <g class="eyes">
      <rect width="1" height="1" transform="translate(12 9)" />
      <rect width="1" height="1" transform="translate(15 9)" />
    </g>
  </g>
</svg>`

const loadingStyle = `<style>
  .loader-container {
    position: relative;
    width: 100%;
    height: 100vh;
    // height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .loader-container .loader-state {
    width: 100%;
  }

  .loader-container .loader-state+.loader-text {
    display: block;
    user-select: none;
    opacity: 0;
    transform: translate(10px, calc(20px * 1.5));
    animation: loader-text-blink 0.4s ease-in-out infinite alternate;
  }

  @keyframes loader-text-blink {
    to {
      opacity: 1;
    }
  }

  @media screen and (max-height: 350px) {
    .loader-container .loader-state+.loader-text {
      display: none;
    }
  }

  .loader-container .loader-state.enter-exit {
    animation: appear 8s ease-in-out infinite forwards;
  }

  @keyframes appear {
    0% {
      opacity: 0;
      transform: translate(-600px, 20px);
    }

    5%,
    93% {
      opacity: 0;
    }

    10% {
      transform: translate(50px, 20px);
    }

    15% {
      transform: translate(-50px, 20px);
    }

    20%,
    90% {
      opacity: 1;
      transform: translate(0, 20px);
    }

    100% {
      opacity: 0;
      transform: translate(600px, 20px);
    }
  }

  .loader-container .loader-state.enter-exit+.loader-text {
    animation: loader-text-blink2 8s ease-in-out infinite forwards;
  }

  @keyframes loader-text-blink2 {

    0%,
    5%,
    15%,
    25%,
    35%,
    45%,
    55%,
    65%,
    75%,
    85%,
    93%,
    100% {
      opacity: 0;
    }

    10%,
    20%,
    30%,
    40%,
    50%,
    60%,
    70%,
    80%,
    90% {
      opacity: 1;
    }
  }

  .loader-container svg {
    --flying-speed: 0.4s;
    width: 100%;
    max-width: 400px;
    -webkit-mask-image: linear-gradient(to left,
        #0a0916 65%,
        transparent 85%);
    mask-image: linear-gradient(to left, #0a0916 65%, transparent 85%);
    animation: moves-like-jagger 0.4s ease-in-out infinite alternate;
  }

  @keyframes moves-like-jagger {
    to {
      transform: translateY(20px);
    }
  }

  .rainbow rect {
    width: 5px;
    height: 6px;
    stroke: transparent;
    fill: url(#rainbow-colors);
  }

  .rainbow rect:nth-child(1) {
    transform: translate(25px, 8.4px);
    animation: over-the-rainbow-1 0.4s ease-in-out 0.0666666667s infinite alternate;
  }

  @keyframes over-the-rainbow-1 {
    to {
      transform: translate(25px, 9.0666666667px);
    }
  }

  .rainbow rect:nth-child(2) {
    transform: translate(20.2px, 8.3px);
    animation: over-the-rainbow-2 0.4s ease-in-out 0.1333333333s infinite alternate;
  }

  @keyframes over-the-rainbow-2 {
    to {
      transform: translate(20.2px, 9.6333333333px);
    }
  }

  .rainbow rect:nth-child(3) {
    transform: translate(15.4px, 8.2px);
    animation: over-the-rainbow-3 0.4s ease-in-out 0.2s infinite alternate;
  }

  @keyframes over-the-rainbow-3 {
    to {
      transform: translate(15.4px, 10.2px);
    }
  }

  .rainbow rect:nth-child(4) {
    transform: translate(10.6px, 8.1px);
    animation: over-the-rainbow-4 0.4s ease-in-out 0.2666666667s infinite alternate;
  }

  @keyframes over-the-rainbow-4 {
    to {
      transform: translate(10.6px, 10.7666666667px);
    }
  }

  .rainbow rect:nth-child(5) {
    transform: translate(5.8px, 8px);
    animation: over-the-rainbow-5 0.4s ease-in-out 0.3333333333s infinite alternate;
  }

  @keyframes over-the-rainbow-5 {
    to {
      transform: translate(5.8px, 11.3333333333px);
    }
  }

  .rainbow rect:nth-child(6) {
    transform: translate(1px, 7.9px);
    animation: over-the-rainbow-6 0.4s ease-in-out 0.4s infinite alternate;
  }

  @keyframes over-the-rainbow-6 {
    to {
      transform: translate(1px, 11.9px);
    }
  }

  .nyan .rainbow-color1 {
    stop-color: #e12523;
  }

  .nyan .rainbow-color2 {
    stop-color: #dc8d30;
  }

  .nyan .rainbow-color3 {
    stop-color: #deeb44;
  }

  .nyan .rainbow-color4 {
    stop-color: #01eb3e;
  }

  .nyan .rainbow-color5 {
    stop-color: #138fe9;
  }

  .nyan .rainbow-color6 {
    stop-color: #7127ee;
  }

  .devil .rainbow-color1 {
    stop-color: #d71440;
  }

  .devil .rainbow-color2 {
    stop-color: #ff6c40;
  }

  .devil .rainbow-color3 {
    stop-color: #ffce21;
  }

  .devil .rainbow-color4 {
    stop-color: #ffce21;
  }

  .devil .rainbow-color5 {
    stop-color: #ff6c40;
  }

  .devil .rainbow-color6 {
    stop-color: #d71440;
  }

  .alien .rainbow-color1 {
    stop-color: #12a921;
  }

  .alien .rainbow-color2 {
    stop-color: #0fce22;
  }

  .alien .rainbow-color3 {
    stop-color: #0fef25;
  }

  .alien .rainbow-color4 {
    stop-color: #0fef25;
  }

  .alien .rainbow-color5 {
    stop-color: #0fce22;
  }

  .alien .rainbow-color6 {
    stop-color: #12a921;
  }

  .baguette .rainbow-color1 {
    stop-color: #2465de;
  }

  .baguette .rainbow-color2 {
    stop-color: #2465de;
  }

  .baguette .rainbow-color3 {
    stop-color: #ffffff;
  }

  .baguette .rainbow-color4 {
    stop-color: #ffffff;
  }

  .baguette .rainbow-color5 {
    stop-color: #f1200d;
  }

  .baguette .rainbow-color6 {
    stop-color: #f1200d;
  }

  svg.nyan {
    --body1: #f19183;
    --body2: #fcd8d7;
    --stains: #fac4b8;
    --eyes: #0c0b0b;
    --ears: #f19183;
    --snout1: #f79197;
    --snout2: #f66b79;
    --snout-holes: #e73b36;
  }

  svg.devil {
    --body1: #410a07;
    --body2: #bb1626;
    --stains: #790813;
    --eyes: #f0d459;
    --ears: #2b1d05;
    --snout1: #db2839;
    --snout2: #ae1f2d;
    --snout-holes: #900f0b;
  }

  svg.alien {
    --body1: #116423;
    --body2: #15a031;
    --stains: #0f8b27;
    --eyes: #ffffff;
    --ears: #3dbc56;
    --snout1: #3dbc56;
    --snout2: #319e47;
    --snout-holes: #196e2a;
  }

  svg.baguette {
    --body1: #f89f39;
    --body2: #fdb85a;
    --stains: #fedda7;
    --eyes: #0c0b0b;
    --ears: #dc790f;
    --snout1: #ffdea1;
    --snout2: #fedea2;
    --snout-holes: #f98d0e;
  }

  .pig {
    position: relative;
    transform: translate(-29px);
  }

  .pig .body2 {
    fill: var(--body2);
  }

  .pig:hover {
    cursor: pointer;
  }

  .pig .body1,
  .tail rect,
  .foot rect {
    fill: var(--body1);
  }

  .stains {
    fill: var(--stains);
  }

  .snout {
    stroke: transparent;
    transform: translate(52px);
    animation: sniff-sniff 2s ease-in-out infinite;
  }

  .snout .snout1 {
    fill: var(--snout1);
  }

  .snout .snout2 {
    fill: var(--snout2);
  }

  .snout .snout-holes {
    fill: var(--snout-holes);
  }

  @keyframes sniff-sniff {

    5%,
    15%,
    25% {
      transform: translate(52px);
    }

    10%,
    20% {
      transform: translate(52.5px);
    }
  }

  .tail {
    transform: translate(52.25px);
    transform-origin: center;
  }

  .tail rect:nth-child(2) {
    transform: translate(3.25px, 10.5px);
    animation: fairy-tail 0.4s ease-in-out infinite alternate;
  }

  @keyframes fairy-tail {
    to {
      transform: translate(3.25px, 10px);
    }
  }

  .foot {
    transform: translate(52px);
    animation: hypnotic-feet 0.4s ease-in-out infinite alternate;
  }

  @keyframes hypnotic-feet {
    to {
      transform: translate(52.5px);
    }
  }

  .ears rect {
    fill: var(--ears);
  }

  .eyes {
    transform: translate(52px);
  }

  .eyes rect {
    fill: var(--eyes);
    animation: blinky-blinky 2s step-start infinite;
  }

  @keyframes blinky-blinky {
    5% {
      opacity: 1;
    }

    10% {
      opacity: 0;
    }
  }
</style>`

const loading = `
${loadingStyle}
<div class="loader-container">
  <div class="loader-state">
  ${loadingSvg}
  </div>
  <span class="loader-text">Loading...</span>
</div>`;

const app = document.getElementById('app');

if (app) {
  app.innerHTML = loading;
}


