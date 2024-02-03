import { regionList } from "./regionList";
import { sectorList } from "./sectorList";
function Input({ onSubmit, onClick }) {
  return (
    <div className="inputConainer flex justify-center">
      <form
        className="inputForm flex-col"
        action="/save"
        onSubmit={onSubmit}
        encType="multipart/form-data"
        accept_charset="UTF-8"
      >
        <div className="carInfo my-3 text-center">
          <input
            type="text"
            name="carNum"
            placeholder="차량번호"
            className="inputCarNum w-80 h-14"
          />
          <div className="selectContainer flex justify-around my-2">
            <select name="sector" id="sector" className="w-36">
              {sectorList.map((sectorItem, index) => (
                <option value={sectorItem} key={index}>
                  {sectorItem}
                </option>
              ))}
            </select>
            <select name="region" id="region" className="mx-1 w-36">
              {regionList.map((regionItem, index) => (
                <option value={regionItem} key={index}>
                  {regionItem}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <input
            type="file"
            name="carPhoto"
            className="my-3 text-center"
            accept=".png, .jpeg, .jpg"
          />
        </div>
        <div className="carData text-xs flex-col justify-center items-center">
          <div className="flex mb-3 justify-around items-center">
            <div>
              <label htmlFor="inTime" className="mr-1 font-bold">
                입차
              </label>
              <input
                type="datetime-local"
                name="inTime"
                className="font-bold"
                placeholder="입차시간"
              />
            </div>
            <div>
              <label htmlFor="outTime">출차</label>
              <input
                type="datetime-local"
                name="outTime"
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

            <button className="bg-green-400 hover:bg-green-500 h-20 w-20 rounded-3xl">
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
