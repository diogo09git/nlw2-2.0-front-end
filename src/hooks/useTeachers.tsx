import axios from "axios";
import { useState } from "react";
import { API_ENDPOINT } from "../Utils/constants";
import { useAuth } from "./useAuth";

interface Lesson {
    id: number | null,
    whatsApp: string,
    bio: string,
    theme: string,
    value: number | null,
    weekDay: number | null,
    startHour: string,
    finishHour: string
}

const initialState: Lesson = {
    id: null,
    whatsApp: '',
    bio: '',
    theme: '',
    value: null,
    weekDay: null,
    startHour: '',
    finishHour: ''
}

export const useTeachers = () => {

    const auth = useAuth();
    const [teacherList, setTeacherList] = useState<Lesson[] | undefined>([]);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const list = async () => {
        try {
            setProcessing(true);
            setError(null)
            const response = await axios.get(`${API_ENDPOINT}/lesson`, buildAuthHeader());
            setTeacherList(response.data.content);
        } catch (error) {
            setError(error.message);
            setProcessing(false);
        }
    }

    const buildAuthHeader = () => {
        return {
            headers: {
                'Authorization': `Bearer ${auth.credentials.token}`
            }
        }
    }

    return { list, teacherList, processing, error };
}
