export const formatDateTime = (inputDateTime) => {
  // 주어진 날짜 문자열을 JavaScript Date 객체로 변환
  const dateObject = new Date(inputDateTime);

  // 년, 월, 일, 시간, 분 추출
  const year = dateObject.getFullYear() - 2000; // 년도에서 2000을 뺌
  const month = dateObject.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  // 형식에 맞게 문자열 반환
  const formattedDateTime = `${hours}시 ${minutes}분`;

  return formattedDateTime;
};
