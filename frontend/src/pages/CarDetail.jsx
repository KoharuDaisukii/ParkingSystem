import axios from "axios";
import { useLoaderData } from "react-router-dom";
function CarDetail() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="text-center">
      <p>이미지</p>
      {/* <p className="text-xl">{d}</p> */}
    </div>
  );
}

export default CarDetail;

export async function loader({ requests, params }) {
  const carId = params.carId;
  const response = await axios.get("/history?carId=" + id);
  return response;
}
