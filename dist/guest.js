showMessage();

// 1.Submit 함수 : default prevent + username/password/message 받아서 JSON으로 변환 + BE 전달?
function submit() {
  const formInput = {
    username: document.querySelector('#guestform #Name').value,
    password: document.querySelector('#guestform #Password').value,
    message: document.querySelector('#guestform #Message').value,
    timestamp: new Date(),
  };

  fetch('http://34.64.183.194:9876/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formInput),
  })
    .then(() => {
      document.querySelectorAll('.write_box input').forEach((elem) => {
        elem.value = '';
      });
    })
    .finally(() => {
      showMessage();
    });
}

// 2. 방명록 띄우는 함수 : BE에서 username/password/message 받아오기 + 방명록에 띄우기(CSS 조작 필요, ul 태그 안에 li로 들어가기??)
function showMessage() {
  //fetch로 가져와서 json을 obj로 바꾼 후(parse), username, password, message, timestamp에 각각 저장
  fetch('http://34.64.183.194:9876/api/readall')
    .then((response) => response.json())
    .then((json) => {
      makeElement(json);
    });
}

// 3. submit button click event 발생 시 submit + 방명록 띄우는 함수 실행
document.querySelector('#guestform').addEventListener('submit', (e) => {
  e.preventDefault();
  if (checkForm()) submit();
});

// makeElement : html에 요소들 만들어주는 함수
function makeElement(json) {
  const guestbook = document.querySelector('#guestbook');

  guestbook.innerHTML = '';

  for (let id of Object.keys(json).reverse()) {
    const username = json[id]['username'];
    const message = json[id]['message'];
    const timestamp = json[id]['timestamp'];
    const date = new Date(timestamp);
    const msgdate = dateConvert(date);

    const html = createElement(
      `<li class="guestbook_item" data-guestbook-id="${id}">
        <div class="guestitem guestitem_top">
          <span class="guest_top_name">${username}</span>
          <span class="guest_top_time">${msgdate}</span>
        </div>
        <div class="guestitem guestitem_text">
          <p>${message}</p>
          <div class="msg_delete"></div>
        </div>
        <div class="guestitem guestitem_pwcheck hidePwArea">  
          <input
            type="password"
            id="${id}"
            name="password_chk"
            maxlength="20"
            placeholder="비밀번호를 입력하세요."
            />
          <button class="pw_chk_btn">확인</button>
        </div>
      </li>`
    );

    const pwchkbtn = html.querySelector('.pw_chk_btn');
    const pwcheckInput = html.querySelector('.guestitem_pwcheck input');

    const pwcheckArea = html.querySelector(`.guestitem_pwcheck`);

    const x_btn = html.querySelector('.msg_delete');

    // x버튼 누르면 pwcheck란 보이게 하기
    x_btn.addEventListener('click', () => {
      pwcheckArea.classList.toggle('hidePwArea');
    });

    // pw_chk_btn 누르면 id, pw 보내서 비밀번호 확인하고 삭제하기
    pwchkbtn.addEventListener('click', (e) => {
      pwSubmit(e, id, pwcheckInput);
    });

    guestbook.appendChild(html);
  }
}

// createElement : 요소 및 그 안의 하위요소, 내용 만들어주는 함수
function createElement(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstChild;
}

// Password submit
function pwSubmit(e, id, pwcheck) {
  e.preventDefault();
  const pwInput = {
    id: id,
    password: pwcheck.value,
  };

  fetch('http://34.64.183.194:9876/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pwInput),
  })
    .then(() => {
      pwcheck.value = '';
    })
    .then(showMessage);
}
