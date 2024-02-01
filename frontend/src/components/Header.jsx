import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex-col font-noto my-5">
      <div className="text-3xl text-center">
        <Link to="/">Parking Management System</Link>
      </div>
      <div className="btnCotainer flex justify-end mr-2 mt-1">
        <div className="loginBtn mr-2 text-blue-600">
          <Link to="/login">로그인</Link>
        </div>
        <div className="signUpBtn text-blue-600">
          <button>회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
