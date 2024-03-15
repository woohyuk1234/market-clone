const form = document.querySelector("#signup-form");

const checkPasword = () => {
  const data = new FormData(form);
  const pass1 = data.get("password");
  const pass2 = data.get("password2");

  if (pass1 === pass2) {
    return true;
  } else return false;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);
  const div = document.querySelector("#info");
  if (checkPasword()) {
    div.innerText = "";
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });
    const datas = await res.json();
    if (datas === "200") {
      div.innerText = "회원가입 성공";
      alert("회원가입 성공입니다");
      div.style.color = "blue";
      window.location.pathname = "/login.html";
    } else {
      div.innerText = "틀림";
    }
  } else {
    div.innerText = "비밀번호가 달라욤";
    div.style.color = "red";
    form.appendChild(div);
  }
  console.log(formData.get("password"));
};

form.addEventListener("submit", handleSubmit);
