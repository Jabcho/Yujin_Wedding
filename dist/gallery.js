const bigImgContainer = document.querySelector('.big-img-container');
const counter = document.querySelector('.counter_class');
let currentIdx = undefined;

//n번째 이미지 보여주는 함수
function showImage(n) {
  bigImgContainer.style.display = 'flex';
  document
    .querySelector(`.big-img-container .img${n}`)
    .classList.add('selected');
  counter.innerText = `${n} / 7`;
}
//n번째 이미지 사라지는 함수 (selected 속성 제거)
function hideImage(n) {
  document
    .querySelector(`.big-img-container .img${n}`)
    .classList.remove('selected');
}

// 모든 이미지 사라지게 하는 함수
function closeAll() {
  bigImgContainer.style.display = 'none';
}

// 1. album의 특정 이미지 선택 시 이미지 띄워주기 (+counter)
for (let i = 0; i < 7; i++) {
  document
    .querySelector(`#album .img${i + 1}`)
    .addEventListener('click', () => {
      // album안의 이미지(currentIdx의 이미지)랑 big-img-container 안의 이미지가 같으면 show, 다르면 hide
      currentIdx = i + 1;

      for (let j = 0; j < 7; j++) {
        if (j + 1 == currentIdx) {
          showImage(j + 1);
        } else {
          hideImage(j + 1);
        }
      }
    });
}

// 2. 모든 이미지 사라지게 하기 : 1) x버튼 2) 스크롤 3) ESC
document.querySelector('.indi_btn.close').addEventListener('click', closeAll);
document.addEventListener('scroll', function () {
  bigImgContainer.style.display = 'none';
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAll();
  }
});

// 3. 전 이미지로 이동 : 1) <버튼 2) 화살표 방향키
function moveLeft() {
  hideImage(currentIdx);

  if (currentIdx > 1) {
    currentIdx = currentIdx - 1;
  } else {
    currentIdx = 7;
  }

  showImage(currentIdx);
}

document.querySelector('.indi_btn.left').addEventListener('click', moveLeft);

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    moveLeft();
  }
});

// 4. 후 이미지로 이동 : 2) >버튼 2) 화살표 방향키
function moveRight() {
  hideImage(currentIdx);

  if (currentIdx < 7) {
    currentIdx = currentIdx + 1;
  } else {
    currentIdx = 1;
  }
  showImage(currentIdx);
}

document.querySelector('.indi_btn.right').addEventListener('click', moveRight);

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    moveRight();
  }
});
