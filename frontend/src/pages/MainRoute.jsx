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

    //폼데이터 정의
    const formData = new FormData(e.target);

    //빈칸일 수 있는 inTime과 region에 대한 처리
    const inTime = formData.has("inTime") ? formData.get("inTime") : new Date();
    formData.set("inTime", inTime);
    const region = formData.has("region") ? formData.get("region") : null;
    formData.set("region", region);

    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // const carNum = e.target.carNum.value;
    // const inTime = e.target.inTime.value || new Date(); //빈 칸인 경우 현재 시간으로 대체
    // const outTime = e.target.outTime.value;
    // const region = e.target.region.value || null;
    // const sector = e.target.sector.value;

    //파일 업로드를 위한 코드
    const carPhoto = e.target.carPhoto.files[0];

    // console.log(carPhoto);
    if (data.carNum !== null && data.carNum !== "") {
      const response = await axios({
        method: "post",
        url: "park/in",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          admin_id: "A11111",
          park_area: 1,
          park_spot: 1,
          car_region_name: data.region,
          car_no: data.carNum,
          enter_time: "2024-02-02T13:52:52",
          photo: carPhoto,
        },
      });
      console.log("response", response);
      setCars(response.data);
      console.log("cars", cars);
      //form 초기화
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
