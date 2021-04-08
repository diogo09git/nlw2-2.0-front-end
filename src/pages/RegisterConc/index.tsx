import React from "react";
import Conclusion from "../../components/Conclusion";

export const RegisterConc = () => {

    return(
        <Conclusion 
            title="Cadastro concluído" 
            description="Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência." 
            buttonName="Login"
            to="/login"
        />
    );
}