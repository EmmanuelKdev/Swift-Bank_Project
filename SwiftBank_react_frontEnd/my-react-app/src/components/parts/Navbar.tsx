/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import '../css/styles.css'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

  //Interfaces
  interface UserData {
    name: string;
  }

 

function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const [userData, setUserData] = React.useState<UserData | any>([{name: 'John Doe'}]);


   

  return (
    <div className='navContainer'>
        <div className='firstNav'>

            <div className='Navlogo'>
                <h1>Logo</h1>
            </div>
            <nav>
                <ul>
                <li>
                    <Link to='/'>
                    <svg className='navIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185l0-121c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32l0 36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1l32 0 0 69.7c-.1 .9-.1 1.8-.1 2.8l0 112c0 22.1 17.9 40 40 40l16 0c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2l31.9 0 24 0c22.1 0 40-17.9 40-40l0-24 0-64c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 64 0 24c0 22.1 17.9 40 40 40l24 0 32.5 0c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1l16 0c22.1 0 40-17.9 40-40l0-16.2c.3-2.6 .5-5.3 .5-8.1l-.7-160.2 32 0z"/></svg>
                    <p>Home</p>
                    </Link>
                </li>
                <li>
                    <Link to='/about'>
                    <svg className='navIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                    <p>About</p>
                    </Link>
                </li>
                <li>
                    <Link to='/contact'>
                    <svg className='navIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                    <p>Contact</p>
                    </Link>
                </li>
                <li className='profile'>
                    <DropdownMenu >
                        <DropdownMenuTrigger className='dropdowntrigger'>
                            <Button variant='secondary'>
                            <svg className='navIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"/></svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        {!userData ? ( // Conditional rendering
                                            <div className='dropdown'>
                                                <DropdownMenuLabel>Profile</DropdownMenuLabel>
                                                <DropdownMenuItem onSelect={() => setUserData({name: 'John Doe'})}>John Doe</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => setUserData({name: 'Jane Doe'})}>Jane Doe</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onSelect={() => setUserData({name: 'Log Out'})}>Log Out</DropdownMenuItem>
                                            
                                            </div>
                                        ) : (
                                            <div className='dropdown'>
                                            
                                                <p> Not Regiterd?</p>
                                                    <Link to ='/register'>
                                                        <Button>Register</Button>
                                                    
                                                    </Link>
                                                    <div className='loginholder'>
                                                        <p>Already a Member?</p>
                                                        <Link to='/login'>
                                                            <Button>Login</Button>
                                                        </Link>
                                                    </div>
                                                

                                            </div>
                                        )}
                        
                        </DropdownMenuContent>
                    </DropdownMenu>
                
                </li>
                </ul>
            </nav>

        </div>
        
    </div>
        
      
    
  )
}

export default Navbar


