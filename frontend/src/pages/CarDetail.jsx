import { useParams } from "react-router-dom";

function CarDetail() {
  const params = useParams();
  return (
    <div>
      <h1>CarDetail</h1>
      <p>이미지가 들어갈 자리입니다~</p>
      <p>{params.carId}</p>
    </div>
  );
}

export default CarDetail;
