import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Select from '../../components/Select';

import smile from '../../assets/images/icons/smile.svg';
import { useTeachers } from '../../hooks/useTeachers';
import { useAuth } from '../../hooks/useAuth';
import { Redirect } from 'react-router-dom';

import './styles.css';

const TeacherList = () => {
    const teachers = useTeachers();
    const auth = useAuth();
    const [theme, setTheme] = useState('');

    const searchTeachers = (e: FormEvent) => {
        e.preventDefault();

        if(auth.credentials.username !== '') {
            teachers.list(theme);
        }
    }

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
                    <button type="submit">Buscar</button>

                </form>
            </PageHeader>
            
            { teachers.error === '' ? 
            <main>
                {teachers.teacherList.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
            : <span id="resp-error">{teachers.error}</span> }
        </div>
    );
}

export default TeacherList;