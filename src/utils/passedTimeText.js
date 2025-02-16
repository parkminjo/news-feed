/** 경과 시간을 계산하여 "방금 전", "몇초 전" 등으로 바꿔주는 함수 */
export const passedTimeText = (created_at) => {
  const writtenDate = new Date(created_at).getTime();

  const units = [
    { label: '일', value: 86400 },
    { label: '시간', value: 3600 },
    { label: '분', value: 60 },
    { label: '초', value: 1 }
  ];

  let passedTime = Math.trunc((Date.now() - writtenDate) / 1000); // 글 작성 시간부터 오늘 시간까지 경과된 시간(초 단위)

  if (passedTime < 1) return '방금 전';

  for (const { label, value } of units) {
    const time = Math.trunc(passedTime / value);

    if (time > 0) {
      return `${time}${label} 전`;
    }
  }
};
