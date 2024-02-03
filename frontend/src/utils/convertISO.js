export const formatToISO8601 = (date) => {
  // date가 유효한 Date 객체인지 확인
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid Date");
  }

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  // ISO 8601 형식의 문자열로 변환
  const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return isoString;
};
