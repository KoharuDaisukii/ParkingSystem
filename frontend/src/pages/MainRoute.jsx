import Input from "../components/Input";
import ParkList from "../components/ParkList";
import { useState, useEffect } from "react";

import axios from "axios";
import LoginNav from "../components/LoginNav";
function MainRoute() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  //supabase 사용
  // async function getData() {
  //   const { data } = await supabase.from("page1").select();

  //   if (!compareArrays(cars, data)) {
  //     setCars(data); // cars가 이전 상태와 다를 경우에만 업데이트함
  //   }
  // }
  //axios 사용
  //전체 차량 조회
  async function getData() {
    // try {
    const response = await axios.get("/history");
    console.log(response);
    setCars(response.data);
    console.log("cars", cars);
  }
  //폼 제출 시 데이터베이스에 차량 추가(입차등록)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const carNum = e.target.carNum.value;
    const inTime = e.target.inTime.value || new Date(); //빈 칸인 경우 현재 시간으로 대체
    const outTime = e.target.outTime.value;
    const region = e.target.region.value || null;
    const sector = e.target.sector.value;

    //파일 업로드를 위한 코드
    const carPhoto = e.target.carPhoto.value;

    // console.log(carPhoto);
    if (carNum !== null && carNum !== "") {
      const response = await axios({
        method: "post",
        url: "park/in",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          admin_id: "A11111",
          park_area: 1,
          park_spot: 1,
          car_region_name: "대구",
          car_no: "11가나123",
          enter_time: "2024-02-02T13:52:52",
          photo: carPhoto,
        },
      });
      console.log("response", response);
      setCars(response.data);
      console.log("cars", cars);
      e.target.carNum.value = "";
      e.target.region.value = "";
      e.target.inTime.value = "";
      e.target.outTime.value = "";
      getData();
      alert("입차하였습니다!");
    }
  };
  //미납차량 조회를 위한 함수
  const handleClick = async () => {
    const response = await axios.post("/park/in");
    console.log("미납차량정보", response.data);
    setCars(response.data);
  };
  return (
    <div>
      <div className="flex-col">
        <LoginNav />

        <Input onSubmit={handleSubmit} onClick={handleClick} />
        <ParkList cars={cars} setCars={setCars} />
      </div>
    </div>
  );
}

export default MainRoute;
