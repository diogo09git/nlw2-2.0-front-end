import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import smile from '../../assets/images/icons/smile.svg';
import { useTeachers } from '../../hooks/useTeachers';
import { useAuth } from '../../hooks/useAuth';
import { Redirect } from 'react-router-dom';

import './styles.css';

const TeacherList = () => {
    const teachers = useTeachers();
    const auth = useAuth();
    // const [teachers, setTeachers] = useState([]);
    const [theme, setTheme] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const searchTeachers = (e: FormEvent) => {
        e.preventDefault();

        if(auth.credentials.username !== '') {
            teachers.list(theme, weekDay);
        }
    }

    // async function searchTeachers(e: FormEvent) {
    //     e.preventDefault();

    //     const response = await api.get('classes', {
    //         params: {
    //             subject,
    //             week_day,
    //             time
    //         }
    //     });
        // setTeachers(response.data);
    //}

    if(!auth.isAuthenticated()) {
        return <Redirect to="/login"/>
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader 
                title="Estes são os proffys disponíveis."
                icon={smile}
                titleHeader="Estudar"
                description="Escolha um de nossos professores e embarque nesse foguete"
                text="Nós temos 32 professores"
            >
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="theme" 
                        label="Máteria"
                        required
                        value={theme}
                        onChange={e => setTheme(e.target.value) }
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Física', label: 'Física' }
                        ]}
                    />
                    <Select 
                        name="weekDay" 
                        label="Dia da semana"
                        required
                        value={weekDay}
                        onChange={e => setWeekDay(e.target.value) }
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' }
                        ]}
                    />
                    <Input type="time"
                        name="time" 
                        label="Hora"
                        required
                        value={time}
                        onChange={e => setTime(e.target.value) }
                    />

                    <button type="submit">Buscar</button>

                </form>
            </PageHeader>

            <main>
                {teachers.teacherList.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    );
}

export default TeacherList;