function Header() {
  return (
    <div className="flex-col font-honk my-5">
      <div className="text-3xl">Parking Management System</div>
      <div className="btnCotainer flex justify-end mr-2 mt-1">
        <div className="loginBtn mr-2 text-blue-600">
          <button>로그인</button>
        </div>
        <div className="signUpBtn text-blue-600">
          <button>회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
