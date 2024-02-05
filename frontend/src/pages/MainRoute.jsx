import Input from "../components/Input";
import ParkList from "../components/ParkList";
import { useState, useEffect } from "react";
import { formatToISO8601 } from "../utils/convertISO";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LoginNav from "../components/LoginNav";
import Login from "./Login";
import { authActions } from "../store/auth";
function MainRoute() {
  //로그인 관련
  const isAuth = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
  };

  const [cars, setCars] = useState([]);
  const [files, setFiles] = useState(undefined);

  useEffect(() => {
    handleSearch();
  }, []);
  function handleFileChange(e) {
    // console.log(e.target.files[0]);
    setFiles(e.target.files[0]);
  }

  //폼 제출 시 데이터베이스에 차량 추가(입차등록)
  const handleSubmit = async (e) => {
    e.preventDefault();

    //폼데이터 정의
    const formData = new FormData(e.target);

    //빈칸일 수 있는 inTime과 region에 대한 처리
    const enter_time = formData.has("enter_time")
      ? formData.get("enter_time")
      : formatToISO8601(new Date());
    formData.set("enter_time", enter_time);
    const car_region_name = formData.has("car_region_name")
      ? formData.get("car_region_name")
      : null;
    // const photo = e.target.files[0];
    formData.set("photo", files);
    formData.set("car_region_name", car_region_name);
    formData.set("admin_id", "A11111");

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    // const carNum = e.target.carNum.value;
    // const inTime = e.target.inTime.value || new Date(); //빈 칸인 경우 현재 시간으로 대체
    // const outTime = e.target.outTime.value;
    // const region = e.target.region.value || null;
    // const sector = e.target.sector.value;

    //파일 업로드를 위한 코드

    // console.log(carPhoto);
    if (data.car_no !== null && data.car_no !== "") {
      const response = await axios.post("/park/in", formData);
      console.log("response", response);
      setCars(response.data);
      console.log("cars", cars);
      //form 초기화

      alert("입차하였습니다!");
    }
  };
  //미납차량 조회를 위한 함수
  const handleClick = async () => {
    const response = await axios.get("/history/unpaid");
    console.log("미납차량정보", response);
    setCars(response.data);
    console.log(cars);
  };
  //전체차량 조회를 위한 함수
  const handleSearch = async () => {
    const response = await axios.get("/history/all");
    console.log("전체차량정보", response.data);
    setCars(response.data);
    console.log(cars);
  };

  return (
    <div>
      <div className="flex-col">
        <LoginNav />
        {isAuth && <button onClick={logoutHandler}>로그아웃</button>}
        <Input
          onSubmit={handleSubmit}
          onClick={handleClick}
          onChange={handleFileChange}
          onSearch={handleSearch}
          files={files}
        />
        {!isAuth && <Login />}
        {isAuth && <ParkList cars={cars} />}
      </div>
    </div>
  );
}

export default MainRoute;
