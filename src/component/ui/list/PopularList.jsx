import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopularListItem from "./PopularListItem";
import styled from "styled-components";

const Wrapper = styled.div`
    margin 5% auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .slick-prev:before{
        opaicty: 1;
        color: black;
        left: 0;
    }
    .slick-next:before{
        opacity: 1;
        color: black;
    }
    
`
const StyledSlider = styled(Slider)`
    width: 80%;
`

export default function PopularList(props) {
    const { PopularPosts, onClickItem } = props; // props에서 PopularPosts와 onClickItem 추출
    const settings = {
        dots: true,
        infinite: true,
        arrow: true,
        speed: 1000,
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 2000,
        SlidesToScroll: 1,

        responsive: [ // 해상도마다 보여질 개수 설정
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    };
    return (
        <Wrapper>
            <StyledSlider {...settings}>
                {PopularPosts.map((post) => {
                    return (
                        <PopularListItem
                            key={post.id}
                            post={post}
                            onClick={onClickItem}
                        />
                    )
                })}
            </StyledSlider>
        </Wrapper>
    );
}