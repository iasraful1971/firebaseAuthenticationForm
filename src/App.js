import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import './App.css';
import myAuthenticationInitialization from './Firebase/firebase.initialize';
import logo from './Firebase/monst-logo.svg';
import contact from './Firebase/undraw_Access_account_re_8spm.svg';
myAuthenticationInitialization();


//providers
const GoogleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function App() {
  //states
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [err ,setErr] = useState('');
  const [emailErr , SetEmailErr] =useState('');
  const [isLogging , setIsLogging] = useState(false);
  const [user , setUser] = useState({});

  //const [err ,setErr] = useState()
  const auth = getAuth();
//handle google button
const handlegooglebtn = () =>{
  signInWithPopup(auth, GoogleProvider)
  .then(result => {
    const {displayName , photoURL ,email} =result.user;
    const loggedUser ={
      name: displayName,
      email: email,
      photo: photoURL
    }
    setUser(loggedUser)
  })
  .catch((result) => {
    console.log(result.message);
  })
}
// handle facebook  
const handlefacebook =()=> {
  signInWithPopup(auth, facebookProvider)
  .then(result => {
   
    const {displayName , photoURL ,email} =result.user;
    const loggedUser ={
      name: displayName,
      email: email,
      photo: photoURL
    }
    setUser(loggedUser)
  })
  .catch(err => {
    console.log(err.message);
  })
}

//handle form 
const handleRegistraionwithpageLoad = (e)=> {
  e.preventDefault();
  if(password.length < 6){
    setErr('password should be minimum  6 characters')
    return;
  }

isLogging? processLogIn(email , password) : createNewUser(email , password);

}

const processLogIn =(email , password) => {
        signInWithEmailAndPassword(auth , email , password)
        .then(result =>{
          const user =result.user;
          console.log(user);
          SetEmailErr(' ')
        })
        .catch(error => {
          SetEmailErr("couldn't find this email")
        })
}
const createNewUser = (email , password) =>{
  createUserWithEmailAndPassword(auth, email, password)
  .then(result =>{
   const user =result.user;
   console.log(user);

   setErr('');
   SetEmailErr('');
   emailVarify();
  
  })
  .catch((error) => {
    SetEmailErr('email has already used try with another')
  })
}

//verification email 

const emailVarify =() => {
  sendEmailVerification(auth.currentUser)
  .then(() => { })
}

//toogle log in 
const toggleLogIn =(e) => {
    setIsLogging(e.target.checked);
}
//handle email change
const handleEmailChange =(e) => {
  
       setEmail(e.target.value);
}
//password 
const handlePasswordChange =(e) => {
      setPassword(e.target.value);
}
//reset pass 
const handleReset =() => {
  sendPasswordResetEmail(auth , email)
  .then(() => { })
  .catch(err => {
    console.log(err.message);
  })
}
  return (
    <div className="App">
      <div className="header">
        <div>
        <img style={{width:'96px'}} src={logo} alt="" />
        </div>
        <div>
            <ul>
              <li>get in touch with us</li>
              <li>meet our mentors</li>
              <li>manage inventory</li>
            </ul>
        </div>
          <div>
              {
                user.name &&
                 <div style={{color:'black'}}><span style={{color:'#111' ,fontWeight:'bold'}}>welcome : {user.name}</span>
                  <img style={{borderRadius:'50%' ,padding:'0 10px'}} src={user.photo} alt="" />
                 </div>
                 
                
                }
          </div>
       
        </div>
          <div className="header-text pt-5">
                <button className="contact mt-5 pt-0">contact us</button>
              <h2>We will <span> be glad </span> to hear <br /> from you!</h2>
          </div>
          <div className="contact-us py-2">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <h2 style={{textAlign:'center' , color: 'purple' , fontWeight:'bold' , padding:'10px 0'}}>{isLogging ? 'Log in Please' : 'Registation now'}</h2> 


                    <form onSubmit={handleRegistraionwithpageLoad}>
                        {isLogging? <p></p>:  <div className="name d-flex">
                            <input placeholder="your first name" type="text" />
                            <input placeholder="your last name" type="text" />
                        </div>}
                          <div className="email-pass">
                          <input onBlur={handleEmailChange} required placeholder="Your email" type="email" />
                          <p style={{color: 'red' ,paddingLeft:'20px'}}>{emailErr}</p>
                          <input onBlur={handlePasswordChange} required placeholder="your password" type="password" />
                          {isLogging? <u onClick={handleReset} style={{textAlign:"right"}}>forgot password ? </u>: <p></p>}
                            <p style={{color: 'red' ,paddingLeft:'20px'}}>{err}</p>
                          </div>
                            <input  onChange={toggleLogIn} type="checkbox" name="" id="" /> Already registered? 
                         <div className="text-center"><input type="submit" value={isLogging? 'Log in' :'Register'} /></div>
                         </form> 


                         <hr />
                         <div className="d-flex py-3">
                           <div>
                             <button onClick={handlegooglebtn} className="google">continue with google</button>
                           </div>
                           <div>
                           <button onClick={handlefacebook} className="fb">sign up with facebook</button>
                           </div>
                         </div>

                 
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <img style={{width:'500px'}} src={contact} alt="" />
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default App;
