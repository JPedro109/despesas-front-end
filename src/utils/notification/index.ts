import { toast, ToastOptions } from "react-toastify";

const configToastify: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const success = (message: string) => toast.success(message, configToastify);

const error = (message: string) => toast.error(message, configToastify);

export const notification = {
  success,
  error
}