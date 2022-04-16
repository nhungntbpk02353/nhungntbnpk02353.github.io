class User {
    constructor(name, username, password, email, roles) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email
        this.role = roles;
    }
    getUsername() {
        return this.username;
    }
    getpassword() {
        return this.password;
    }
    getRole(){
        return this.role    
    }
    xuatthongtin() {
        console.log(`Name: ${this.name}`);
        console.log(`Username: ${this.username}`);
        console.log(`Password: ${this.password}`);
        console.log(`Roles: ${this.role}`);
    }
}
//new store
class Storeusers {
    constructor() {
        this.users = []
    }
    addUser(user) {
        // this.users.push(user)
        const currenList = this.users
        let flag = false
        for (let i = 0; i < currenList.length; i++) {
            const currenUser = currenList[i]
            if (currenUser.getUsername() === user.getUsername()) {
                return flag
            }
        }
        if (!flag) {
            flag = true
            this.users.push(user)
        }
        return flag
    }

    login(username, password) {
        const currenList = this.users
        for (let i = 0; i < currenList.length; i++) {
            const currenUser = currenList[i]
            if (currenUser.getUsername() === username &&
                currenUser.getpassword() === password) {
                return currenUser
            }
        }
        return null
    }
    getUserList() {
        return this.users
    }
    save(){
        const data=JSON.stringify(this.users)
        localStorage.setItem('users',data)
    }
    getdata () {
       const data= localStorage.getItem('users')
       if (data){
           const arrUser = JSON.parse(data)
           const listUser=[]
           for(let i=0;i<arrUser.length;i++){
               const UserTemp = new User(arrUser[i].
                name, arrUser[i].username,arrUser[i].
                password,arrUser[i].email,arrUser[i].
                roles)
                listUser.push(UserTemp);
           }
           this.users = listUser
       } 
    }
}
//handle UI
const store = new Storeusers()
store.getdata()
console.log(store)
document.getElementById('frmDangKy') &&document.getElementById('frmDangKy').addEventListener('submit',function(event){
    event.preventDefault();
    const name =document.getElementById('name').value;
    const username =document.getElementById('username').value;
    const email =document.getElementById('email').value;
    const password =document.getElementById('password').value;
    const Roles =document.getElementById('role').value;
    document.getElementById('error-name').innerHTML = ''
    document.getElementById('error-userName').innerHTML = ''
    document.getElementById('error-email').innerHTML = ''
    document.getElementById('error-password').innerHTML = ''
    if(name ==''){
      document.getElementById('error-name').innerHTML = 'Name không được để trống'
    } if(username==''){
      document.getElementById('error-userName').innerHTML = 'userName không được để trống'
    } if(password==''){
      document.getElementById('error-password').innerHTML = 'Password không được để trống'
    } if(email==''){
      document.getElementById('error-email').innerHTML = 'Email không được để trống'
    }  // alert('Vui lòng nhập thông tin')
      else{
            const createUser= new User(name,username,password,email,Roles);
            const ischeck =store.addUser(createUser);
            if(ischeck){
                store.save()
                //alert('đăng kí thành công')
                 window.location="./dangnhap.html"    
        }
        //  console.log(store.getUserList())
        }
})

document.getElementById('frmLogin') && document.getElementById('frmLogin').addEventListener('submit', function (event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if (username == '' || password == '') {
        alert('Nhập đầy đủ thông tin')
    }
    else{
        const isLogin=store.login(username,password)
        //
        if(isLogin){
            alert('đăng nhập thành công')
            console.log(isLogin)
            if(isLogin.getRole()=='admin'){
                window.location="./admin.html"
            }else{
                window.location="./admin.html"
            }           
        }else{
            alert('Sai thông tin')
        }
     console.log('login',isLogin)
    }
    })