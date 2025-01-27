import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Link } from 'react-router-dom';

import '../css/user_styles.css'
import Spinner from 'react-bootstrap/Spinner';



function UserHomepage() {
  


  const userData = useAppSelector((state: RootState) => state.data.user)
  const  accounts = useAppSelector((state: RootState) => state.data.accounts)
  const isAuthenticated = useAppSelector((state: RootState) => state.data.isAuthenticated)

  return (
    <div>
       {isAuthenticated ? 
       
       <div className='user-homepage-container container-fluid'>
       <div className='card_container'>
         {accounts?
          <div className='card_info'>
             <div className="logo">
                  <img 
                    src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/Visa-Logo-PNG-Image.png" 
                    alt="Visa"
                  />
                </div>
                <div className="chip">
                  <img 
                    src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png" 
                    alt="chip"
                  />
                  <div className="number">{accounts[0].accountNumber}</div>
                </div>
                <div className='details'>

                  <div className="name">{userData?.firstName} {userData?.lastName}</div>

                  <div className='valid'>
                    <div className="from">10/19</div>
                    <div className="to">06/21</div>
                  </div>
                 

                </div>
               
                
               

          </div> : <div className='card_info'>
             <h3> Dont have a Bank Account yet? </h3>
            <Link to={"/create_account"}><button> Create Bank acount </button></Link> 
          </div>
          }
       </div>
       <div className='Account_container'>
         {accounts ? 
          <div style={{width: '100%'}}>
             {userData ? 
           <div style={{width: '100%'}}>
             <ul>
             <li><p>Amount</p><span>{accounts[0].balance} {accounts[0].currency}</span></li>
             <li><p>Status </p><span>{accounts[0].status}</span></li>
           </ul>
           </div> : <div>
             <Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
             </Spinner>
           </div>
            
            }

          </div>
           : 
          <div>
           <p> No account information </p>

          </div>
         }
        
        
       </div>
       <div className='transaction_container'>

       </div>
         
        
    
       </div> :
        <div>
         <h1> You are not authenticated </h1>
       </div>}
         
  </div>
  )
}

export default UserHomepage
