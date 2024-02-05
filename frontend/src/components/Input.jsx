import { useState } from "react";
import { regionList } from "./regionList";
import { spaceList } from "./spaceList";
import { spotList } from "./spotList";
function Input({ onSubmit, onClick, onChange }) {
  return (
    <div className="inputConainer flex justify-center">
      <form
        className="inputForm flex-col"
        onSubmit={onSubmit}
        encType="multipart/form-data"
        accept_charset="UTF-8"
      >
        <div className="carInfo my-3 text-center">
          <input
            type="text"
            name="car_no"
            placeholder="차량번호"
            className="inputCarNum w-80 h-14"
            required
          />
          <div className="selectContainer flex justify-around my-2">
            <select
              name="park_area"
              id="park_area"
              className="w-36 mr-2"
              required
            >
              {spaceList.map((sectorItem, index) => (
                <option value={sectorItem} key={index}>
                  {sectorItem}
                </option>
              ))}
            </select>
            <select name="park_spot" id="park_spot" className="w-36" required>
              {spotList.map((spot, index) => (
                <option value={spot} key={index}>
                  {spot}
                </option>
              ))}
            </select>
            <select
              name="car_region_name"
              id="car_region_name"
              className="mx-1 w-36"
              required
            >
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
            name="photo"
            className="my-3 text-center"
            accept=".png, .jpeg, .jpg"
            onChange={onChange}
            required
          />
        </div>
        <div className="carData text-xs flex-col justify-center items-center">
          {/* <div className="flex mb-3 justify-around items-center"> */}
          {/* <div>
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
          </div> */}
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
              type="button"
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
