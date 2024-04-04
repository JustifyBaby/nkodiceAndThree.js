import { main } from './nkodice'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="result"></div>
  <button id="btn">SHAKE</button>
`

const result = document.querySelector<HTMLElement>("#result");
const btn = document.querySelector<HTMLButtonElement>("#btn")
if (!result || !btn) throw new Error();
btn.addEventListener("click", () => { main(result) });

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'Enter':
      main(result);
      break;
    default:
      return;
  }
})