export default function funnyTimeResponse(time){
    const responses=[`${time} — perfect time to grab a coffee or dance like nobody's watching.`,`According to my circuits, it’s ${time}. Time flies when you’re having fun!`,`Ah, ${time}. A great moment to pretend you're busy.`]
    return responses[Math.floor(Math.random()*responses.length)]
}