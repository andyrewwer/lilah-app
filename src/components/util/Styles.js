export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -55%)',
      maxWidth: '400px',
      maxHeight: '80vh'
    }
};

export const convertIntToTime = (time) => {
  let minutes = parseInt(time / 60);
  let seconds = parseInt(time % 60);
  if (seconds / 10 < 1) {
    seconds = '0' + seconds
  }
  return minutes + ':' + seconds;
}
