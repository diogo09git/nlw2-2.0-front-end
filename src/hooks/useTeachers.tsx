import axios, { AxiosError } from "axios";
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
            const response = await axios.get(`${API_ENDPOINT}/api/teachers?theme=${theme}`, buildAuthHeader());
            setTeacherList(response.data);

        } catch (error) {
            handleError(error);
        }
    }

    const handleError = (error: AxiosError) => {
        const resp = error.response;
        
        if(resp && resp.status === 400 && resp.data) {
            setError(resp.data.error);
        } else {
            setError("Servidor fora de serviço, tente mais tarde");
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
