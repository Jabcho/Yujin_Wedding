// form submit할 때 칸 비어있으면 오류메시지 띄우는함수
function checkForm() {
  const formName = document.querySelector('#Name');
  const formPw = document.querySelector('#Password');
  const formMessage = document.querySelector('#Message');

  if (formName.value.trim().length === 0) {
    window.alert('이름을 입력하세요.');
    return false;
  }
  if (formPw.value.trim().length === 0) {
    window.alert('비밀번호를 입력하세요.');
    return false;
  }
  if (formMessage.value.trim().length === 0) {
    window.alert('메세지를 입력하세요.');
    return false;
  }

  return true;
}

// 날짜 바꿔주는 함수

function dateConvert(date) {
  const tempdate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${
    date.getHours() <= 12 ? '오전' : '오후'
  } ${
    date.getHours() <= 12
      ? date.getHours().toString().padStart(2, '0')
      : (date.getHours() - 12).toString().padStart(2, '0')
  }:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;

  return tempdate;
}
