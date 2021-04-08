import React from "react";
import Conclusion from "../../components/Conclusion";

export const RegisterLessons = () => {

    return(
        <Conclusion 
            title="Cadastro concluído" 
            description="Tudo certo, seu cadastro foi salvo. Agora é só ficar de olho no seu WhatsApp." 
            buttonName="Acessar"
            to="/"
        />
    );
}