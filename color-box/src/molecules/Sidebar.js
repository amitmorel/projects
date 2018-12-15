import React, { Component } from 'react';
import styled from '@emotion/styled'
import SideProperty from '../atoms/SideProperty';

const StyledSidebar=styled.div`
  border-right:1px lightgray solid;
  padding: 0 20px;
`


class Sidebar extends Component {
  render() {
    const {stepsStart,hueStart,hueEnd,satStart,satEnd,lumStart,lumEnd,onSlideChange} = this.props
    return (
      <StyledSidebar>
        <SideProperty start={stepsStart} end={undefined} string='steps' title='Steps' min={3} max={21}  onSlideChange={onSlideChange}/>
        <SideProperty start={hueStart} end={hueEnd} string='hue' title='Hue' min={0} max={359} onSlideChange={onSlideChange}/>
        <SideProperty start={satStart} end={satEnd} string='sat' title='Saturation' min={0} max={100} onSlideChange={onSlideChange}/>
        <SideProperty start={lumStart} end={lumEnd} string='lum' title='Lumination' min={0} max={100} onSlideChange={onSlideChange}/>
      </StyledSidebar>
    );
  }
}

export default Sidebar;
