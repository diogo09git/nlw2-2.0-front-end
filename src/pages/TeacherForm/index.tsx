import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import { Redirect } from 'react-router-dom';

import warningsIcon from '../../assets/images/icons/warning.svg';
import user from '../../assets/images/images.png';
import rocket from '../../assets/images/icons/rocket.svg';
import { useTeachers } from '../../hooks/useTeachers';
import { useAuth } from '../../hooks/useAuth';
import Conclusion from '../../components/Conclusion';

import './styles.css';

function TeacherForm() {

    const teachers = useTeachers();
    const auth = useAuth();
    const [whatsApp, setWhatsApp] = useState('');
    const [bio, setBio] = useState('');
    const [theme, setTheme] = useState('');
    const [value, setValue] = useState('');

    const [schedule, setSchedule] = useState([
        { weekDay: '', startHour: '', finishHour: '' }
    ]);

    function addNewScheduleItem() {
        setSchedule([
            ...schedule,
            { weekDay: '', startHour: '', finishHour: '' },
        ]);
    }
    
    function setScheduleItemValue(position: number, field: string, value: string) {

        const updatedSchedule = schedule.map((scheduleItem, index) => {
            if(index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setSchedule(updatedSchedule);
    }

    function handleCreateLessons(e: FormEvent) {
        e.preventDefault();

        teachers.registerLessons({
            whatsApp, 
            bio, 
            theme, 
            value: Number(value), 
            schedule: schedule
        });
    }

    if(!auth.isAuthenticated()) {
        return <Redirect to="/login"/>
    }

    if(teachers.processing) {
        return <Redirect to="/conclusion-less"/>
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                icon={rocket}
                titleHeader="Dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição"
                text="Prepra-se, vai ser o máximo !"
            />

            <main>
                <form onSubmit={handleCreateLessons}>
                    <fieldset>
                        { teachers.error && <div className="error">{teachers.error}</div> }
                        
                        <legend>Seus dados</legend>

                        <div className="user-data">
                            <img src={user} alt="usuario"/>
                            <strong>Diogo Gonçalves</strong>
                            <span>
                                <label htmlFor="">WhatsApp</label>
                                <input 
                                    type="text"
                                    required
                                    value={whatsApp}
                                    onChange={e => setWhatsApp(e.target.value) }
                                />
                            </span>
                        </div>

                        <TextArea 
                            name="bio" 
                            label="Biografia"
                            required
                            value={bio} 
                            onChange={(e) => setBio(e.target.value) }
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div className="about-class">
                            <Select 
                                name="theme" 
                                label="Máteria"
                                value={theme}
                                required
                                onChange={(e) => setTheme(e.target.value) }
                                options={[
                                    { value: 'Artes', label: 'Artes' },
                                    { value: 'Biologia', label: 'Biologia' },
                                    { value: 'Matemática', label: 'Matemática' },
                                    { value: 'Química', label: 'Química' },
                                    { value: 'Física', label: 'Física' }
                                ]}
                            />
                            <div className="cost">
                                <label htmlFor="">Custo da sua hora por aula</label>
                                <input 
                                    type="text" 
                                    placeholder="R$"
                                    value={value}
                                    onChange={e => setValue(e.target.value) }
                                />
                            </div>
                        </div>
                        
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        
                        { schedule.map((scheduleItem, index) => {
                        return(
                            <div className="schedule-item" key={index} >
                                <Select 
                                    name="weekDay"
                                    value={scheduleItem.weekDay}
                                    label="Dia da semana"
                                    required
                                    onChange={e => setScheduleItemValue(index, 'weekDay', e.target.value) }
                                    options={[
                                        { value: 'Domingo', label: 'Domingo' },
                                        { value: 'Segunda-feira', label: 'Segunda-feira' },
                                        { value: 'Terça-feira', label: 'Terça-feira' },
                                        { value: 'Quarta-feira', label: 'Quarta-feira' },
                                        { value: 'Quinta-feira', label: 'Quinta-feira' },
                                        { value: 'Sexta-feira', label: 'Sexta-feira' },
                                        { value: 'Sábado', label: 'Sábado' }
                                    ]}
                                />
                                <Input name="startHour"
                                    value={scheduleItem.startHour}
                                    label="Das" 
                                    type="time"
                                    required
                                    onChange={e => setScheduleItemValue(index, 'startHour', e.target.value) }
                                />

                                <Input name="finishHour"
                                    value={scheduleItem.finishHour}
                                    label="Até"
                                    required
                                    type="time"
                                    onChange={e => setScheduleItemValue(index, 'finishHour', e.target.value) }/>
                            </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningsIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;