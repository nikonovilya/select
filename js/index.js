const selectData = [
  {id: 1, value: 'Vue'},
  {id: 2, value: 'React'},
  {id: 3, value: 'React Native'},
  {id: 4, value: 'Angular'},
  {id: 5, value: 'Vanilla JavaScript'},
];

const select = new Select('#select', {
  placeholder: 'Выберите элемент',
  selectedId: 1,
  data: selectData,
});

$.select = select;
