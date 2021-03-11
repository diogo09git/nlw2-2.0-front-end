import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import user from '../../assets/images/images.png';

import './styles.css';

export interface Teacher {
    id: number;
    whatsApp: string;
    bio: string;
    theme: string;
    value: number;
    avatar: string;
    appUser: string;
    schedule: {
        weekDay: string
        startHour: string
        finishHour: string
    }[];
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    // function createNewConnection() {
    //     api.post('connections', {
    //         user_id: teacher.id
    //     });
    // }

    return(
        <article className="teacher-item">
            <header>
                <img src={user} alt=""/>
                <div>
                    <strong>{teacher.appUser}</strong>
                    <span>{teacher.theme}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <div className="list-day">
                {teacher.schedule.map(schedules =>  
                <div className="day" key={schedules.weekDay}>
                    <span>Dia</span>
                    <strong>{schedules.weekDay}</strong>
                    <span>Horário</span>
                    <strong>{schedules.startHour} - {schedules.finishHour}</strong>
                </div>
                )}
            </div>
            <footer>
                <p>
                    Preço/hora
                    <strong>U$ {teacher.value}</strong>
                </p>

                {/* <a href={`https://wa.me/${teacher.whatsapp}`}> */}
                <a href={`https://api.whatsapp.com/send?phone=55${teacher.whatsApp}`}>
                    <img src={whatsappIcon} alt="hatsApp"/>
                    Entrar em contato
                </a>
               
            </footer>
        </article>
    );
}

export default TeacherItem;