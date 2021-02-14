import axios from "axios";
import { useState } from "react";
import { API_ENDPOINT } from "../Utils/constants";
import { useAuth } from "./useAuth";

// interface Lesson {
//     id: number | null,
//     whatsApp: string,
//     bio: string,
//     theme: string,
//     value: number | null,
//     weekDay: string,
//     startHour: string,
//     finishHour: string
// }

export const useTeachers = () => {

    const auth = useAuth();
    const [teacherList, setTeacherList] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const list = async (theme: string, day: string) => {
        try {
            setProcessing(true);
            setError(null)
            const response = await axios.get(`${API_ENDPOINT}/user/teachers/${theme}/${day}`, buildAuthHeader());
            setTeacherList(response.data);
        } catch (error) {
            setError(error.message);
            setProcessing(false);
        }
    }

    const buildAuthHeader = () => {
        return {
            headers: {
                "Authorization": `Bearer ${auth.credentials.token}`,
            }
        }
    }

    return { list, teacherList, processing, error };
}
