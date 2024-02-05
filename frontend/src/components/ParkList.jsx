import { formatDateTime } from "../utils/formatDateTime";
import { fareCal } from "../utils/fareCal";
import { getTimeDiffByMin } from "../utils/getTimeDiffByMin";
import { Link } from "react-router-dom";
import { regionList } from "./regionList";
import { putData } from "../utils/putData";
import { formatToISO8601 } from "../utils/convertISO";
import React, { useEffect, useState } from "react";
import axios from "axios";
function ParkList() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const handleExit = async (carId) => {
    if (cars.some((car) => car.id === carId && car.exit_time === null)) {
      await putData(carId, formatToISO8601(new Date()));
      alert(formatToISO8601(new Date()));
    }
    await getData(); // Update data after exit
  };

  async function getData() {
    try {
      const response = await axios.get("/history/all");
      console.log(response);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="flex justify-center">
      <hr />
      <table className="border-separate border-spacing-2 border border-slate-500 my-2">
        <thead>
          <tr>
            <th className="border border-slate-600">차량번호</th>
            <th className="border border-slate-600">사진</th>
            <th className="border border-slate-600">입차시간</th>
            <th className="border border-slate-600">출차시간</th>
            <th className="border border-slate-600">총 주차시간(분)</th>
            <th className="border border-slate-600">주차비</th>
          </tr>
        </thead>
        <tbody>
          {/* // 오류 해결해야함 */}
          {cars.map((car) => (
            <tr key={car.id}>
              <th className="border border-slate-700">
                <Link to={`car/${car.car_no}`}>
                  <span>
                    {car.car_region_no !== 0
                      ? regionList[car.car_region_no]
                      : ""}
                  </span>{" "}
                  {car.car_no}
                </Link>
              </th>
              <th className="border border-slate-700">
                <Link to={`car/${car.id}/image`}>
                  <img
                    src={`http://localhost:5173/image?id=${car.id}`}
                    alt="car image"
                    width="50px"
                    height="50px"
                  />
                </Link>
              </th>

              {/* <th className="border border-slate-700">{car.photo}</th> */}
              <th className="border border-slate-700">
                {formatDateTime(car.enter_time)}
              </th>
              <th className="border border-slate-700">
                {car.exit_time === null ? (
                  <button
                    className="bg-red-400 hover:opacity-85 rounded-lg p-4"
                    onClick={() => handleExit(car.id)}
                  >
                    출차
                  </button>
                ) : (
                  formatDateTime(car.exit_time)
                )}
              </th>
              <th className="border border-slate-700">
                {car.exit_time !== null &&
                (getTimeDiffByMin(car.exit_time, car.enter_time) >= 1 ||
                  getTimeDiffByMin(car.exit_time, car.enter_time) <= -1)
                  ? Math.abs(getTimeDiffByMin(car.exit_time, car.enter_time)) +
                    "분"
                  : ""}
              </th>
              <th className="border border-slate-700 bg-green-200">
                {car.exit_time === null
                  ? fareCal(
                      Math.abs(getTimeDiffByMin(new Date(), car.enter_time)) -
                        30 * 500
                    )
                  : fareCal(
                      Math.abs(getTimeDiffByMin(car.exit_time, car.enter_time))
                    )}
                원
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParkList;
