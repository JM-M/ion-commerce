const useFirebaseErrorMessage = (errorCode: string) => {
  let message = errorCode?.split("/")[1].replaceAll("-", " ");
  if (errorCode === "auth/wrong-password")
    message = "Invalid email or password";
  return message;
};

export default useFirebaseErrorMessage;
