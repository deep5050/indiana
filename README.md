# tasteful-api
**A RESTful API built with ExpressJS and NodeJs for fun :)**

For now it only fatches indian pincodes

allowed requests are
>root
GET http://localhost:3000/
>returns first 100 responses

GET http://localhost:3000/pincode

>fteches response based on state name

GET http://localhost:3000/pincode/state/Assam
>fteches response based on pincode

GET http://localhost:3000/pincode/pin/800001

>fteches response based on pincode range (separated by '-')

GET http://localhost:3000/pincode/pin/721444-721456


