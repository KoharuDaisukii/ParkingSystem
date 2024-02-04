import { formatDateTime } from "../utils/formatDateTime";
import { fareCal } from "../utils/fareCal";
import { getTimeDiffByMin } from "../utils/getTimeDiffByMin";
import { Link } from "react-router-dom";
import { regionList } from "./regionList";

function ParkList({ cars }) {
  return (
    <div className="flex justify-center">
      <hr />
      <table className="border-separate border-spacing-2 border border-slate-500 my-2">
        <thead>
          <tr>
            <th className="border border-slate-600">차량번호</th>
            <th className="border border-slate-600">사진</th>
            <th className="border border-slate-600">지역명</th>
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
                <Link to={`car/${car.car_no}`}>{car.car_no}</Link>
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
                <span>
                  {car.car_region_nocar_region_no !== 0
                    ? regionList[car.car_region_no]
                    : ""}
                </span>
              </th>
              <th className="border border-slate-700">
                {formatDateTime(car.enter_time)}
              </th>
              <th className="border border-slate-700">
                {car.exit_time !== null ? (
                  formatDateTime(car.exit_time)
                ) : (
                  <button
                    className="bg-red-400 hover:opacity-85 rounded-lg p-4"
                    onClick={() => {
                      alert(`${formatDateTime(new Date())} 출차되었습니다!`);
                      //출차로직
                    }}
                  >
                    출차
                  </button>
                )}
              </th>
              <th className="border border-slate-700">
                {getTimeDiffByMin(car.exit_time, car.enter_time) >= 1
                  ? getTimeDiffByMin(car.exit_time, car.enter_time) + "분"
                  : ""}
              </th>
              <th className="border border-slate-700 bg-green-200">
                {fareCal(getTimeDiffByMin(car.exit_time, car.enter_time))}원
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParkList;
