export const timeStamp = () => {
  let now = new Date();
  let date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
  let time = [now.getHours(), now.getMinutes(), now.getSeconds()];
  let suffix = time[0] < 12 ? 'AM' : 'PM';
  time[0] = time[0] < 12 ? time[0] : time[0] - 12;
  time[0] = time[0] || 12;
  for (let i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = '0' + time[i];
    }
  }
  return date.join('-') + time.join('-') + suffix;
};
