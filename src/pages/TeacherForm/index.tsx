import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

import warningsIcon from '../../assets/images/icons/warning.svg';
import user from '../../assets/images/images.png';
import rocket from '../../assets/images/icons/rocket.svg';

import './styles.css';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' },
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {

        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,

        }).then(() => {
            alert('Cadastro realizado');
            history.push('/');
            
        }).catch(() => {
            alert('Erro');
        })

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems,
        });
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
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <div className="user-data">
                            <img src={user} alt="usuario"/>
                            <strong>Diogo Gonçalves</strong>
                            <span>
                                <label htmlFor="">WhatsApp</label>
                                <input type="text"/>
                            </span>
                        </div>

                        <TextArea 
                            name="bio" 
                            label="Biografia"
                            required
                            value={bio} onChange={(e) => { setBio(e.target.value) }}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div className="about-class">
                            <Select 
                                name="subject" 
                                label="Máteria"
                                value={subject}
                                required
                                onChange={(e) => { setSubject(e.target.value) }}
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
                                <input type="text" placeholder="R$"/>
                            </div>
                        </div>
                        
                        {/* <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(e) => { setCost(e.target.value) }}/> */}
                        
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        
                        { scheduleItems.map((scheduleItem, index) => {
                        return(
                            <div className="schedule-item" key={index} >
                                <Select 
                                    name="week_day"
                                    value={scheduleItem.week_day}
                                    label="Dia da semana"
                                    required
                                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value) }
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
                                <Input name="from"
                                    value={scheduleItem.from}
                                    label="Das" 
                                    type="time"
                                    required
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value) }
                                />

                                <Input name="to"
                                    value={scheduleItem.to}
                                    label="Até"
                                    required
                                    type="time"
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value) }/>
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