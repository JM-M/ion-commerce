const useFirebaseErrorMessage = (errorCode: string) => {
  if (!errorCode) return null;

  const errorCodePart = errorCode?.split('/');
  if (!errorCodePart?.length || errorCodePart.length < 2 || !errorCodePart[1])
    return 'An error occurred';

  let message = errorCodePart[1].replaceAll('-', ' ');
  if (errorCode === 'auth/wrong-password')
    message = 'Invalid email or password';
  return message;
};

export default useFirebaseErrorMessage;
