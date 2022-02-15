//backend ile bağlantı işlemleri burada yapılıyorr..

import io from "socket.io-client";

let socket;

export const init = () => {
    console.log("Sunucuya bağlanılıyor..")

    socket = io('http://localhost:3001',{
        transports:["websocket"]
    });

    socket.on('connect',() => console.log("SUnucuya bağlantı başarıyla gerçekleşti.")); //connect kanalını dinledik..
};

export const send = (color) =>{
    socket.emit('newColor',color); //newColor kanalına elimizdeki önyüzden seçilen color'ı gönderdik. 
    //buradaki newColor ismi backend altındaki app.js içindeki ile aynı olmalıdır ki kanal kurulsun..
};

export const subscribe = (cb) => { //kanala abone olmak için bir fonksiyon
    socket.on('receive', (color)=>{ //backend'te bu receive ismiyle emmit işlemi yapıldığından burda kanalı receive ile dinledik..
        console.log(color);
        cb(color); //App.js içinde bulunan subscribe metoduyla gönderilen callback fonskiyonunu kullandık...
    });
};