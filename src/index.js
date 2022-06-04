import './style.css';

import { keys } from './keys.js';

const { body } = document;

class Storage {
  static get(key) {
    return localStorage.getItem(key);
  }

  static set(key, value) {
    localStorage.setItem(key, value);
  }
}

const main = document.createElement('div');
main.className = 'main';

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.placeholder = 'Enter your text here';

const shortcut = document.createElement('div');
shortcut.className = 'shortcut';
shortcut.innerHTML = 'To change language press <code>CTRL + ALT</code>';

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';

main.append(textarea, shortcut, keyboard);
body.append(main);

const createLayout = () => {
  keyboard.innerHTML = '';
  const lang = Storage.get('lang') || 'en';
  let currRow = document.createElement('div');
  currRow.className = 'keyboard__row';
  keys[lang].forEach((key) => {
    const button = document.createElement('div');
    button.className = 'keyboard__button';
    button.dataset.key = key.code;
    if (key.className) {
      button.classList.add(key.className);
    }
    if (key.additionalSymbol) {
      const symbol = document.createElement('div');
      symbol.className = 'keyboard__symbol';
      symbol.innerText = key.additionalSymbol;
      button.appendChild(symbol);
    }
    const letter = document.createElement('div');
    letter.className = 'keyboard__letter';
    letter.innerText = key.key;
    button.appendChild(letter);
    currRow.appendChild(button);
    if (key.breakRow) {
      keyboard.appendChild(currRow);
      currRow = document.createElement('div');
      currRow.className = 'keyboard__row';
    }
  });
};

createLayout();

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.altKey) {
    if (Storage.get('lang') === 'en') {
      Storage.set('lang', 'ru');
    } else {
      Storage.set('lang', 'en');
    }
    createLayout();
  }

  const btn = document.querySelector(`[data-key="${e.code}"i]`);
  if (btn) {
    btn.classList.add('active');
  }
});

window.addEventListener('keyup', (e) => {
  const btn = document.querySelector(`[data-key="${e.code}"i]`);
  if (btn) {
    btn.classList.remove('active');
    textarea.value += btn.innerText;
  }
});

keyboard.addEventListener('mousedown', ({ target }) => {
  let text = textarea.value;
  let button;
  if (target.classList.contains('keyboard__button')) {
    button = target;
    target.classList.add('active');
    text = target.querySelector('.keyboard__letter').innerText;
    textarea.value += text;
  } else if (
    target.classList.contains('keyboard__letter') ||
    target.classList.contains('keyboard__symbol')
  ) {
    button = target.parentNode;
    button.classList.add('active');
    text = target.innerText;
    textarea.value += text;
  }
  if (button) {
    window.addEventListener('mouseup', () => {
      button.classList.remove('active');
    }, { once: true });
  }
});
