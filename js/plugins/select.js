const getTemplate = (data = [], placeholder, selectedId) => {
  let textPlaceholder = placeholder ?? 'Default placeholder';

  const options = data.map((option) => {
    let cls = '';

    if (option.id === selectedId) {
      textPlaceholder = option.value;
      cls = 'select__option--selected';
    }
    return `
      <li class="select__option ${cls}" data-type="option" data-id="${option.id}">${option.value}</li>
    `;
  });

  return `
    <div class="select__input" data-type="input">
      <span data-type="value">${textPlaceholder}</span>
      <img src="img/arrow.svg" width="10px" height="10px" data-type="arrow" alt="Открыть список" tabindex="0">
    </div>
    <ul class="select__options">${options.join('')}</ul>
  `;
};

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
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
    this.$el.parentNode.removeChild(this.$el);
  }
}
