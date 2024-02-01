export const fareCal = (parkingDurationMinutes) => {
  // 무료 30분
  const freeDuration = 30;

  // 10분당 500원의 요금
  const feePer10Minutes = 500;

  // 무료 시간 이후의 주차 시간 계산
  const billableDuration = Math.max(parkingDurationMinutes - freeDuration, 0);

  // 10분 단위로 계산된 추가 요금
  const additionalFee = Math.ceil(billableDuration / 10) * feePer10Minutes;

  return additionalFee.toLocaleString();
};
