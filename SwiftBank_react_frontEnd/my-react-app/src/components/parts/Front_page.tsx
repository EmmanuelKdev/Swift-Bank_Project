"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import picOne from "@/assets/images/herocarasel (2).jpg";
import picTwo from "@/assets/images/herocarasel (1).png";
import picThree from "@/assets/images/herocarasel (3).jpg";
import picFour from "@/assets/images/herocarasel (4).jpg";
import healthInsurance from "@/assets/images/healthInsurance2.jpg";
import payment from "@/assets/images/payments.jpg";
import goldmember from "@/assets/images/goldmember.jpg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  
} from "../ui/navigation-menu";
import { cn } from '@/lib/utils';
import React from "react";

// Define the type for component items
interface ComponentItem {
  title: string;
  href: string;
  description: string;
}



  // List of components
const components: ComponentItem[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

 // Props for ListItem
 interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  children: React.ReactNode;
}

  const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
      ({ className, title, children, ...props }, ref) => {
        return (
          <li>
            <NavigationMenuLink asChild>
              <a
                ref={ref}
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  className
                )}
                {...props}
              >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
                </p>
              </a>
            </NavigationMenuLink>
          </li>
        );
      }
    );
    ListItem.displayName = "ListItem";


function Front_page() {
  return (
    <div>
      <div className="MainContainerFront">
        <div className="HeroSection">
        <div className='secondNav'>
        <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium">Getting started</div>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
      </NavigationMenuList>
    </NavigationMenu>
               
       </div>
          <div className="caraousel">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 6000, // Time in milliseconds between slides
                  stopOnInteraction: false, // Keep autoplay running after interaction
                  stopOnMouseEnter: true, // Pause autoplay on hover
                }),
              ]}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="item">
                    <img className="heropic" src={picFour} alt="picOne" />
                    <div className="itemText">
                      <h2>Heading One</h2>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nulla nec purus feugiat, molestie ipsum et, ultricies
                          mauris. Etiam id metus et felis finibus luctus. Donec
                          nec nunc vel ex ultrices.
                        </p>
                      </div>
                      <button className="herobutton">
                        Read More
                      </button>

                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="item">
                  <img className="heropic" src={picTwo} alt="picTwo" />
                    <div className="itemText">
                      <h2>Heading One</h2>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nulla nec purus feugiat, molestie ipsum et, ultricies
                          mauris. Etiam id metus et felis finibus luctus. Donec
                          nec nunc vel ex ultrices.
                        </p>
                      </div>
                      <button className="herobutton">
                        Read More
                      </button>

                    </div>                   
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="item">
                  <img className="heropic" src={picThree} alt="pic3" />
                    <div className="itemText">
                      <h2>Heading One</h2>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nulla nec purus feugiat, molestie ipsum et, ultricies
                          mauris. Etiam id metus et felis finibus luctus. Donec
                          nec nunc vel ex ultrices.
                        </p>
                      </div>
                      <button className="herobutton">
                        Read More
                      </button>

                    </div>     
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="item">
                  <img className="heropic" src={picOne} alt="pic5" />
                    <div className="itemText">
                      <h2>Heading One</h2>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nulla nec purus feugiat, molestie ipsum et, ultricies
                          mauris. Etiam id metus et felis finibus luctus. Donec
                          nec nunc vel ex ultrices.
                        </p>
                      </div>
                      <button className="herobutton">
                        Read More
                      </button>

                    </div>     
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div className="bodysection">
          <Card>
            <div className="main_cardbody">
              <div className="card_image">
               
                <div className="picbox">
                 <img className="displaypicture" src={healthInsurance} alt="picOne" />

                </div>           
               
              </div>
              <div className="card_text">
                <div className="tittle">
                  <h2>Health insurance that meets your needs.</h2>
                </div>
                <div className="card_description">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                    nec purus feugiat, molestie ipsum et, ultricies mauris. Etiam
                    id metus et felis finibus luctus. Donec nec nunc vel ex
                    ultrices.
                  </p>
                </div>
                <div className="card_button">
                  <button className="cardbtn">Read More</button>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="main_cardbody">
              <div className="card_image">
                
                <div className="picbox">
                 <img className="displaypicture" src={payment} alt="picOne" />

                </div>           
               
              </div>
              <div className="card_text">
                <div className="tittle">
                  <h2>Pay or request money with Swift payment.</h2>
                </div>
                <div className="card_description">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                    nec purus feugiat, molestie ipsum et, ultricies mauris. Etiam
                    id metus et felis finibus luctus. Donec nec nunc vel ex
                    ultrices.
                  </p>
                </div>
                <div className="card_button">
                  <button className="cardbtn">Read More</button>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="main_cardbody">
              <div className="card_image">
                
                <div className="picbox">
                 <img className="displaypicture" src={goldmember} alt="picOne" />

                </div>           
               
              </div>
              <div className="card_text">
                <div className="tittle">
                  <h2>More benefits as a Gold customer.</h2>
                </div>
                <div className="card_description">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                    nec purus feugiat, molestie ipsum et, ultricies mauris. Etiam
                    id metus et felis finibus luctus. Donec nec nunc vel ex
                    ultrices.
                  </p>
                </div>
                <div className="card_button">
                  <button className="cardbtn">Read More</button>
                </div>
              </div>
            </div>
          </Card>
          
            <div className="tableHolder">
              <Card>
                <div className="tableContainer">
                  <h2>SWIFT's banking services</h2>
                  <ul className="table">
                    <li> <p>Become Swift's Customer</p> <span>Go</span></li>
                    <li> <p>Become Swift's corporate customer</p> <span>Go</span></li>
                    <li> <p>Owner-customer benefits</p> <span>Go</span></li>
                    <li> <p>Savings Calculator</p> <span>Go</span></li>
                  </ul>
                </div>
                
              </Card>

             
              <Card>
                <div className="tableContainer">
                  <h2>SWIFT's Insurance services</h2>
                    <ul className="table">
                      <li> <p>Insurance for private Customers</p> <span>Go</span></li>
                      <li> <p>Insurance for corporate customers</p> <span>Go</span></li>
                      <li> <p>Request an offer for several insurance products</p> <span>Go</span></li>
                      <li> <p>Did you encounter a Loss? Claim Help</p> <span>Go</span></li>
                    </ul>
                </div>

              </Card>
             
              <Card>
                <div className="tableContainer">
                  <h2>Whats New</h2>
                    <ul className="table">
                      <li> <p>Banking app Comming Soon</p> <span>Go</span></li>
                      <li> <p>Upgrade to Investing System</p> <span>Go</span></li>
                      <li> <p>Flexible Loans</p> <span>Go</span></li>
                      <li> <p>Savings Calculator</p> <span>Go</span></li>
                    </ul>
                </div>

              </Card>
             

            </div>
            
          

        </div>
        <footer>
          <div className="footer">
            <div className="searchbar">
              <input type="text" placeholder="Search" />
              <button><svg className="searchIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></button>
            </div>
            <div className="footerText">
              <p>SWIFT BANK</p>
              <p>© 2025 Swift Bank. All rights reserved.</p>
            </div>
            <div className="footerLinks">
              <ul>
                <li>Privacy Policy</li>
                <li>Terms and Conditions</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Front_page;
