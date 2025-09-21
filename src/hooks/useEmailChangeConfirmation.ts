import { useEffect, useState } from "react"
import { api } from "../utils/axios";
import { useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";

interface EmailChangeResponse {
  message: string;
  email: string;
}

interface UseEmailChangeConfirmationReturn {
  email: string; 
}

export const useEmailChangeConfirmation = (openModal: () => void): UseEmailChangeConfirmationReturn => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const confirmEmailChange = async (): Promise<void> => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
          const response = await api.get<EmailChangeResponse>(
            `/email_change_requests/confirm`,
            {
              params: { token },
            },
          );
          setEmail(response.data.email);
          openModal();
          navigate(location.pathname, { replace: true });
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.error(err.message);
        } else {
          console.log(err);
        }
      }
    };
    confirmEmailChange();
  }, [location.search, navigate, openModal]);

  return  { email };
};