const firebaseErrors: Record<string, string> = {
    'auth/user-disabled': 'Usuário desabilitado',
    'auth/invalid-email': 'Email e/ou senha inválidos',
    'auth/user-not-found': 'Email e/ou senha inválidos',
    'auth/wrong-password': 'Email e/ou senha inválidos',
}

export const DEFAULT_FIREBASE_ERROR_MESSAGE = 'Ocorreu um erro inesperado'

export default firebaseErrors