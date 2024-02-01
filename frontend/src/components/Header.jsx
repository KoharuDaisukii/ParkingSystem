import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex-col font-noto my-5">
      <div className="text-3xl text-center">
        <Link to="/">Parking Management System</Link>
      </div>
      <div className="btnCotainer flex justify-end mr-2 mt-1">
        <div className="loginBtn mr-2 text-blue-600">
          <Link to="/login">관리자인증</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
