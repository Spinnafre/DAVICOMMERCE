import React from 'react'

function CheckSteps(props){
    return(
        <div className="Check-Steps">
            <div className={props.step1?"active":"desactive"}>Entrar</div>
            <div className={props.step2?"active":"desactive"}>Compra</div>
            <div className={props.step3?"active":"desactive"}>Pagamento</div>
            <div className={props.step4?"active":"desactive"}>Encomenda</div>
        </div>
    )
}

export default CheckSteps