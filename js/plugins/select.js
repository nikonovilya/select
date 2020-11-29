const getTemplate = (data = [], placeholder, selectedId, inputImgSrc, imgSize) => {
  let textPlaceholder = placeholder ?? 'Default placeholder';
  let optionImgSize = imgSize ?? 22;
  let optionImgSrc = '';

  let arrowAlt = 'Список зыкрыт'; //TODO
  // arrowAlt = 'Список открыт';

  const options = data.map((option, i) => {
    let selectedOption = '';

    if (option.id === selectedId) {
      textPlaceholder = option.value;
      selectedOption = 'select__option--selected';
      optionImgSrc = option.img;
    }

    return `
    <li class="select__option ${selectedOption}" data-type="option" data-id="${option.id}">
    ${
      option.img
        ? `
          <img class="select__option-img" src="${
            option.img
          }" width="${optionImgSize}" height="${optionImgSize}" alt="${
            option.imgAlt || ''
          }">
      `
        : ''
    }
      <span>${option.value}</span>
    </li>
    `;
  });

  return `
    <div class="select__input" data-type="input">
      <div class="select__input-wrap">
      ${
        selectedId !== null && inputImgSrc ? 
        `
        <img class="select__input-img" src="${optionImgSrc}" width="${optionImgSize}" height="${optionImgSize}">
        `
        : ''
      }
      <span data-type="value">${textPlaceholder}</span>
      </div>
      <img src="img/arrow.svg" width="10px" height="10px" data-type="arrow" alt="${arrowAlt}" tabindex="0">
    </div>
    <ul class="select__options">${options.join('')}</ul>
  `;
};

class Select {
  constructor(selector, options) {
    this.window = window;
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data, inputImgSrc, imgSize } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(
      data,
      placeholder,
      this.selectedId,
      inputImgSrc,
      imgSize
    );
  }

  #setup() {
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');

    // listener по клику на input
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);

    // listener по клику за пределами select и select__options
    this.clickHandlerWindow = this.clickHandlerWindow.bind(this);
    this.window.addEventListener('click', this.clickHandlerWindow);

    // listener для клавиши ESC
    this.clickHandlerESC = this.clickHandlerESC.bind(this);
    this.window.addEventListener('keydown', this.clickHandlerESC);

    // listener для arrow select'а
    this.clickHandlerArrow = this.clickHandlerArrow.bind(this);
    this.$arrow.addEventListener('keydown', this.clickHandlerArrow);
  }

  clickHandler(evt) {
    const { type } = evt.target.dataset;

    if (type === 'input') {
      this.toggle();
    } else if (type === 'option') {
      const id = evt.target.dataset.id;
      this.select(id);
    }
  }

  clickHandlerWindow(evt) {
    const { type } = evt.target.dataset;
    if (type !== 'input' && type !== 'option') {
      if (this.$el.classList.contains('select--open')) {
        this.close();
      }
    }
  }

  clickHandlerESC(evt) {
    const ESC = 27;
    if (evt.keyCode === ESC) {
      if (this.$el.classList.contains('select--open')) {
        evt.preventDefault();
        this.close();
      }
    }
  }

  clickHandlerArrow(evt) {
    const ENTER = 13;
    if (evt.keyCode === ENTER) {
      evt.preventDefault();
      this.toggle();
    }
  }

  get isOpen() {
    return this.$el.classList.contains('select--open');
  }

  get current() {
    const selecterIdNumber = Number(this.selectedId);
    return this.options.data.find((option) => option.id === selecterIdNumber);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;
    this.$el.querySelectorAll('[data-type="option"]').forEach((el) => {
      if (el.classList.contains('select__option--selected')) {
        el.classList.remove('select__option--selected');
      }
    });
    this.$el
      .querySelector(`[data-id="${id}"]`)
      .classList.add('select__option--selected');
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('select--open');
    this.$arrow.classList.add('transform-rotate');
  }

  close() {
    this.$el.classList.remove('select--open');
    this.$arrow.classList.remove('transform-rotate');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.window.removeEventListener('click', this.clickHandlerWindow);
    this.window.removeEventListener('keydown', this.clickHandlerESC);
    this.$arrow.removeEventListener('keydown', this.clickHandlerArrow);
    this.$el.parentNode.removeChild(this.$el);
  }
}
