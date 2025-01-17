export const messages = {
  errors: {
    auth: {
      invalidCredentials: "Неверные учетные данные",
    },
    common: {
      unxpectedError: "Произошла непредвиденная ошибка",
    }
  },
  auth: {
    successfulLogin: "Вы вошли в систему",
  },
  common: {
    auth: {
      login: "Войти",
      logout: "Выйти",
    },
    dashboard: "Панель управления",
    profile: "Профиль",
  }
} as const;
