import { regionList } from "./regionList";
import { sectorList } from "./sectorList";
function Input({ onSubmit, onClick }) {
  return (
    <div className="inputConainer flex justify-center">
      <form className="inputForm" onSubmit={onSubmit}>
        <div className="carInfo my-3">
          <select name="sector" id="sector">
            {sectorList.map((sectorItem, index) => (
              <option value={sectorItem} key={index}>
                {sectorItem}
              </option>
            ))}
          </select>
          <select name="region" id="region" className="mx-1">
            {regionList.map((regionItem, index) => (
              <option value={regionItem} key={index}>
                {regionItem}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="carNum"
            placeholder="차량번호"
            className="mx-2"
          />
        </div>
        <div className="carData text-xs flex-col justify-center items-center">
          <div className="flex-col my-1 text-center">
            <div className="my-2">
              <label htmlFor="inTime">입차시간</label>
              <input
                type="datetime-local"
                name="inTime"
                id=""
                className="font-bold"
                placeholder="입차시간"
              />
            </div>
            <div>
              <label htmlFor="outTime">출차시간</label>
              <input
                type="datetime-local"
                name="outTime"
                id=""
                className="font-bold"
                placeholder="출차시간"
              />
            </div>
            <hr className="my-2" />
          </div>
          <div className="btnContainer flex justify-around">
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 h-20 w-20 rounded-3xl mr-2"
            >
              <span className="text-xl font-bold">입차</span>
            </button>
            <button className="bg-red-400 hover:bg-red-500 h-20 w-20 rounded-3xl mr-2">
              <span className="text-xl font-bold">출차</span>
            </button>
            <button className="bg-green-400 hover:bg-green-500 h-20 w-20 rounded-3xl mr-2">
              <span className="text-xl font-bold">조회</span>
            </button>
            <button
              onClick={onClick}
              className="bg-orange-400 hover:bg-orange-500 h-20 w-20 rounded-3xl"
            >
              <span className="text-xl font-bold">미납조회</span>
            </button>
          </div>

          {/* 현재 출차는 장식 버튼 */}
        </div>
      </form>
    </div>
  );
}

export default Input;
