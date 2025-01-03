"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import picOne from "@/assets/images/herocarasel (2).jpg";
import picTwo from "@/assets/images/herocarasel (1).png";
import picThree from "@/assets/images/herocarasel (3).jpg";
import picFour from "@/assets/images/herocarasel (4).jpg";


function Front_page() {
  return (
    <div>
      <div className="MainContainerFront">
        <div className="HeroSection">
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
      </div>
    </div>
  );
}

export default Front_page;
