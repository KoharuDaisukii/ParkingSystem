import axios from "axios";
import { useLoaderData } from "react-router-dom";
import RenderCarDetail from "../components/RenderCarDetail";
function CarDetail() {
  const data = useLoaderData();
  console.log(data);
  return <RenderCarDetail item={data} />;
}

export default CarDetail;

export async function loader({ requests, params }) {
  const id = params.car_no;
  const response = await axios.get("/history?car_no=" + id);
  return response;
}
