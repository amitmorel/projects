import React, { Component } from 'react';
import styled from '@emotion/styled'

const StyledSideProperty = styled.div`
  border-bottom: 2px lightgray solid;
  padding: 15px 0 20px 0;
`

const SemiTitle = styled.h4`
  margin:0;
  padding:5px;
`

const Slider = styled.input`
  &[type=range] {
    -webkit-appearance: none;
    width: 300px;
    margin: 13.8px 0;
  }
  &[type=range]:focus {
    outline: none;
  }
  &[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  &[type=range]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }

  &[type=range]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  &[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  &[type=range]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &[type=range]::-ms-fill-lower {
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &[type=range]::-ms-fill-upper {
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &[type=range]::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    height: 8.4px;
  }

  &[type=range].hue{
      background: linear-gradient(90deg,red,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
    }

    &[type=range].sat{
      background: linear-gradient(90deg,#fff,#8b37ff)
    }

    &[type=range].lum{
      background: linear-gradient(90deg,black,white)
    }


`

class SideProperty extends Component {
  onSlide(stringEnd){
    const stringStart =this.props.string
    const {onSlideChange} = this.props
    return (e) => onSlideChange(stringStart+stringEnd,e.target.value)
  }

  renderEnd(){
    const {end,string,min,max}=this.props
    return(
      <>
        <SemiTitle>End ({end})</SemiTitle>
        <Slider className={string} type="range" min={min} max={max} steps="1" value={end} onChange={this.onSlide('End')}></Slider>
      </>);
  }

  render() {
    const {start,end,string,title,min,max}=this.props

    return (
      <StyledSideProperty>
        <div className={title}>
          <h3>{title}</h3>
          <SemiTitle>Start ({start})</SemiTitle>
          <Slider className={string} type="range" min={min} max={max} steps="1" value={start} onChange={this.onSlide('Start')} ></Slider>
          {(end)? this.renderEnd():''}
        </div>
      </StyledSideProperty>
    );
  
  }
}

export default SideProperty;
