const img1_1 = document.querySelector('.row1 .col1');
const img1_2 = document.querySelector('.row1 .col2');
const img2_1 = document.querySelector('.row2 .col1');
const img2_2 = document.querySelector('.row2 .col2');
const img3_1 = document.querySelector('.row3 .col1');
const img3_2 = document.querySelector('.row3 .col2');
const img3_3 = document.querySelector('.row3 .col3');

const arr = [];
const j_mapper = [2, 2, 3];
for (let i = 0; i < 3; i++) {
  const nested_arr = [];
  for (let j = 0; j < j_mapper[i]; j++) {
    nested_arr.push(document.querySelector(`.row${i + 1} .col${j + 1}`));
  }
  arr.push(nested_arr);
}
