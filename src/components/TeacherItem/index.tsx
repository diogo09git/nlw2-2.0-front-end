import React from 'react';
import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import user from '../../assets/images/images.png';

import './styles.css';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        });
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={user} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}
            Entusiasta das melhores tecnologias de química avançada.
            Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências.
            Mais de 200.000 pessoas já passaram por uma das minhas explosões.
            </p>

            <div className="list-day">
                <div className="day">
                    <span>Dia</span>
                    <strong>Segunda</strong>
                    <span>Horário</span>
                    <strong>8h-18h</strong>
                </div>

                <div className="day">
                    <span>Dia</span>
                    <strong>Segunda</strong>
                    <span>Horário</span>
                    <strong>8h-18h</strong>
                </div>
            </div>

            <footer>
                <p>
                    Preço/hora
                    <strong>U$ {teacher.cost}</strong>
                </p>

                <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
                
            </footer>
        </article>
    );
}

export default TeacherItem;