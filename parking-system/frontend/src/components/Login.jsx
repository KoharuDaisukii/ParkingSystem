// import { useParams } from "react-router-dom";

function Login() {
  //   const { id, password } = useParams();

  return (
    <div className="loginForm flex justify-center">
      <form className="flex">
        <div className="inputConainer flex-col mx-2">
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
        <button className="text-blue-600 hover:text-blue-800">로그인</button>
      </form>
    </div>
  );
}

export default Login;
