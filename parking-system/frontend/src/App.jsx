import Header from "./components/Header";
import Input from "./components/Input";
import ParkList from "./components/ParkList";
import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";

import axios from "axios";
function App() {
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

    if (carNum !== null && carNum !== "") {
      //수파베이스 사용시
      // const { data, error } = await supabase
      //   .from("page1")
      //   .insert([
      //     {
      //       car_num: carNum,
      //       in_time: new Date(inTime),
      //       out_time: new Date(outTime),
      //       region: region,
      //       sector: sector,
      //     },
      //   ])
      //   .select();
      //axios 사용시
      const response = await axios.get("/history/", {
        admin_id: "A11111",
        car_no: carNum,
        enter_time: new Date(inTime),
        photo: "photo",
      });
      console.log(response);
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
      <Header />
      <div className="flex-col">
        <Input onSubmit={handleSubmit} onClick={handleClick} />
        <ParkList cars={cars} setCars={setCars} />
      </div>
    </div>
  );
}

export default App;
