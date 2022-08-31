const express = require("express");
require("dotenv").config();
const app = express()

//middlewares
app.use(express.json());

const rooms=[
  {
      name:"Normal",
      seats:200,
      amenities:"wifi,projection screen,water",
      price:1500,
      roomId:"101",
      bookingDetails:[{
          customerName:"Prasanth",
          date:new Date("2022-08-31"),
          start:"07:00",
          end:"10:00",
          status:"confirmed"
      }]
  },
  {
      name:"Premium",
      seats:150,
      amenities:"wifi,projection screen,water,AC",
      price:2500,
      roomId:"102",
      bookingDetails:[{
          customerName:"Pravin",
          date:new Date("2022-08-31"),
          start:"15:00",
          end:"17:00",
          status:"Payment Pending"
      }]
  },
  {
    name:"Royal",
    seats:250,
    amenities:"wifi,projection screen,water,AC",
    price:3500,
    roomId:"102",
    bookingDetails:[{
        customerName:"Vini",
        date:new Date("2022-08-31"),
        start:"18:00",
        end:"22:00",
        status:"Confirmed"
    }]
}
]
//create room
app.post("/createRoom",(req,res)=>{

  rooms.push({
      name:req.body.name,
      seats:req.body.seats,
      amenities:req.body.amenities,
      price:req.body.price,
      roomId:req.body.roomId,
      bookingDetails:[{}]
  })
res.send("Room Created")
})



//Book rooms
app.post("/bookRoom",(req,res,next)=>{
for(let i=0;i<rooms.length;i++)
{
  console.log("a")
  if(! (rooms[i].roomId === req.body.roomId)){
       return res.status(400).send({error:"Invalid"})
        
  }
  else
  {
      let booking={
          customerName:req.body.name,
          date:new Date(req.body.date),
          start:req.body.start,
          end:req.body.end,
          status:"confirmed"
      }
      let result=undefined;
      rooms[i].bookingDetails.forEach((book)=>{
          if(book.date.getTime() == booking.date.getTime()  && book.start === booking.start )
          {
              result=0
              console.log("in booking")                
          }
          else{
              result=1
              rooms[i].bookingDetails.push(booking)
          }
      })
      if(result)
      return res.status(200).send("Booking confirmed")
      else
      return res.status(400).send({error:"Please select different time slot"})

  }
  
}
})

//List the customers

app.get("/listCustomer",(req,res)=>{

  let customerArray=[]
  
  rooms.forEach((room)=>{
      let customerObj={roomName:room.name}
  
      room.bookingDetails.forEach((customer)=>{
          customerObj.customerName=customer.customerName
           customerObj.date=customer.date
          customerObj.start=customer.start
          customerObj.end=customer.end
  
          customerArray.push(customerObj)
      })
  })
  
  res.send(customerArray)
  
  })

//List room along with booking details

app.get("/listRooms",(req,res)=>{
  res.send(rooms)
})

  const PORT= process.env.PORT || 5000;
  app.listen(PORT, ()=>{
      console.log(`server is running on ${PORT}`)
  })