import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
function CarImage() {
  const params = useParams();
  //   const data = useLoaderData();
  //   console.log("data", data);
  return <img src={`http://localhost:5173/image?id=${params.id}`} />;
}
export default CarImage;

export async function loader({ requests, params }) {
  const id = params.id;
  const response = await axios.get("/image?id=" + id);
  return response;
}
