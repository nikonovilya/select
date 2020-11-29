const selectData = [
  { id: 1, value: 'Vue', img: 'img/vue.svg', imgAlt: 'Vue Icon' },
  { id: 2, value: 'React', img: 'img/react.svg', imgAlt: 'React Icon' },
  {
    id: 3,
    value: 'React Native',
    img: 'img/react-native.svg',
    imgAlt: 'React Native Icon',
  },
  { id: 4, value: 'Angular', img: 'img/angular.svg', imgAlt: 'Angular Icon' },
  {
    id: 5,
    value: 'Vanilla JavaScript',
    img: 'img/javascript.svg',
    imgAlt: 'JavaScript Icon',
  },
];

const select = new Select('#select', {
  placeholder: 'Выберите элемент',
  // selectedId - number. Назначить опцию активной
  selectedId: 4,
  data: selectData,
  inputImgSrc: 'img/arrow.svg',
  imgSize: 22,
});

$.select = select;
