// import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

function Login() {
  //   const { id, password } = useParams();
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    if (e.target.id.value === "A11111" && e.target.password.value === "11111") {
      dispatch(authActions.login());
    } else {
      alert("아이디 혹은 비밀번호 오류입니다. 다시 한번 확인해주세요");
    }
  };
  return (
    <div className="loginForm flex justify-center items-center">
      <form onSubmit={handleLogin} className="flex-col border">
        <div className="inputConainer flex-col mx-2 p-11">
          <div className="inputId mb-1">
            <input type="text" name="id" placeholder="id를 입력하세요" />
          </div>
          <div className="inputPassword placeholder-gray-500 placeholder-opacity-100">
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </div>
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-800 p-2">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
