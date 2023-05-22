
export const dropTime = (time: { min: number; sec: number; }) => {
  const timeGame = time;
    if (timeGame.min > 0) {
      if (timeGame.sec > 0) {
        timeGame.sec = timeGame.sec - 1
      } else if (timeGame.sec === 0) {
        timeGame.min = timeGame.min - 1
        timeGame.sec = 59
      }
    } else if (timeGame.min === 0) {
      if (timeGame.sec > 0) {
        timeGame.sec = timeGame.sec - 1
      } else if (timeGame.sec === 0) {
        timeGame.min = 0
        timeGame.sec = 0
      }
    }
    return timeGame;
}
