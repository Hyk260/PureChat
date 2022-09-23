
const duration = 5 * 60;

const isInFiveTime = (curTime, baseTime) => Math.abs(curTime - baseTime)  <= duration;

export const addTimeDivider = (messageList, baseTime = 0) => {
    return messageList.reduce((acc, cur) => {
        const curTime =  cur.clientTime;
        // console.log(curTime, '消息时间')
        // console.log(baseTime, '比较时间')
        if(isInFiveTime(curTime, baseTime)) {
            // console.log('==========不是 Time Divider')
            return [...acc, cur]
        } else {
            // console.log('==========是 Time Divider')
            baseTime = curTime;
            return [...acc, {isTimeDivider: true, time: curTime}, cur]
        }
    }, []);
}