import {
  getAuth,
  createUserWithEmailAndPassword,
  getDatabase,
  ref,
  set,
} from "../Components/firebase";
import { isValidNigerianNumber } from "./isValidNigerianNumber";

const HandleRegister = ({ e, inputRefs, setStates }) => {
  e.preventDefault();
  setStates.setIsPending(true);

  const nameValue = inputRefs.name.ref.current.value;
  const numberValue = `+234${inputRefs.number.ref.current.value}`;
  const emailValue = inputRefs.email.ref.current.value;
  const passwordValue = inputRefs.password.ref.current.value;
  const rePasswordValue = inputRefs.rePassword.ref.current.value;

  const RegisterAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;
        UploadUserData(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setStates.setError(errorMessage);
        setStates.setIsPending(false);
      });
  };

  const UploadUserData = (userId) => {
    const AccountDetails = {
      name: nameValue,
      phone: numberValue,
      email: emailValue,
      id: userId,
    };

    const db = getDatabase();
    set(ref(db, `UsersDetails/${userId}`), AccountDetails)
      .then(() => {
        const AccountDetails = {
          email: emailValue,
          fullName: nameValue,
        };
        localStorage.setItem("details", JSON.stringify(AccountDetails));
        setStates.setSuccess(true);
        setStates.setIsPending(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
        } else {
          const errorCode = error.code;
          const errorMessage = error.message;
          setStates.setError(errorMessage);
          setStates.setIsPending(false);
        }
      });
  };

  if (
    !isValidNigerianNumber(numberValue) ||
    passwordValue !== rePasswordValue
  ) {
    if (!isValidNigerianNumber(numberValue)) inputRefs.number.setError(true);
    if (passwordValue !== rePasswordValue)
      inputRefs.password.setError("Password does not Match");
    setStates.setIsPending(false);
  } else {
    RegisterAccount();
  }

  setStates.setValidated(true);
};

export default HandleRegister;
