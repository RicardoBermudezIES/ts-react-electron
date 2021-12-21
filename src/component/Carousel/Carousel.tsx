import React from 'react'

type Props = {
    carouselItems: string[];
    URL_BASE: string
}

export default function Carousel( {carouselItems, URL_BASE} : Props) {
    const [active, setActive] = React.useState(0);
    let scrollInterval: any = null;
  
    React.useEffect(() => {
      scrollInterval = setTimeout(() => {
        setActive((active + 1) % carouselItems.length);
      }, 1000*60*5);
      return () => clearTimeout(scrollInterval);
    },[active]);
  
    return (
      <div className="carousel">
        {carouselItems?.map((item, index) => {
          const activeClass = active === index ? ' visible' : '';
            // console.log(`${URL_BASE}/${item}`);
          return(
            <img 
                key={index} 
                className={`carousel-item${activeClass}`} 
                src={`${URL_BASE}/${item}`} 
                alt={item} 
                /> 
          )
             })}
      </div>
    );
}
