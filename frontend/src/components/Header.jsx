import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex-col font-noto my-5">
      <div className="text-3xl text-center">
        <Link to="/">PMS</Link>
      </div>
      <div className="text-center">Parking Management System</div>
    </div>
  );
}

export default Header;
