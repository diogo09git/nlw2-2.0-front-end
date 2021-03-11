import axios from "axios";
import { useState } from "react";
import { API_ENDPOINT } from "../Utils/constants";
import { useAuth } from "./useAuth";

export const useTeachers = () => {

    const auth = useAuth();
    const [teacherList, setTeacherList] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string>();

    const list = async (theme: string) => {
        try {
            setProcessing(true);
            setError('');
            const response = await axios.get(`${API_ENDPOINT}/user/teachers?theme=${theme}`, buildAuthHeader());
            setTeacherList(response.data);
        } catch (resp) {
            setError(resp.response.data.error);
            console.log(resp.response.data.error);
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
