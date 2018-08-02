import React from 'react';

const SeeSoon = () => (
  <div style={{ height: '50px', width: '50px', paddingTop: '5px', 
    borderRadius: '4px', backgroundColor: '#1E2D3F', float: 'left', textAlign: 'center',
  }}> 
    <span style={{ fontSize: '13px', color: 'white', padding: '4px' }}>Em breve</span>
  </div>
);

const CardLine = ({ text }) => (
  <div class="grid-item" style={{ display: 'block', height: '60px' }}>
    <SeeSoon />
    <div style={{ paddingTop: '32px' }}>
      <span style={{fontSize: '12px', color: '#000', paddingLeft: '10px', paddingBottom: '15px'}}>{text}</span>
    </div>
  </div>
);

class Rewards extends React.Component{
  render(){
    return(

      <div style={{ width: '100vw', height: '100vh',
        background: '#D8D8D8', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

      <div style={{position: 'absolute', top: '20%', left: '20px', display: 'row', width: '100%'}}>
        <span style={{alignItems: 'center', fontSize: '30px', color: '#5e0d62', paddingLeft: '10px'}}>Recompensa</span>
        <div class="grid-item" style={{}}>
          <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFLZJoUVdZlhzrZ3cNacbymPbhrdjhyRX0cCTIhM6ggBV6YJg3g'} 
          style={{ height: '50px', width: '50px', paddingTop: '5px' }}/>
          <span style={{fontSize: '14px', color: '#000', paddingLeft: '10px'}}>Uber</span>
          <span style={{fontSize: '12px', color: '#000', paddingLeft: '10px', paddingBottom: '15px'}}>Créditos nas suas corridas</span>
        </div>
        <CardLine text="Créditos no aluguel de bikes" />
        <CardLine text="Desconto de artigos esportivos" />
        <CardLine text="Créditos no aluguel de bikes" />
      </div>
      </div>
    )
}

}


export default Rewards;