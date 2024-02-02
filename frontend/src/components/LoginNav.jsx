import { NavLink } from "react-router-dom";

function LoginNav() {
  return (
    <div className="btnCotainer flex justify-end mr-2 mt-1">
      <div className="loginBtn mr-2 text-blue-600">
        <NavLink to="/login">관리자인증</NavLink>
      </div>
    </div>
  );
}

export default LoginNav;
