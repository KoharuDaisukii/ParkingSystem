import { useParams } from "react-router-dom";

function CarDetail() {
  const params = useParams();
  return (
    <div className="text-center">
      <p>이미지</p>
      <p className="text-xl">{params.carId}</p>
    </div>
  );
}

export default CarDetail;
