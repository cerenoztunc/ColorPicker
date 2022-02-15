const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http); //real time işlemleri yapmada kolaylık sağlar
const cors = require('cors');

app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello');
});

let lastColor = '#282c34';

io.on('connection', (socket)=>{
    console.log('bir kullanıcı bağlandı!');
    socket.emit('receive',lastColor);

    socket.on('newColor',(color)=>{
        console.log(color);

        lastColor= color;
        // socket.broadcast.emit('receive',color); 
        //broadcast, bağlı olan client haricindeki diğer tüm client'lara bu veriyi ilet demektir..
        //bu yüzden aşağıdakinin kullanılması daha uygundur..
        io.emit("receive",color); //böylelikle hiçbir kullanıcının sayfayı yenilemesine gerek kalmadan değişiklik gerçekleşecek..

    });

    socket.on('disconnect',()=>{
        console.log('bir kullanıcı aayrıldı!');
    });
});

http.listen(3001,()=>console.log('Server is up'));