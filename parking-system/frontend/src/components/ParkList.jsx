import { formatDateTime } from "../utils/formatDateTime";
import { fareCal } from "../utils/fareCal";
import { getTimeDiffByMin } from "../utils/getTimeDiffByMin";
function ParkList({ cars }) {
  return (
    <div className="flex justify-center">
      <hr />
      <table className="border-separate border-spacing-2 border border-slate-500 my-2">
        <thead>
          <tr>
            <th className="border border-slate-600">차량번호</th>
            <th className="border border-slate-600">지역명</th>
            <th className="border border-slate-600">입차시간</th>
            <th className="border border-slate-600">출차시간</th>
            <th className="border border-slate-600">총 주차시간(분)</th>
            <th className="border border-slate-600">주차비</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <th className="border border-slate-700">{car.car_no}</th>
              <th className="border border-slate-700">{car.region}</th>
              <th className="border border-slate-700">
                {formatDateTime(car.enter_time)}
              </th>
              <th className="border border-slate-700">
                {car.exit_time !== null
                  ? formatDateTime(car.exit_time)
                  : "미출차"}
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
      {/* <ul className="text-xs">
        {cars.map((car) => (
          <li key={car.id} className="flex my-1">
            <div className="carNum font-bold mx-1">차량번호: {car.car_num}</div>
            <div className="inTime mx-1">
              입차: {formatDateTime(car.enter_time)}
            </div>
            <div className="outTime">출차: {formatDateTime(car.exit_time)}</div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ParkList;
