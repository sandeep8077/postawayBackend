import CustomErrorHandler from "../../../ErrorHandlers/CustomError.handler.js";

export default class UsersModule{
    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email =  email;
        this.password = password

    }
    static getUsers(){
        return users;
    }
    static addUser({name,email,password}){
        if( !name || !email || !password){
            throw new CustomErrorHandler(400,'Invaid users details');
        } 

        const user = new UsersModule(Date.now(),name,email,password)
        users.push(user);
        return user;


    }

    static login(userObj){
        const {email,password} = userObj;
        const user = users.find(user => user.email ==email && user.password == password);

        if(!user){
            throw new CustomErrorHandler('invalid credentials',401);
        }
        return user;

    }
  
}

let users = [ new UsersModule(1,'Sandeep kumar','sk555@gmail.com','1234'),
    new UsersModule(2,'Abhay kumar','abhay555@gmail.com','1234'),
    new UsersModule(3,'Surya kumar','surya555@gmail.com','1234'),
    
    
]