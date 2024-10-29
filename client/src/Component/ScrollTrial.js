import React from 'react'
import HorizontalScroll from 'react-scroll-horizontal';
import '../style/scroll.css';
export default function ScrollTrial() {
  return (
    <div className='scroll'>
      <HorizontalScroll>
<div className='main'>
    <h1>Text Book</h1>
</div>
<div className='main'>
    <h1>Text Book</h1>
</div>
<div className='main'>
    <h1>Text Book</h1>
</div>
<div className='main'>
    <h1>Text Book</h1>
</div>
      
      </HorizontalScroll>
    </div>
  )
}
