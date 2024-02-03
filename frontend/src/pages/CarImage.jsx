import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
function CarImage() {
  const params = useParams();

  return (
    <div className="flex justify-center">
      <img
        src={`http://localhost:5173/image?id=${params.id}`}
        alt="car image"
        className="w-72 h-72"
      />
    </div>
  );
}
export default CarImage;
